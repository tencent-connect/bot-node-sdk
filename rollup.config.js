import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import {typescriptPaths} from 'rollup-plugin-typescript-paths';
import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';
import * as path from "path";

const ENV = process.env.NODE_ENV;
const extensions = ['.ts', '.js'];
const external = ['ws', 'resty-client'];
const outRoot = "D:\\workspace\\IdeaProjects\\gouhuai\\ahuai-bot\\src\\qq-guild-bot"
const outFile = (target) => path.join(outRoot, target)

export default [
  {
    input: 'src/index.ts',
    output: {
      file: outFile('lib/index.js'),
      format: 'cjs',
      sourcemap: ENV === 'dev',
    },
    plugins: [
      json(),
      babel({
        exclude: 'node_modules/**',
        extensions,
        babelHelpers: 'runtime',
      }),
      nodeResolve({browser: true, extensions}),
      typescriptPaths({
        preserveExtensions: true,
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(ENV),
      }),
    ],
    external,
  },
  {
    input: 'src/index.ts',
    output: {
      file: outFile('es/index.js'),
      format: 'es',
      sourcemap: ENV === 'dev',
    },
    plugins: [
      json(),
      babel({
        exclude: 'node_modules/**',
        extensions,
        babelHelpers: 'runtime',
      }),
      nodeResolve({browser: true, extensions}),
      typescriptPaths({
        preserveExtensions: true,
      }),
      commonjs(),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify(ENV),
      }),
    ],
    external,
  },
  {
    input: 'src/index.ts',
    output: [{file: outFile('typings/index.d.ts'), format: 'es'}],
    plugins: [
      json(),
      typescriptPaths({
        preserveExtensions: true,
      }),
      dts(),
    ],
  },
];
