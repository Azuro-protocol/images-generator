import path from 'path'
import builtins from 'builtin-modules/static'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'

import pkg from './package.json'


const pkgName = process.cwd().replace(/.+\//, '')

const getPkgPath = (filePath) => path.resolve(__dirname, `packages/${pkgName}/${filePath}`)

export default [
  {
    input: getPkgPath('src/index.ts'),
    output: [
      {
        file: getPkgPath('lib/index.js'),
        format: 'cjs',
        exports: 'named',
      },
      {
        file: getPkgPath('dist/index.es.js'),
        format: 'es',
        exports: 'named',
      },
    ],
    external: [
      ...builtins,
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
      json(),
      babel({
        exclude: 'node_modules/**',
      }),
      typescript({
        tsconfigOverride: {
          include: [
            getPkgPath('src'),
          ],
        },
        // ATTN https://github.com/ezolenko/rollup-plugin-typescript2#some-compiler-options-are-forced
        // >> declarationDir: Rollup's output.file or output.dir (unless useTsconfigDeclarationDir is true in the plugin options)
        // this allows to create only one .d.ts file in src/ folder of a package
        useTsconfigDeclarationDir: true,
      }),
      copy({
        targets: [
          {
            src: [
              getPkgPath('src/index.html'),
              getPkgPath('src/index.css'),
              getPkgPath('src/images'),
            ],
            dest: getPkgPath('lib'),
          },
        ]
      })
    ],
  }
]
