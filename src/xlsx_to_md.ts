import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.18.3/package/xlsx.mjs";

export class XlsxToMD {
  
  static convert(filePath: string, existHeader: boolean = false) {
    return new Promise((resolve, reject) => {
      try {
        const u8: Uint8Array = Deno.readFileSync(filePath);
        const wb = XLSX.read(u8);
        resolve(wb);
      } catch {
        reject("can not open file.");
      }
    });
  }
}