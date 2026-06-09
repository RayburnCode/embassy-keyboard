use embassy_futures::join::join;
use embassy_rp::peripherals::USB;
use embassy_rp::usb::Driver;
use embassy_usb::class::hid::{Config as HidConfig, HidBootProtocol, HidSubclass, HidWriter, State};
use embassy_usb::{Builder, Config};
use usbd_hid::descriptor::{KeyboardReport, SerializedDescriptor};

use crate::keymap::USB_HID_CHANNEL;

#[embassy_executor::task]
pub async fn usb_task(driver: Driver<'static, USB>) {
    let mut config = Config::new(0x1234, 0x5678);
    config.manufacturer = Some("My Keyboard Co");
    config.product = Some("My 68-Key Board");
    config.serial_number = Some("001");

    let mut config_descriptor = [0u8; 256];
    let mut bos_descriptor = [0u8; 256];
    let mut control_buf = [0u8; 64];
    let mut hid_state = State::new();

    let mut builder = Builder::new(
        driver,
        config,
        &mut config_descriptor,
        &mut bos_descriptor,
        &mut [],
        &mut control_buf,
    );

    let hid_config = HidConfig {
        report_descriptor: KeyboardReport::desc(),
        request_handler: None,
        poll_ms: 1, // 1 ms polling — maximum responsiveness
        max_packet_size: 8,
        hid_subclass: HidSubclass::Boot,
        hid_boot_protocol: HidBootProtocol::Keyboard,
    };

    // Write-only HID endpoint (8-byte keyboard report)
    let mut writer = HidWriter::<_, 8>::new(&mut builder, &mut hid_state, hid_config);

    let mut usb = builder.build();

    let usb_fut = usb.run();

    let hid_fut = async {
        loop {
            let report = USB_HID_CHANNEL.receive().await;
            // Serialise the input report manually: modifier, reserved, 6 keycodes
            let bytes = [
                report.modifier,
                report.reserved,
                report.keycodes[0],
                report.keycodes[1],
                report.keycodes[2],
                report.keycodes[3],
                report.keycodes[4],
                report.keycodes[5],
            ];
            let _ = writer.write(&bytes).await;
        }
    };

    join(usb_fut, hid_fut).await;
}
