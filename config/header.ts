import { ConcatSource } from "webpack-sources";
import webpack from "webpack";
const config = require("./meta.json");
const GM3Compat = config.GM3Compat ? true : false;

export class UserScriptHeaderPlugin {
  constructor() {}

  public apply(compiler: webpack.compiler.Compiler): void {
    const commenter = (key: string, value: string) => {
      return `// @${key.trim().replace(/[\n\t\r]/g, "")} ${value
        .trim()
        .replace(/[\n\t\r]/g, "")}`;
    };

    compiler.hooks.compilation.tap(
      "UserScriptHeaderPlugin",
      (compilation: webpack.compilation.Compilation) => {
        compilation.hooks.afterOptimizeChunkAssets.tap(
          "UserScriptHeaderPlugin",
          chunks => {
            for (const chunk of chunks) {
              for (const file of chunk.files) {
                let comment: string[] = [];
                comment.push("// ==UserScript==");

                for (const key of Object.keys(config)) {
                  if (key === "GM3Compat") continue;

                  let value = config[key];
                  if (!value) continue;

                  if (typeof value === "string") {
                    comment.push(commenter(key, value));
                  } else if (typeof value === "boolean") {
                    comment.push(commenter(key, ""));
                  } else if (Array.isArray(value)) {
                    if (key === "grant") {
                      for (const v of value) {
                        if (v === "unsafeWindow") {
                          comment.push(commenter("grant", "unsafeWindow"));
                        } else {
                          comment.push(commenter("grant", "GM." + v));
                          if (GM3Compat) {
                            comment.push(commenter("grant", "GM_" + v));
                          }
                        }
                      }
                    } else {
                      for (const v of value) {
                        comment.push(commenter(key, v));
                      }
                    }
                  }
                }
                comment.push("// ==/UserScript==\n");

                compilation.assets[file] = new ConcatSource(
                  comment.join("\n"),
                  compilation.assets[file]
                );
              }
            }
          }
        );
      }
    );
  }
}
