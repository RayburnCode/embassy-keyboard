<!-- @format -->

# Mad Mod Labs 68-Key Keyboard Firmware

Custom async USB HID keyboard firmware for the [Mad Mod Labs 68-key mechanical keyboard](https://www.printables.com/model/307908-mechanical-keyboard-68-key-65/files), written in Rust using the [Embassy](https://embassy.dev) async embedded framework targeting the **RP2040** (Raspberry Pi Pico).

---

## Features

- **Fully async** — Embassy tasks run the matrix scanner, keymap translator, and USB HID writer concurrently with no RTOS overhead
- **5×15 active-low matrix** scanning with software debounce (~5 ms)
- **N-key rollover up to 6 simultaneous keys** (standard USB HID boot protocol)
- **1 ms HID polling interval** for minimal input latency
- **JSON-driven layout** — edit `src/keyboard-layout.json` and `cargo build` regenerates the matrix map automatically via `build.rs`; no manual Rust changes needed
- **Browser layout visualizer** — open `view/index.html` to inspect the key matrix visually

---

## Hardware

| Component   | Detail                               |
| ----------- | ------------------------------------ |
| MCU         | RP2040 (Raspberry Pi Pico)           |
| Matrix      | 5 rows × 15 columns (68 keys active) |
| Row pins    | GPIO 0–4 (outputs, active-low)       |
| Column pins | GPIO 5–18 (inputs, internal pull-up) |
| USB         | Native RP2040 USB at full-speed      |

---

## Project Structure

```
sixty-eight-key/
├── src/
│   ├── main.rs                # Entry point, GPIO setup, task spawning
│   ├── keymap.rs              # Matrix → KeyPosition → HID report pipeline
│   ├── keycodes.rs            # KeyPosition enum → USB HID keycode table
│   ├── usb_hid.rs             # Embassy USB / HID writer task
│   └── keyboard-layout.json  # Single source of truth for the key layout
├── build.rs                   # Generates MATRIX_MAP from keyboard-layout.json
├── memory.x                   # RP2040 linker memory layout
└── view/
    ├── index.html             # Browser-based layout visualizer
    └── layout.js              # Reads keyboard-layout.json for the visualizer
```

---

## Building

Install the ARM Cortex-M0+ target and build:

```sh
rustup target add thumbv6m-none-eabi
cargo build --release
```

### Convert to UF2 (drag-and-drop flash)

```sh
picotool uf2 convert target/thumbv6m-none-eabi/release/sixty-eight-key -t elf firmware.uf2
```

Then hold **BOOTSEL** on the Pico, plug it in, and copy `firmware.uf2` to the `RPI-RP2` drive.

### Flash directly with `picotool`

```sh
picotool load -f target/thumbv6m-none-eabi/release/sixty-eight-key
```

---

## Customizing the Layout

The file `src/keyboard-layout.json` is the single source of truth for the keyboard matrix. Each entry maps a physical matrix position `[row, col]` to a `KeyPosition` enum variant:

```json
{ "matrix": [0, 0], "x": 0, "y": 0, "w": 1, "label": "Escape" }
```

After editing, just run:

```sh
cargo build
```

`build.rs` parses the JSON and writes a `MATRIX_MAP` array to the compiler's `OUT_DIR`, which is included directly into `keymap.rs`. No manual Rust editing required.

To add or remap a key:

1. Update the `label` field in `keyboard-layout.json` to the desired `KeyPosition` variant name
2. Ensure that variant exists in `keycodes.rs` with its correct HID scancode
3. `cargo build` — done

---

## How It Works

Three Embassy tasks run concurrently:

```
┌─────────────────────┐     KEY_CHANNEL      ┌────────────────┐     USB_HID_CHANNEL     ┌──────────────┐
│  matrix_scan_task   │ ──── KeyEvent ──────▶ │  keymap_task   │ ───── KeyboardReport ──▶ │   usb_task   │
│  (GPIO polling)     │                       │  (HID mapping) │                          │  (USB write) │
└─────────────────────┘                       └────────────────┘                          └──────────────┘
```

1. **`matrix_scan_task`** — drives each row LOW in turn, reads all column inputs, debounces, and sends `KeyEvent` structs over an async channel
2. **`keymap_task`** — receives events, looks up `MATRIX_MAP`, converts to HID keycodes, maintains a 6-key pressed-keys buffer, and sends `KeyboardReport` structs
3. **`usb_task`** — runs the Embassy USB stack and writes 8-byte HID boot reports to the host at up to 1 ms intervals

---

## Dependencies

| Crate                 | Purpose                               |
| --------------------- | ------------------------------------- |
| `embassy-executor`    | Async task executor for Cortex-M      |
| `embassy-rp`          | RP2040 HAL (GPIO, USB, timers)        |
| `embassy-usb`         | USB device stack                      |
| `embassy-sync`        | Async channels between tasks          |
| `embassy-time`        | Async timers / delays                 |
| `usbd-hid`            | USB HID descriptor and report types   |
| `defmt` + `defmt-rtt` | Lightweight embedded logging over RTT |
| `cortex-m-rt`         | Cortex-M runtime / startup            |
| `panic-halt`          | Halt on panic (no unwinding)          |

---

## Resources & Inspiration

- [Mad Mod Labs — Printables case files](https://www.printables.com/model/307908-mechanical-keyboard-68-key-65/files)
- [Mad Mod Labs — YouTube build guide](https://www.youtube.com/watch?v=iOeYkLlq9Ds&t=628s)
- [Embassy embedded async framework](https://embassy.dev)
- [RMK keyboard firmware](https://rmk.rs/index.html) — inspiration for the architecture
- [Keyboard Layout Editor](https://www.keyboard-layout-editor.com)
- [keyswitch KiCad library](https://github.com/perigoso/keyswitch-kicad-library)
- Plate & case builders: [Keeb](https://plate.keeb.io) · [Swillkb](http://builder.swillkb.com) · [Keyboard Layout Editor NG](https://editor.keyboard-tools.xyz)
