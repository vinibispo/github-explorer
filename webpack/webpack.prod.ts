import { resolve } from 'path'
import { Configuration } from 'webpack'

const config: Configuration = {
  mode: 'production',
  output: {
    path: resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js',
    clean: true
  }
}

export default config
