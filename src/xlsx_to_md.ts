import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.18.3/package/xlsx.mjs";

type SourceInfo = {
  filePath: string;
  sheetNumber?: number | undefined;
  hederExists?: boolean | undefined; 
};

export class XlsxToMD {
  static convert(info: SourceInfo) {
    return new Promise((resolve, reject) => {
      try {
        const u8: Uint8Array = Deno.readFileSync(info.filePath);
        const wb = XLSX.read(u8);
        this.getMDData(wb, info);
        resolve(wb);
      } catch(e) {
        reject(e);
      }
    });
  }
  private static getMDData(wb:any, info: SourceInfo) {
    if (wb == null || info == null) throw new Error("parameter is null/undefined");
    const sheet = wb.Sheets[wb.SheetNames[info.sheetNumber ?? 0]];
    const header = info.hederExists ?? false;
    const range = XLSX.utils.decode_range(sheet['!ref']);

    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const pos = XLSX.utils.encode_cell({r:row, c:col});
        const cell = sheet[pos];
        console.log(cell.v);
      }
    }
  }
}