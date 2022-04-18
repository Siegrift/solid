const { rmSync, existsSync } = require("fs");
const { join } = require("path");
const { copySync } = require("fs-extra");

const source = join(__dirname, "../dom-expressions/packages/dom-expressions");
const dest = join(__dirname, "./node_modules/dom-expressions");

if (!existsSync(source)) {
  console.error(`Expected ${source} to exist!`);
  throw new Error("Please, follow the README to understand how to properly initialize the project");
}

rmSync(dest, { recursive: true, force: true });
copySync(source, dest);

console.log("Success!");
