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
          x: 15,
          y: 0,
          w: 1,
          label: null,
          note: "Backtick — physically present, not yet wired in firmware",
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
          x: 15,
          y: 1,
          w: 1,
          label: null,
          note: "Page Up — physically present, not yet wired in firmware",
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
          x: 15,
          y: 2,
          w: 1,
          label: null,
          note: "Page Down — physically present, not yet wired in firmware",
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
          x: 14,
          y: 3,
          w: 1,
          label: null,
          note: "Unassigned — [3,12]=None; UpArrow is wired via matrix row 4 at [4,8]",
        },
        {
          x: 15,
          y: 3,
          w: 1,
          label: null,
          note: "Delete — physically present, not yet wired ([3,13]=None)",
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
        { matrix: [4, 8], x: 14, y: 4, w: 1, label: "UpArrow" },
        { matrix: [4, 9], x: 15, y: 4, w: 1, label: "RightArrow" },
      ],
    },
  },
};

// ================================================================
// KEY DISPLAY NAMES — human-readable labels for the visualizer
// Maps Rust KeyPosition enum variant name → displayed text.
// Add entries here for any new KeyPosition variants you add.
// ================================================================
const KEY_DISPLAY_NAMES = {
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
  Backspace: "⌫",
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

// ================================================================
// GENERIC ENGINE — no layout-specific code below this line
// ================================================================

const KEY_UNIT_PX = 50; // pixels per 1u key-unit

function getDisplayName(label) {
  if (!label) return "—";
  return KEY_DISPLAY_NAMES[label] ?? label;
}

// Group layout keys by visual row (y value), sorted left-to-right within each row
function getVisualRows() {
  const keys = LAYOUT_DATA.layouts.LAYOUT.layout;
  const rowMap = new Map();
  for (const key of keys) {
    if (!rowMap.has(key.y)) rowMap.set(key.y, []);
    rowMap.get(key.y).push(key);
  }
  return [...rowMap.entries()]
    .sort(([a], [b]) => a - b)
    .map(([, keys]) => keys.sort((a, b) => a.x - b.x));
}

// Build a rows×cols grid from the layout's matrix assignments
function deriveMatrixMap() {
  const { rows, cols } = LAYOUT_DATA.matrix;
  const grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  for (const key of LAYOUT_DATA.layouts.LAYOUT.layout) {
    if (Array.isArray(key.matrix)) {
      const [r, c] = key.matrix;
      if (r < rows && c < cols) grid[r][c] = key.label ?? null;
    }
  }
  return grid;
}

// ---- Renderers ----

function renderKeyboard() {
  const container = document.getElementById("keyboardView");
  container.innerHTML = "";

  for (const rowKeys of getVisualRows()) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "key-row";

    for (const key of rowKeys) {
      const w = key.w ?? 1;
      const keyDiv = document.createElement("div");
      keyDiv.className = "key" + (key.label ? "" : " key-unimplemented");
      keyDiv.style.width = `${w * KEY_UNIT_PX}px`;
      keyDiv.style.minWidth = `${w * KEY_UNIT_PX - 6}px`;

      const matrixStr = Array.isArray(key.matrix)
        ? `[${key.matrix[0]},${key.matrix[1]}]`
        : "—";

      keyDiv.innerHTML = `${getDisplayName(key.label)}<span class="coord-badge">${matrixStr}</span>`;
      keyDiv.title = key.matrix
        ? `Matrix: [${key.matrix}]  Key: ${key.label}`
        : (key.note ?? "Not wired in matrix");

      rowDiv.appendChild(keyDiv);
    }
    container.appendChild(rowDiv);
  }
}

function renderRawMatrix() {
  const container = document.getElementById("matrixView");
  container.innerHTML = "";
  const matrixMap = deriveMatrixMap();

  for (let row = 0; row < matrixMap.length; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "matrix-row";

    for (let col = 0; col < matrixMap[row].length; col++) {
      const label = matrixMap[row][col];
      const cell = document.createElement("div");
      cell.className = "matrix-cell" + (label ? " has-key" : " empty");

      const coordSpan = document.createElement("div");
      coordSpan.className = "matrix-coord";
      coordSpan.textContent = `${row},${col}`;

      const nameSpan = document.createElement("div");
      nameSpan.className = "key-name";
      nameSpan.textContent = label ? getDisplayName(label) : "NULL";

      cell.title = label
        ? `Matrix [${row},${col}] → ${label}`
        : `Empty matrix position [${row},${col}]`;
      cell.appendChild(coordSpan);
      cell.appendChild(nameSpan);
      rowDiv.appendChild(cell);
    }
    container.appendChild(rowDiv);
  }
}

// ---- Validation ----

