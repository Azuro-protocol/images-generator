import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import builtins from 'builtin-modules/static'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'


const TARGETS_TO_COPY = [
  './src/index.html',
  './src/index.css',
  './src/images',
]

export default [
  {
    input: './index.ts',
    output: [
      {
        file: './lib/index.js',
        format: 'cjs',
        exports: 'named',
      },
      {
        file: './dist/index.es.js',
        format: 'es',
        exports: 'named',
      },
    ],
    external: [
      ...builtins,
      'puppeteer',
    ],
    plugins: [
      nodeResolve({
        rootDir: path.join(process.cwd(), '../../node_modules'), // repository root dir
      }),
      commonjs(),
      json(),
      babel({
        exclude: 'node_modules/**',
      }),
      typescript({
        tsconfigOverride: {
          include: [
            path.join(process.cwd(), 'src'),
          ],
        },
        clean: true,
        // ATTN https://github.com/ezolenko/rollup-plugin-typescript2#some-compiler-options-are-forced
        // >> declarationDir: Rollup's output.file or output.dir (unless useTsconfigDeclarationDir is true in the plugin options)
        // this allows to create only one .d.ts file in src/ folder of a package
        useTsconfigDeclarationDir: true,
      }),
      copy({
        targets: [
          {
            src: TARGETS_TO_COPY,
            dest: './lib',
          },{
            src: TARGETS_TO_COPY,
            dest: './dist',
          },
        ]
      })
    ],
  }
]
