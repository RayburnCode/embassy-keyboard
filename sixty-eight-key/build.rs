use std::collections::HashMap;
use std::env;
use std::fs::{self, File};
use std::io::Write;
use std::path::PathBuf;

fn main() {
    let out = PathBuf::from(env::var("OUT_DIR").unwrap());

    // Copy memory.x to OUT_DIR so the linker can find it
    // (cortex-m-rt's link.x does `INCLUDE memory.x`)
    File::create(out.join("memory.x"))
        .unwrap()
        .write_all(include_bytes!("memory.x"))
        .unwrap();

    println!("cargo:rustc-link-search={}", out.display());
    println!("cargo:rerun-if-changed=memory.x");

    // Generate MATRIX_MAP from src/keyboard-layout.json
    // Edit that file to change the layout — no need to touch keymap.rs manually.
    generate_matrix_map(&out);
}

fn generate_matrix_map(out: &PathBuf) {
    let json_path = "src/keyboard-layout.json";
    println!("cargo:rerun-if-changed={}", json_path);

    let json = fs::read_to_string(json_path)
        .unwrap_or_else(|e| panic!("Failed to read {}: {}", json_path, e));

    let layout: serde_json::Value = serde_json::from_str(&json)
        .unwrap_or_else(|e| panic!("Failed to parse {}: {}", json_path, e));

    let rows = layout["matrix"]["rows"]
        .as_u64()
        .expect("keyboard-layout.json: missing matrix.rows") as usize;
    let cols = layout["matrix"]["cols"]
        .as_u64()
        .expect("keyboard-layout.json: missing matrix.cols") as usize;

    // Build an empty rows×cols grid of Option<String>
    let mut grid: Vec<Vec<Option<String>>> = vec![vec![None; cols]; rows];
    let mut seen: HashMap<(usize, usize), String> = HashMap::new();
    let mut wired = 0usize;

    let keys = layout["layouts"]["LAYOUT"]["layout"]
        .as_array()
        .expect("keyboard-layout.json: missing layouts.LAYOUT.layout");

    for key in keys {
        let Some(matrix) = key.get("matrix") else { continue };
        let (Some(r64), Some(c64)) = (matrix[0].as_u64(), matrix[1].as_u64()) else {
            panic!("keyboard-layout.json: matrix coordinate must be [row, col] integers");
        };
        let (r, c) = (r64 as usize, c64 as usize);

        if r >= rows || c >= cols {
            panic!(
                "keyboard-layout.json: matrix [{},{}] is out of bounds (layout is {}×{})",
                r, c, rows, cols
            );
        }

        let label: Option<String> = match key.get("label") {
            Some(serde_json::Value::String(s)) => Some(s.clone()),
            _ => None,
        };

        let label_str = label.as_deref().unwrap_or("(null)").to_string();
        if let Some(prev) = seen.insert((r, c), label_str.clone()) {
            panic!(
                "keyboard-layout.json: duplicate matrix position [{},{}] — \
                 previously assigned to \"{}\", now to \"{}\"",
                r, c, prev, label_str
            );
        }

        grid[r][c] = label;
        wired += 1;
    }

    // Emit the Rust source file
    let mut code = String::from(
        "// Auto-generated from src/keyboard-layout.json — DO NOT EDIT MANUALLY\n\
         // Run `cargo build` after editing keyboard-layout.json to regenerate.\n",
    );
    code.push_str(&format!(
        "pub const MATRIX_MAP: [[Option<KeyPosition>; {}]; {}] = [\n",
        cols, rows
    ));
    for row_data in &grid {
        code.push_str("    [");
        let entries: Vec<String> = row_data
            .iter()
            .map(|cell| match cell {
                Some(label) => format!("Some(KeyPosition::{})", label),
                None => "None".to_string(),
            })
            .collect();
        code.push_str(&entries.join(", "));
        code.push_str("],\n");
    }
    code.push_str("];\n");

    let out_path = out.join("matrix_map.rs");
    fs::write(&out_path, &code)
        .unwrap_or_else(|e| panic!("Failed to write matrix_map.rs: {}", e));

    println!(
        "cargo:warning=Generated MATRIX_MAP ({}×{}) with {} wired keys from keyboard-layout.json",
        rows, cols, wired
    );
}