function validateLayout() {
  const { rows, cols } = LAYOUT_DATA.matrix;
  const issues = [];
  const warnings = [];
  const seen = new Map(); // "r,c" → label
  let wiredCount = 0;
  let unwiredCount = 0;

  for (const key of LAYOUT_DATA.layouts.LAYOUT.layout) {
    if (!Array.isArray(key.matrix)) {
      unwiredCount++;
      continue;
    }

    wiredCount++;
    const [r, c] = key.matrix;
    const pos = `${r},${c}`;

    if (r >= rows || c >= cols) {
      issues.push(
        `Key "${key.label}" — matrix [${r},${c}] is OUT OF BOUNDS ` +
          `(layout declares ${rows}×${cols})`,
      );
    } else if (seen.has(pos)) {
      issues.push(
        `DUPLICATE matrix position [${r},${c}]: ` +
          `assigned to both "${seen.get(pos)}" and "${key.label}"`,
      );
    } else {
      seen.set(pos, key.label ?? "(null)");
    }

    if (key.label === null || key.label === undefined) {
      warnings.push(
        `Key at matrix [${r},${c}] has a matrix position but label is null`,
      );
    }
  }

  // Check for any KeyPosition names used more than once
  const labelCount = new Map();
  for (const key of LAYOUT_DATA.layouts.LAYOUT.layout) {
    if (key.label)
      labelCount.set(key.label, (labelCount.get(key.label) ?? 0) + 1);
  }
  for (const [label, count] of labelCount) {
    if (count > 1)
      warnings.push(
        `KeyPosition "${label}" is used ${count} times in the layout`,
      );
  }

  return { issues, warnings, wiredCount, unwiredCount };
}

function renderValidation() {
  const { issues, warnings, wiredCount, unwiredCount } = validateLayout();
  const { rows, cols } = LAYOUT_DATA.matrix;
  const totalPositions = rows * cols;
  const totalPhysical = wiredCount + unwiredCount;

  let html = "";

  if (issues.length === 0 && warnings.length === 0) {
    html +=
      '<div class="validation-ok">✅ Layout validated — no issues found</div>';
  }
  if (issues.length > 0) {
    html += `<div class="validation-errors"><strong>❌ ${issues.length} Error(s):</strong><ul>`;
    for (const msg of issues) html += `<li>${msg}</li>`;
    html += "</ul></div>";
  }
  if (warnings.length > 0) {
    html += `<div class="validation-warnings"><strong>⚠️ ${warnings.length} Warning(s):</strong><ul>`;
    for (const msg of warnings) html += `<li>${msg}</li>`;
    html += "</ul></div>";
  }

  html += `
    <div class="validation-info">
      <div>📐 <strong>Matrix declared:</strong> ${rows} rows × ${cols} cols = ${totalPositions} positions</div>
      <div>✅ <strong>Wired keys (have a matrix entry):</strong> ${wiredCount}</div>
      <div>⬜ <strong>Unwired physical keys (label = null):</strong> ${unwiredCount}</div>
      <div>🔢 <strong>Total physical keys on keyboard:</strong> ${totalPhysical}</div>
      <div>📦 <strong>Matrix utilisation:</strong> ${wiredCount} / ${totalPositions} positions used (${((wiredCount / totalPositions) * 100).toFixed(1)}%)</div>
    </div>`;

  document.getElementById("validationView").innerHTML = html;
}

function showStats() {
  const matrixMap = deriveMatrixMap();
  let totalCells = 0,
    usedCells = 0;
  const keyCounts = new Map();

  for (const row of matrixMap) {
    for (const label of row) {
      totalCells++;
      if (label) {
        usedCells++;
        keyCounts.set(label, (keyCounts.get(label) ?? 0) + 1);
      }
    }
  }

  document.getElementById("stats").innerHTML = `
    <div><strong>📐 Matrix dimensions:</strong> ${matrixMap.length} rows × ${matrixMap[0]?.length ?? 0} columns</div>
    <div><strong>⌨️  Total matrix positions:</strong> ${totalCells}</div>
    <div><strong>✅ Used positions (active keys):</strong> ${usedCells} (${((usedCells / totalCells) * 100).toFixed(1)}%)</div>
    <div><strong>❌ Empty positions (None):</strong> ${totalCells - usedCells}</div>
    <div><strong>🔢 Unique keys mapped:</strong> ${keyCounts.size}</div>
  `;

  console.log("Keyboard Layout Visualizer:", LAYOUT_DATA.name);
  console.log("Derived MATRIX_MAP:", deriveMatrixMap());
  console.log("Validation:", validateLayout());
}

// ---- Bootstrap ----
function init() {
  document.querySelector("h1").textContent += ` — ${LAYOUT_DATA.name}`;
  renderRawMatrix();
  renderKeyboard();
  renderValidation();
  showStats();
}

init();
