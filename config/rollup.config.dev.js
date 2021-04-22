import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.js',
  output: {
    file: './build/stuffs.js',
    format: 'iife',
    name: 'stuffs',
    sourcemap: 'inline',
  },
  plugins: [
    resolve()
  ]
};