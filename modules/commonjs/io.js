const fs  = require("fs");

const val = fs.readFileSync("./index.js", "utf8");
console.log(val);

fs.readFile("./index.js", "utf8", (err, data) => {});