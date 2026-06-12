/** @format */

// ================================================================
// LAYOUT DATA — embedded copy of src/keyboard-layout.json
//
// To use this visualizer for a DIFFERENT keyboard layout:
//   1. Replace the LAYOUT_DATA object below with your own
//      keyboard-layout.json contents.
//   2. Update KEY_DISPLAY_NAMES with any new KeyPosition names.
//   3. Everything else is generic — no other changes needed.
//
// Format per key:
//   matrix : [row, col]  — matrix scan position
//   x, y   : visual position in key-units (1u ≈ one standard key)
//   w       : key width in key-units (default 1 if omitted)
//   label   : Rust KeyPosition enum variant name, or null = unwired
//   note    : optional human-readable explanation
// ================================================================
const LAYOUT_DATA = {
  name: "Mad Mod Labs 68",
  matrix: { rows: 5, cols: 14 },
  layouts: {
    LAYOUT: {
      layout: [
        // Row 0
        { matrix: [0, 0], x: 0, y: 0, w: 1, label: "Escape" },
        { matrix: [0, 1], x: 1, y: 0, w: 1, label: "N1" },
        { matrix: [0, 2], x: 2, y: 0, w: 1, label: "N2" },
        { matrix: [0, 3], x: 3, y: 0, w: 1, label: "N3" },
        { matrix: [0, 4], x: 4, y: 0, w: 1, label: "N4" },
        { matrix: [0, 5], x: 5, y: 0, w: 1, label: "N5" },
        { matrix: [0, 6], x: 6, y: 0, w: 1, label: "N6" },
        { matrix: [0, 7], x: 7, y: 0, w: 1, label: "N7" },
        { matrix: [0, 8], x: 8, y: 0, w: 1, label: "N8" },
        { matrix: [0, 9], x: 9, y: 0, w: 1, label: "N9" },
        { matrix: [0, 10], x: 10, y: 0, w: 1, label: "N0" },
        { matrix: [0, 11], x: 11, y: 0, w: 1, label: "Minus" },
        { matrix: [0, 12], x: 12, y: 0, w: 1, label: "Equals" },
        { matrix: [0, 13], x: 13, y: 0, w: 2, label: "Backspace" },
        {
          matrix: [0, 14],
          x: 15,
          y: 0,
          w: 1,
          label: "Backtick",
        },

        // Row 1
        { matrix: [1, 0], x: 0, y: 1, w: 1.5, label: "Tab" },
        { matrix: [1, 1], x: 1.5, y: 1, w: 1, label: "Q" },
        { matrix: [1, 2], x: 2.5, y: 1, w: 1, label: "W" },
        { matrix: [1, 3], x: 3.5, y: 1, w: 1, label: "E" },
        { matrix: [1, 4], x: 4.5, y: 1, w: 1, label: "R" },
        { matrix: [1, 5], x: 5.5, y: 1, w: 1, label: "T" },
        { matrix: [1, 6], x: 6.5, y: 1, w: 1, label: "Y" },
        { matrix: [1, 7], x: 7.5, y: 1, w: 1, label: "U" },
        { matrix: [1, 8], x: 8.5, y: 1, w: 1, label: "I" },
        { matrix: [1, 9], x: 9.5, y: 1, w: 1, label: "O" },
        { matrix: [1, 10], x: 10.5, y: 1, w: 1, label: "P" },
        { matrix: [1, 11], x: 11.5, y: 1, w: 1, label: "LeftBracket" },
        { matrix: [1, 12], x: 12.5, y: 1, w: 1, label: "RightBracket" },
        { matrix: [1, 13], x: 13.5, y: 1, w: 1.5, label: "Backslash" },
        {
          matrix: [1, 14],
          x: 15,
          y: 1,
          w: 1,
          label: "PageUp",
        },

        // Row 2
        { matrix: [2, 0], x: 0, y: 2, w: 1.75, label: "CapsLock" },
        { matrix: [2, 1], x: 1.75, y: 2, w: 1, label: "A" },
        { matrix: [2, 2], x: 2.75, y: 2, w: 1, label: "S" },
        { matrix: [2, 3], x: 3.75, y: 2, w: 1, label: "D" },
        { matrix: [2, 4], x: 4.75, y: 2, w: 1, label: "F" },
        { matrix: [2, 5], x: 5.75, y: 2, w: 1, label: "G" },
        { matrix: [2, 6], x: 6.75, y: 2, w: 1, label: "H" },
        { matrix: [2, 7], x: 7.75, y: 2, w: 1, label: "J" },
        { matrix: [2, 8], x: 8.75, y: 2, w: 1, label: "K" },
        { matrix: [2, 9], x: 9.75, y: 2, w: 1, label: "L" },
        { matrix: [2, 10], x: 10.75, y: 2, w: 1, label: "Semicolon" },
        { matrix: [2, 11], x: 11.75, y: 2, w: 1, label: "Quote" },
        { matrix: [2, 12], x: 12.75, y: 2, w: 2.25, label: "Enter" },
        {
          matrix: [2, 13],
          x: 15,
          y: 2,
          w: 1,
          label: "PageDown",
        },

        // Row 3
        { matrix: [3, 0], x: 0, y: 3, w: 2.25, label: "LeftShift" },
        { matrix: [3, 1], x: 2.25, y: 3, w: 1, label: "Z" },
        { matrix: [3, 2], x: 3.25, y: 3, w: 1, label: "X" },
        { matrix: [3, 3], x: 4.25, y: 3, w: 1, label: "C" },
        { matrix: [3, 4], x: 5.25, y: 3, w: 1, label: "V" },
        { matrix: [3, 5], x: 6.25, y: 3, w: 1, label: "B" },
        { matrix: [3, 6], x: 7.25, y: 3, w: 1, label: "N" },
        { matrix: [3, 7], x: 8.25, y: 3, w: 1, label: "M" },
        { matrix: [3, 8], x: 9.25, y: 3, w: 1, label: "Comma" },
        { matrix: [3, 9], x: 10.25, y: 3, w: 1, label: "Dot" },
        { matrix: [3, 10], x: 11.25, y: 3, w: 1, label: "Slash" },
        { matrix: [3, 11], x: 12.25, y: 3, w: 1.75, label: "RightShift" },
        {
          matrix: [3, 12],
          x: 14,
          y: 3,
          w: 1,
          label: "UpArrow",
        },
        {
          matrix: [3, 13],
          x: 15,
          y: 3,
          w: 1,
          label: "Delete",
        },

        // Row 4
        { matrix: [4, 0], x: 0, y: 4, w: 1.25, label: "LeftCtrl" },
        { matrix: [4, 1], x: 1.25, y: 4, w: 1.25, label: "LeftAlt" },
        { matrix: [4, 2], x: 2.5, y: 4, w: 1.25, label: "LeftGui" },
        { matrix: [4, 3], x: 3.75, y: 4, w: 6.25, label: "Space" },
        { matrix: [4, 4], x: 10, y: 4, w: 1, label: "RightAlt" },
        { matrix: [4, 5], x: 11, y: 4, w: 1, label: "Fn" },
        { matrix: [4, 6], x: 12, y: 4, w: 1, label: "LeftArrow" },
        { matrix: [4, 7], x: 13, y: 4, w: 1, label: "DownArrow" },
        { matrix: [4, 9], x: 15, y: 4, w: 1, label: "RightArrow" },
      ],
    },
  },
};
