import { resolve } from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: resolve(__dirname, '..', 'public'),
    hot: true
  }
}

export default config
