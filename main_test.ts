import { assertEquals, assertExists, assertFalse } from "https://deno.land/std@0.192.0/testing/asserts.ts";
import { XlsxToMD } from "./main.ts";

Deno.test("disp data", async () => {
  await XlsxToMD.convert("sample.xlsx", true).then((data)=> {
    console.log(data);
    assertFalse(false);
  }).catch((reason) => {
    console.log(reason);
    assertFalse(true);
  });
});

