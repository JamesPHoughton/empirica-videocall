//import { nodeResolve } from '@rollup/plugin-node-resolve';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";

const packageJson = require("./package.json");

export default {
    input: 'src/index.js',
    output: {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(), // must be before babel plugin
        babel({
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }),
    ]
}