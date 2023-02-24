import glob from 'glob'
import path from 'node:path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import builtins from 'builtin-modules/static'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'


const templateFolders = (
  glob.sync('src/templates/*')
    .filter((folder) => !folder.includes('_template'))
    .map((folder) => path.relative('src', folder))
)

const TARGETS_TO_COPY = [
  'index.html',
  'images',
]

const main = {
  input: './src/index.ts',
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
    nodeResolve(),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
    typescript({
      tsconfigOverride: {
        include: [
          'src/index.ts',
        ],
      },
      clean: true,
    }),
    copy({
      targets: templateFolders.map((folder) => (
        TARGETS_TO_COPY.map((fileName) => (
          [ 'dist', 'lib' ].map((dest) => ({
            src: path.join('src', folder, fileName),
            dest: path.join(dest, folder),
          })).flat()
        )).flat()
      )).flat(),
    })
  ],
}

const templates = {
  input: Object.fromEntries(
    templateFolders.map((file) => [
      path.join(file, 'index'),
      path.resolve(`src/${file}/index.ts`),
    ])
  ),
  output: [
    {
      dir: 'lib',
      format: 'cjs',
      exports: 'default',
    },
    {
      dir: 'dist',
      format: 'es',
    },
  ],
  external: [
    ...builtins,
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**',
    }),
    typescript({
      clean: true,
    }),
  ],
}

export default [
  main,
  templates,
]
