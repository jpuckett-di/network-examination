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

  if (extension.startsWith("com")) {
    return;
  }

  return extension;
}

const results = {};

function addNewExtension(extension) {
  if (!results.hasOwnProperty(extension)) {
    results[extension] = [];
  }
}

function pushNewQuery(extension, value) {
  if (!value) {
    return;
  }

  if (!results[extension].includes(value)) {
    results[extension].push(value);
  }
}

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
        const extension = findUrlExtension(url);
        addNewExtension(extension);

        for (const query in (string = entries[key].request.queryString)) {
          pushNewQuery(extension, string[query].name);
        }
      }
    }
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
  }

  console.log(results);
});
