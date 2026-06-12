<!-- @format -->

# embassy-keyboard

A collection of custom mechanical keyboard firmware projects built with [Embassy](https://embassy.dev) — an async embedded framework for Rust — targeting the **RP2040** (Raspberry Pi Pico). Each subfolder is a self-contained firmware crate for a specific keyboard build.

---

## Keyboards

| Folder                                 | Keys | Description                                                                   |
| -------------------------------------- | ---- | ----------------------------------------------------------------------------- |
| [`sixty-eight-key`](./sixty-eight-key) | 68   | Mad Mod Labs 65% build — 5×15 active-low matrix, USB HID, async Embassy tasks |

---

## Common Stack

All keyboards in this repo share the same core technology:

- **Language** — Rust (`no_std`)
- **Async runtime** — [Embassy](https://embassy.dev) (`embassy-executor`, `embassy-rp`, `embassy-usb`)
- **Target** — `thumbv6m-none-eabi` (RP2040 / Cortex-M0+)
- **USB** — Full-speed USB HID boot keyboard via `embassy-usb` + `usbd-hid`
- **Layout definition** — JSON-driven matrix map, regenerated at build time by `build.rs`

---

## Getting Started

### Prerequisites

```sh
# Install the ARM Cortex-M0+ compile target
rustup target add thumbv6m-none-eabi

# Install picotool for flashing (macOS)
brew install picotool
```

### Build & Flash

Navigate into the keyboard subfolder and build:

```sh
cd sixty-eight-key
cargo build --release
```

Convert to UF2 and flash:

```sh
picotool uf2 convert target/thumbv6m-none-eabi/release/sixty-eight-key -t elf firmware.uf2
# Hold BOOTSEL, plug in the Pico, copy firmware.uf2 to the RPI-RP2 drive
```

Or flash directly:

```sh
picotool load -f target/thumbv6m-none-eabi/release/sixty-eight-key
```

See each keyboard's own README for hardware pinouts, layout customization, and build-specific notes.

---

## Adding a New Keyboard

1. Create a new subfolder (e.g. `forty-percent/`)
2. Add a `Cargo.toml` with the Embassy dependencies and a `thumbv6m-none-eabi` profile
3. Copy `memory.x` and `build.rs` from an existing keyboard as a starting point
4. Define your matrix in `src/keyboard-layout.json`
5. Update the table above with the new entry
