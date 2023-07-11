import { assertEquals, assertExists, assertFalse } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { XlsxToMD } from "./main.ts";

Deno.test("file opened", async () => {
  await XlsxToMD.convert({filePath:"sample.xlsx", sheetNumber:0}).then((data)=> {
    console.log(data);
    assertFalse(false);
  }).catch((reason) => {
    console.log(reason.name);
    assertFalse(true);
  });
});

Deno.test("path is empty", async () => {
  await XlsxToMD.convert({filePath:""}).then((data)=> {
    //console.log(data);
    assertFalse(true);
  }).catch((reason) => {
    console.log(reason.name);
    assertFalse(false);
  });
});
