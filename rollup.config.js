import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [{
  plugins: [babel(), commonjs(), resolve()],
  input: 'src/iotz.js',
  output: {
    name: 'IOTZ',
    file: 'dist/iotz.js',
    format: 'umd',
  }
}];
