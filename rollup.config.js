import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts';

const ENV = process.env.NODE_ENV;
const extensions = ['.ts', '.js'];
const external = ['form-data', 'lodash.clonedeep', 'setimmediate', 'utf-8-validate', 'ws', 'node-rest-client'];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'lib/index.js',
      format: 'cjs',
      sourcemap: ENV === 'dev',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        extensions,
        babelHelpers: 'runtime',
      }),
      nodeResolve({ browser: true, extensions }),
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
      file: 'es/index.js',
      format: 'es',
      sourcemap: ENV === 'dev',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
        extensions,
        babelHelpers: 'runtime',
      }),
      nodeResolve({ browser: true, extensions }),
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
    output: [{ file: 'typings/index.d.ts', format: 'es' }],
    plugins: [
      typescriptPaths({
        preserveExtensions: true,
      }),
      dts(),
    ],
  },
];
