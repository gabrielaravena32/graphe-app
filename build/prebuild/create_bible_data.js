import { bibleData } from "./bible_data";

const fs = require("fs");
const crypto = require("crypto");

const hashFile = (filename) => {
  var f = fs.readFileSync(__dirname + filename);
  var md5 = crypto.createHash("md5");
  md5.update(f, "utf-8");
  return md5.digest("hex");
};

const createJSFile = () => {
  let data = `// DO NOT EDIT - THIS FILE IS AUTOGENERATED\nexport const bibleData = [`;
  for (let i = 0; i < bibleData.length; i++) {
    const bookData = bibleData[i];
    data += `
    {
      name: "${bookData.name}",
      abbreviation: "${bookData.abbreviation}",
      num_chapters: ${bookData.num_chapters},
      num_verses: [${bookData.num_verses.join(",")}],`;
    if (bookData.name == "Psalms") {
      data += `
      superscripts: [${bookData.superscripts.join(",")}],`;
    }
    data += `
      testament: "${bookData.testament}",
      version: [${bookData.version.map((v) => `"${v}"`).join(",")}],
    },`;
  }
  data += "\n] as const;";
  fs.writeFileSync(
    __dirname + "/../../frontend/src/lib/Scripture/data.ts",
    data,
  );
};

const createGoFile = () => {
  let data = `package app
// DO NOT EDIT - THIS FILE IS AUTOGENERATED

type BookData struct {
  name         string
  abbreviation string
  num_chapters int
  num_verses   []int
  superscripts []int
  testament    string
  version      []string
}

var bibleData = [...]BookData{`;
  for (let i = 0; i < bibleData.length; i++) {
    const bookData = bibleData[i];
    data += `
	{
		name: "${bookData.name}",
		abbreviation: "${bookData.abbreviation}",
		num_chapters: ${bookData.num_chapters},
		num_verses: []int{${bookData.num_verses.join(",")}},`;
    if (bookData.name == "Psalms") {
      data += `
		superscripts: []int{${bookData.superscripts.join(",")}},`;
    }
    data += `
		testament: "${bookData.testament}",
		version:   []string{${bookData.version.map((v) => `"${v}"`).join(",")}},
	},`;
  }
  data += "}";
  fs.writeFileSync(__dirname + "/../../internal/app/scripture_data.go", data);
};

export const createBibleData = () => {
  // Ensure this code only gets run on file change to `bible_data.js`
  let hash = hashFile("/bible_data.js");
  if (hash == fs.readFileSync(__dirname + "/bible_data.lock")) return;
  fs.writeFileSync(__dirname + "/bible_data.lock", hash);

  createJSFile(); // `frontend/src/lib/Scripture/data.ts`
  createGoFile(); // `internal/app/scripture_data.go`
};