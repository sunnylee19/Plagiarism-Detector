let fs = require('fs');
let unzip = require('unzip-stream');
let glob = require('glob');
let tstraverse = require('tstraverse');
let path = require("path");

/**
 * This function unzips the file and stores the data at the location specified.
 * 
 * @param pathFrom the path to the zip file that needs to be unzipped.
 * @param pathTo the directory the contents of the zip file are extracted to.
 */
export async function unzipFile(pathFrom: string, pathTo: string) {
  return await new Promise((resolve) =>
    fs.createReadStream(pathFrom).pipe(
      unzip.Extract({ path: pathTo }).on("close", () => {
        resolve();
      })
    )
  );
}

/**
 * Method to read the code from the program files.
 * 
 * @param folderPath the path to the files that are to be read.
 */
export function readCodeFromFile(folderPath: string): any[] {
  let retCodeList: any[] = [];
  let files = glob.sync(folderPath);
  files.forEach((element: any) => {
    retCodeList.push({ code: fs.readFileSync(element, "utf8"), fileName: path.basename(element) });
  });
  return retCodeList;
}

/**
 * This function iterates thorough all the js files in the given directry and parses them to an ast.
 * The AST is returned.
 * 
 * @param path the folder that contains the program files that need to be parsed.
 */
export function parseFile(code: string) {
  return tstraverse.helpers.parse(code);
}