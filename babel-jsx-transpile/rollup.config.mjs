import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

import _package from "./package.json" assert { type: "json" };

export default {
    input: _package.main,
    output: [
        {
            file: "dist/bundle.js",
            format: "cjs",
        },
    ],
    plugins: [
        nodeResolve(),
        commonjs(),
        babel({
            babelHelpers: "bundled",
            configFile: "./babel.config.json",
        }),
        json(),
    ],
};
