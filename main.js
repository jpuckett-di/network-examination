const fs = require("fs");
const file = process.argv[2];

function splitOnLastCharacter(str, char) {
  const lastIndex = str.lastIndexOf(char);

  if (lastIndex === -1) {
    return [str];
  }

  return [str.slice(0, lastIndex), str.slice(lastIndex + 1)];
}

function findUrlExtension(url) {
  const noQuery = splitOnLastCharacter(url, "?")[0];
  const extension = splitOnLastCharacter(noQuery, ".")[1];

  if (extension.startsWith('com')) {
    return
  }

  return extension
}

function pushNew(array, value) {
  if (!value) {
    return;
  }

  if (!array.includes(value)) {
    array.push(value);
  }
}

const extensions = [];

fs.readFile(file, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  try {
    const entries = JSON.parse(data).log.entries;

    for (const key in entries) {
      const url = entries[key].request.url;
      if (url.startsWith("https://uat-autopreferred.chase.com")) {
        console.log(url);
        const extension = findUrlExtension(url);
        pushNew(extensions, extension);
        console.log(extension);
        console.log(entries[key].request.queryString, "\n");
      }
    }
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }

  console.log(extensions);
});
