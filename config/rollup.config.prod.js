import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.js',
  output: {
    file: './dist/stuffs.min.js',
    format: 'iife',
    name: 'stuffs',
    sourcemap: true,
  },
  plugins: [
    terser(),
    resolve(),
  ]
};