@echo off

rem Run cargo build
echo Running 'cargo build'...
cargo build

rem Run wasm-pack build
echo Running 'wasm-pack build'...
wasm-pack build

rem Run npm init wasm-app www
echo Running create_www
node create_www.js