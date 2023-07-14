import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.18.3/package/xlsx.mjs";

type SourceInfo = {
  filePath: string;
  sheetNumber?: number;
  hederExists?: boolean;
  alignment?: 'right' | 'left' | 'center';
};

export class XlsxToMD {
  static convert(info: SourceInfo) {
    return new Promise((resolve, reject) => {
      try {
        const u8: Uint8Array = Deno.readFileSync(info.filePath);
        const wb = XLSX.read(u8);
        const mdTable = this.toMDTable(this.toArray(wb, info), info);
        resolve(mdTable);
      } catch(e) {
        reject(e);
      }
    });
  }

  // deno-lint-ignore no-explicit-any
  private static toArray(wb:any, info: SourceInfo): string[][] { 
    if (wb == null || info == null) throw new Error("parameter is null/undefined");
    const sheet = wb.Sheets[wb.SheetNames[info.sheetNumber ?? 0]];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const array: string[][] = [];

    for (let row = range.s.r; row <= range.e.r; row++) {
      const cols = [];
      for (let col = range.s.c; col <= range.e.c; col++) {
        const pos = XLSX.utils.encode_cell({r:row, c:col});
        const cell = sheet[pos];
        cols.push(cell.v);
      }
      array.push(cols);
    }
    return array;
  }

  private static toMDTable(array: string[][], info: SourceInfo): string {
    let table = "";
    array.forEach((line, i) => {
      table += '|' + line.join('|') + '|\n';
      if (i === 0) {
        table += this.createHeaderSeparator(line, info);
      }
    });
    return table;
  }

  private static createHeaderSeparator(firstRows: string[], info: SourceInfo) {
    let separator = '';
    firstRows.forEach(v => {
      separator += '|';
      let alignSymbol = '';
      const alignment = info.alignment ?? 'left';
      const length = (v.length-1) <= 0 ? 2 : (v.length); 
      if (alignment == 'right') {
        alignSymbol = '-'.repeat(length-1) + ':';
      }
      else if (alignment == 'left') {
        alignSymbol = ':' + '-'.repeat(length-1);
      } 
      else {
        alignSymbol = ':' + '-'.repeat(length-2 <= 0 ? 1:length-2) + ':';
      }
      separator += alignSymbol;
    });
    return separator += '|\n';
  }
}