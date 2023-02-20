import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'es'
  },
  external: ['axios'],
  plugins: [typescript(), commonjs(), babel({ babelHelpers: 'bundled' })]
}
