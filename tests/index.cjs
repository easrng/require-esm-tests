const inspect = require("object-inspect");
(async () => {
  const results = {};
  function descs(o) {
    const r = {};
    for (const k of Reflect.ownKeys(o)) {
      if (k === Symbol.toStringTag && o[Symbol.toStringTag] === "Module") {
        continue;
      }
      const d = Reflect.getOwnPropertyDescriptor(o, k);
      r[k] = {
        value: o[k],
        writable: "value" in d ? d.writable : !!d.set,
        enumerable: d.enumerable,
        configurable: d.configurable,
      };
    }
    return r;
  }
  async function check(name, cjs, esm) {
    let cjs1, cjs2, esm1, esm2;
    try {
      cjs1 = cjs();
      cjs2 = cjs();
      esm1 = await esm();
      esm2 = await esm();
    } catch (e) {
      results[name] = { error: e.message };
      return;
    }
    results[name] = {
      esmNamespaceStable: esm1 === esm2,
      cjsExportsStable: cjs1 === cjs2,
      cjsExportIsEsmNamespace: cjs1 === esm1,
      cjsDescriptors: cjs1 == null ? cjs1 : descs(cjs1),
      esmDescriptors: esm1 == null ? esm1 : descs(esm1),
    };
  }
  await check(
    "./basic.mjs",
    () => require("./basic.mjs"),
    () => import("./basic.mjs"),
  );
  await check(
    "./defaultEsModule.mjs",
    () => require("./defaultEsModule.mjs"),
    () => import("./defaultEsModule.mjs"),
  );
  await check(
    "./esModule.mjs",
    () => require("./esModule.mjs"),
    () => import("./esModule.mjs"),
  );
  await check(
    "./falseEsModule.mjs",
    () => require("./falseEsModule.mjs"),
    () => import("./falseEsModule.mjs"),
  );
  await check(
    "./undefinedEsModule.mjs",
    () => require("./undefinedEsModule.mjs"),
    () => import("./undefinedEsModule.mjs"),
  );
  await check(
    "./module.exports.mjs",
    () => require("./module.exports.mjs"),
    () => import("./module.exports.mjs"),
  );
  await check(
    "./soloDefault.mjs",
    () => require("./soloDefault.mjs"),
    () => import("./soloDefault.mjs"),
  );
  await check(
    "./default.mjs",
    () => require("./default.mjs"),
    () => import("./default.mjs"),
  );
  console.log(inspect(results, { indent: 2 }));
})();
