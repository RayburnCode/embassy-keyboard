use embassy_sync::{blocking_mutex::raw::CriticalSectionRawMutex, channel::Channel};
use usbd_hid::descriptor::KeyboardReport;

// HID keycodes — these are standard USB HID values
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum KeyPosition {
    // Name every key by what it *is*, not where it sits in the matrix
    Escape, N1, N2, N3, N4, N5, N6, N7, N8, N9, N0, Minus, Equals, Backspace,
    Tab, Q, W, E, R, T, Y, U, I, O, P, LeftBracket, RightBracket, Backslash,
    CapsLock, A, S, D, F, G, H, J, K, L, Semicolon, Quote, Enter,
    LeftShift, Z, X, C, V, B, N, M, Comma, Dot, Slash, RightShift,
    LeftCtrl, LeftAlt, LeftGui, Space, RightAlt, Fn, LeftArrow, DownArrow, UpArrow, RightArrow,
}

#[derive(Debug, Clone, Copy)]
pub struct KeyEvent {
    pub row: usize,
    pub col: usize,
    pub pressed: bool,
}

// Channel: matrix scan task → keymap task
pub static KEY_CHANNEL: Channel<CriticalSectionRawMutex, KeyEvent, 16> = Channel::new();

// Channel: keymap task → USB HID task
pub static USB_HID_CHANNEL: Channel<CriticalSectionRawMutex, KeyboardReport, 4> = Channel::new();

// Matrix scan position → logical key
// Auto-generated from src/keyboard-layout.json — edit that file to change the layout,
// then run `cargo build` to regenerate. Do not edit MATRIX_MAP here directly.
include!(concat!(env!("OUT_DIR"), "/matrix_map.rs"));

#[embassy_executor::task]
pub async fn keymap_task() {
    let mut pressed_keys = [0u8; 6]; // HID supports up to 6 simultaneous keys
    let mut key_count = 0usize;

    loop {
        let event = KEY_CHANNEL.receive().await;

        if event.row >= 5 || event.col >= 14 {
            continue;
        }

        let keycode = match MATRIX_MAP[event.row][event.col] {
            Some(pos) => crate::keycodes::keycode(pos),
            None => continue,
        };

        if keycode == 0x00 {
            continue;
        }

        if event.pressed {
            if key_count < 6 {
                pressed_keys[key_count] = keycode;
                key_count += 1;
            }
        } else {
            // Remove the released key
            if let Some(pos) = pressed_keys[..key_count].iter().position(|&k| k == keycode) {
                pressed_keys[pos] = pressed_keys[key_count - 1];
                pressed_keys[key_count - 1] = 0;
                key_count -= 1;
            }
        }

        // Build and send HID report
        let report = KeyboardReport {
            modifier: 0,
            reserved: 0,
            leds: 0,
            keycodes: pressed_keys,
        };

        let _ = USB_HID_CHANNEL.try_send(report);
    }
}
