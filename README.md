## USAGE

- In "./" run "cargo build"
- In "./" run "wasm-pack build"
- In "./" run "npm init wasm-app www"
- In "./www":
  - delete .git
  - run "npm i --save ../pkg"
  - run "npm update"
  - change index.js to 
    ```js
    import * as wasm from "physical-engine";wasm.start();
    ```
  - run "npm run start"