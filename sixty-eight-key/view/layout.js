/** @format */

// ============================================
// RUST MATRIX MAP (converted to JavaScript)
// ============================================
const MATRIX_MAP = [
  // Row 0
  [
    "Escape",
    "N1",
    "N2",
    "N3",
    "N4",
    "N5",
    "N6",
    "N7",
    "N8",
    "N9",
    "N0",
    "Minus",
    "Equals",
    "Backspace",
  ],
  // Row 1
  [
    "Tab",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "LeftBracket",
    "RightBracket",
    "Backslash",
  ],
  // Row 2
  [
    "CapsLock",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Semicolon",
    "Quote",
    "Enter",
    null,
  ],
  // Row 3
  [
    "LeftShift",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "Comma",
    "Dot",
    "Slash",
    "RightShift",
    null,
    null,
  ],
  // Row 4
  [
    "LeftCtrl",
    "LeftAlt",
    "LeftGui",
    "Space",
    "RightAlt",
    "Fn",
    "LeftArrow",
    "DownArrow",
    "UpArrow",
    "RightArrow",
    null,
    null,
    null,
    null,
  ],
];

// Human-readable key names mapping
const keyDisplayNames = {
  Escape: "Esc",
  N1: "1",
  N2: "2",
  N3: "3",
  N4: "4",
  N5: "5",
  N6: "6",
  N7: "7",
  N8: "8",
  N9: "9",
  N0: "0",
  Minus: "-",
  Equals: "=",
  Backspace: "←",
  Tab: "Tab",
  Q: "Q",
  W: "W",
  E: "E",
  R: "R",
  T: "T",
  Y: "Y",
  U: "U",
  I: "I",
  O: "O",
  P: "P",
  LeftBracket: "[",
  RightBracket: "]",
  Backslash: "\\",
  CapsLock: "Caps",
  A: "A",
  S: "S",
  D: "D",
  F: "F",
  G: "G",
  H: "H",
  J: "J",
  K: "K",
  L: "L",
  Semicolon: ";",
  Quote: "'",
  Enter: "Enter",
  LeftShift: "Shift",
  Z: "Z",
  X: "X",
  C: "C",
  V: "V",
  B: "B",
  N: "N",
  M: "M",
  Comma: ",",
  Dot: ".",
  Slash: "/",
  RightShift: "Shift",
  LeftCtrl: "Ctrl",
  LeftAlt: "Alt",
  LeftGui: "Win",
  Space: "Space",
  RightAlt: "Alt",
  Fn: "Fn",
  LeftArrow: "←",
  DownArrow: "↓",
  UpArrow: "↑",
  RightArrow: "→",
};

// ============================================
// JSON LAYOUT CONFIGURATION
// ============================================
const keyboardLayout = {
  name: "Mad Mod Labs 68",
  matrix: { rows: 5, cols: 15 },
  layouts: {
    keymap: [
      // Row 0 - 15 keys including 2u at position 13
      [
        "0,0",
        "0,1",
        "0,2",
        "0,3",
        "0,4",
        "0,5",
        "0,6",
        "0,7",
        "0,8",
        "0,9",
        "0,10",
        "0,11",
        "0,12",
        { w: 2 },
        "0,13",
        "0,14",
      ],
      // Row 1 - with 1.5u modifiers
      [
        { w: 1.5 },
        "1,0",
        "1,1",
        "1,2",
        "1,3",
        "1,4",
        "1,5",
        "1,6",
        "1,7",
        "1,8",
        "1,9",
        "1,10",
        "1,11",
        "1,12",
        { w: 1.5 },
        "1,13",
        "1,14",
      ],
      // Row 2 - ISO-style Enter
      [
        { w: 1.75 },
        "2,0",
        "2,1",
        "2,2",
        "2,3",
        "2,4",
        "2,5",
        "2,6",
        "2,7",
        "2,8",
        "2,9",
        "2,10",
        "2,11",
        { w: 2.25 },
        "2,12",
        "2,13",
      ],
      // Row 3
      [
        { w: 2.25 },
        "3,0",
        "3,1",
        "3,2",
        "3,3",
        "3,4",
        "3,5",
        "3,6",
        "3,7",
        "3,8",
        "3,9",
        "3,10",
        { w: 1.75 },
        "3,11",
        "3,12",
        "3,13",
      ],
      // Row 4 - bottom row with 6.25u spacebar
      [
        { w: 1.25 },
        "4,0",
        { w: 1.25 },
        "4,1",
        { w: 1.25 },
        "4,2",
        { w: 6.25 },
        "4,3",
        "4,4",
        "4,5",
        "4,6",
        "4,7",
        "4,8",
        "4,9",
      ],
    ],
  },
};

// Helper: Parse matrix coordinate from string like "row,col"
function parseCoord(coordStr) {
  if (typeof coordStr === "string" && coordStr.includes(",")) {
    const [row, col] = coordStr.split(",").map(Number);
    return { row, col };
  }
  return null;
}

