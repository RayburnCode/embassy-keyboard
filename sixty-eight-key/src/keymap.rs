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
//Backtick

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
// This table is the *only* place that knows about your PCB wiring
pub const MATRIX_MAP: [[Option<KeyPosition>; 14]; 5] = [
    [Some(KeyPosition::Escape), Some(KeyPosition::N1), Some(KeyPosition::N2), Some(KeyPosition::N3), Some(KeyPosition::N4), Some(KeyPosition::N5), Some(KeyPosition::N6), Some(KeyPosition::N7), Some(KeyPosition::N8), Some(KeyPosition::N9), Some(KeyPosition::N0), Some(KeyPosition::Minus), Some(KeyPosition::Equals), Some(KeyPosition::Backspace)],
    [Some(KeyPosition::Tab), Some(KeyPosition::Q), Some(KeyPosition::W), Some(KeyPosition::E), Some(KeyPosition::R), Some(KeyPosition::T), Some(KeyPosition::Y), Some(KeyPosition::U), Some(KeyPosition::I), Some(KeyPosition::O), Some(KeyPosition::P), Some(KeyPosition::LeftBracket), Some(KeyPosition::RightBracket), Some(KeyPosition::Backslash)],
    [Some(KeyPosition::CapsLock), Some(KeyPosition::A), Some(KeyPosition::S), Some(KeyPosition::D), Some(KeyPosition::F), Some(KeyPosition::G), Some(KeyPosition::H), Some(KeyPosition::J), Some(KeyPosition::K), Some(KeyPosition::L), Some(KeyPosition::Semicolon), Some(KeyPosition::Quote), Some(KeyPosition::Enter), None],
    [Some(KeyPosition::LeftShift), Some(KeyPosition::Z), Some(KeyPosition::X), Some(KeyPosition::C), Some(KeyPosition::V), Some(KeyPosition::B), Some(KeyPosition::N), Some(KeyPosition::M), Some(KeyPosition::Comma), Some(KeyPosition::Dot), Some(KeyPosition::Slash), Some(KeyPosition::RightShift), None, None],
    [Some(KeyPosition::LeftCtrl), Some(KeyPosition::LeftAlt), Some(KeyPosition::LeftGui), Some(KeyPosition::Space), Some(KeyPosition::RightAlt), Some(KeyPosition::Fn), Some(KeyPosition::LeftArrow), Some(KeyPosition::DownArrow), Some(KeyPosition::UpArrow), Some(KeyPosition::RightArrow), None, None, None, None],
];

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
