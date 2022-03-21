import builtins from 'builtin-modules/static'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'

import pkg from './package.json'


export default {
  input: 'index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
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
      rollupCommonJSResolveHack: false,
      clean: true,
    }),
    copy({
      targets: [
        { src: ['src/templates', 'src/images', 'src/css'], dest: 'lib/src' },
      ]
    })
  ],
}
