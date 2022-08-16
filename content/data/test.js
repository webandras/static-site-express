const yaml = require("js-yaml");
const fs = require("fs");

// Get document, or throw exception on error
try {
  const doc = yaml.load(fs.readFileSync("opening-hours.yml", "utf8"));
  console.log(doc.Monday);
} catch (e) {
  console.log(e);
}
