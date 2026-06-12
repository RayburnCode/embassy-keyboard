/** @format */

import LAYOUT_DATA from "./layout.js";
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
  Backtick: "`",
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