// Helper: Get key at matrix position
function getKeyAt(row, col) {
  if (
    row >= 0 &&
    row < MATRIX_MAP.length &&
    col >= 0 &&
    col < MATRIX_MAP[row].length
  ) {
    return MATRIX_MAP[row][col];
  }
  return null;
}

// Helper: Get display name for a key
function getDisplayName(keyName) {
  if (!keyName) return "—";
  return keyDisplayNames[keyName] || keyName;
}

// Render raw matrix view
function renderRawMatrix() {
  const container = document.getElementById("matrixView");
  container.innerHTML = "";

  for (let row = 0; row < MATRIX_MAP.length; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "matrix-row";

    for (let col = 0; col < MATRIX_MAP[row].length; col++) {
      const key = MATRIX_MAP[row][col];
      const cell = document.createElement("div");
      cell.className = "matrix-cell" + (key ? " has-key" : " empty");

      const coordSpan = document.createElement("div");
      coordSpan.className = "matrix-coord";
      coordSpan.textContent = `${row},${col}`;

      const nameSpan = document.createElement("div");
      nameSpan.className = "key-name";
      nameSpan.textContent = key ? getDisplayName(key) : "NULL";

      cell.appendChild(coordSpan);
      cell.appendChild(nameSpan);

      cell.title = key
        ? `Position (${row},${col}) → ${key}`
        : `Empty matrix position (${row},${col})`;
      rowDiv.appendChild(cell);
    }
    container.appendChild(rowDiv);
  }
}

// Render visual keyboard from JSON layout
function renderKeyboard() {
  const container = document.getElementById("keyboardView");
  container.innerHTML = "";

  const keymap = keyboardLayout.layouts.keymap;

  for (let rowIdx = 0; rowIdx < keymap.length; rowIdx++) {
    const row = keymap[rowIdx];
    const rowDiv = document.createElement("div");
    rowDiv.className = "key-row";

    let colOffset = 0;

    for (let i = 0; i < row.length; i++) {
      const item = row[i];
      let width = 1;
      let coordStr = null;

      // Handle width modifiers
      if (typeof item === "object" && item.w) {
        width = item.w;
        // Next item should be the coordinate
        if (i + 1 < row.length) {
          coordStr = row[i + 1];
          i++; // Skip the next item since we consumed it
        }
      } else {
        coordStr = item;
      }

      const coord = parseCoord(coordStr);
      let keyName = null;
      let displayName = "?";

      if (coord) {
        keyName = getKeyAt(coord.row, coord.col);
        displayName = keyName ? getDisplayName(keyName) : "Empty";
      }

      const keyDiv = document.createElement("div");
      keyDiv.className = "key";
      keyDiv.style.width = `${width * 50}px`;
      keyDiv.style.minWidth = `${width * 40}px`;
      keyDiv.innerHTML = `
                    ${displayName}
                    <span class="coord-badge">${coordStr || "?"}</span>
                `;

      if (keyName) {
        keyDiv.title = `Matrix: (${coord.row},${coord.col})\nKey: ${keyName}`;
      } else {
        keyDiv.title = `No key assigned at ${coordStr}`;
        keyDiv.style.opacity = "0.5";
      }

      rowDiv.appendChild(keyDiv);
      colOffset += width;
    }

    container.appendChild(rowDiv);
  }
}

// Calculate and display statistics
function showStats() {
  let totalCells = 0;
  let usedCells = 0;
  const keyCounts = new Map();

  for (let row = 0; row < MATRIX_MAP.length; row++) {
    for (let col = 0; col < MATRIX_MAP[row].length; col++) {
      totalCells++;
      const key = MATRIX_MAP[row][col];
      if (key) {
        usedCells++;
        keyCounts.set(key, (keyCounts.get(key) || 0) + 1);
      }
    }
  }

  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = `
            <div><strong>📐 Matrix dimensions:</strong> ${MATRIX_MAP.length} rows × ${MATRIX_MAP[0]?.length || 0} columns</div>
            <div><strong>⌨️ Total matrix positions:</strong> ${totalCells}</div>
            <div><strong>✅ Used positions (active keys):</strong> ${usedCells} (${((usedCells / totalCells) * 100).toFixed(1)}%)</div>
            <div><strong>❌ Empty positions (None):</strong> ${totalCells - usedCells}</div>
            <div><strong>🔢 Unique keys mapped:</strong> ${keyCounts.size}</div>
            <div style="margin-top: 8px;"><strong>📋 Physical key count from JSON layout:</strong> ~68 keys (standard 60% + arrows)</div>
        `;

  // Log to console for debugging
  console.log("Matrix Stats:", {
    totalCells,
    usedCells,
    uniqueKeys: keyCounts.size,
  });
  console.log("Key frequency:", Object.fromEntries(keyCounts));
}

// Initialize everything
function init() {
  renderRawMatrix();
  renderKeyboard();
  showStats();

  // Add some extra info
  console.log("Keyboard Matrix Visualizer loaded");
  console.log("RUST MATRIX MAP (5×14):", MATRIX_MAP);
  console.log("JSON Layout:", keyboardLayout);
}

init();
