#![no_std]
#![no_main]

use defmt_rtt as _;
use panic_halt as _;

defmt::timestamp!("{=u64:us}", embassy_time::Instant::now().as_micros());

#[defmt::panic_handler]
fn defmt_panic() -> ! {
    cortex_m::asm::udf()
}

use embassy_executor::Spawner;
use embassy_rp::bind_interrupts;
use embassy_rp::gpio::{Input, Level, Output, Pull};
use embassy_rp::peripherals::USB;
use embassy_rp::usb::InterruptHandler;
use embassy_time::{Duration, Timer};

mod keycodes;
mod keymap;
mod usb_hid;

use keymap::{KeyEvent, KEY_CHANNEL};

bind_interrupts!(struct Irqs {
    USBCTRL_IRQ => InterruptHandler<USB>;
});

#[embassy_executor::task]
async fn matrix_scan_task(
    mut rows: [Output<'static>; 5],
    cols: [Input<'static>; 14],
) {
    let mut prev_state = [[false; 14]; 5];

    loop {
        for (row_idx, row_pin) in rows.iter_mut().enumerate() {
            // Drive this row LOW (active-low scanning)
            row_pin.set_low();

            // Small settling delay — lets the signal stabilise
            Timer::after(Duration::from_micros(10)).await;

            for (col_idx, col_pin) in cols.iter().enumerate() {
                // Column reads LOW when key is pressed (pull-up + active-low row)
                let pressed = col_pin.is_low();

                if pressed != prev_state[row_idx][col_idx] {
                    // Debounce: wait and re-read to confirm
                    Timer::after(Duration::from_millis(5)).await;
                    let confirmed = col_pin.is_low();

                    if confirmed == pressed {
                        prev_state[row_idx][col_idx] = pressed;
                        KEY_CHANNEL
                            .send(KeyEvent { row: row_idx, col: col_idx, pressed })
                            .await;
                    }
                }
            }

            // Drive row HIGH again before moving to the next
            row_pin.set_high();
        }

        // Full scan cycle ~1 ms
        Timer::after(Duration::from_micros(100)).await;
    }
}

#[embassy_executor::main]
async fn main(spawner: Spawner) {
    let p = embassy_rp::init(Default::default());

    // Row pins — outputs, start HIGH (active-low matrix)
    let rows = [
        Output::new(p.PIN_0, Level::High),
        Output::new(p.PIN_1, Level::High),
        Output::new(p.PIN_2, Level::High),
        Output::new(p.PIN_3, Level::High),
        Output::new(p.PIN_4, Level::High),
    ];

    // Column pins — inputs with internal pull-ups
    let cols = [
        Input::new(p.PIN_5,  Pull::Up),
        Input::new(p.PIN_6,  Pull::Up),
        Input::new(p.PIN_7,  Pull::Up),
        Input::new(p.PIN_8,  Pull::Up),
        Input::new(p.PIN_9,  Pull::Up),
        Input::new(p.PIN_10, Pull::Up),
        Input::new(p.PIN_11, Pull::Up),
        Input::new(p.PIN_12, Pull::Up),
        Input::new(p.PIN_13, Pull::Up),
        Input::new(p.PIN_14, Pull::Up),
        Input::new(p.PIN_15, Pull::Up),
        Input::new(p.PIN_16, Pull::Up),
        Input::new(p.PIN_17, Pull::Up),
        Input::new(p.PIN_18, Pull::Up),
    ];

    let driver = embassy_rp::usb::Driver::new(p.USB, Irqs);

    spawner.spawn(matrix_scan_task(rows, cols).unwrap());
    spawner.spawn(keymap::keymap_task().unwrap());
    spawner.spawn(usb_hid::usb_task(driver).unwrap());
}
