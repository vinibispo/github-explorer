import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'
const config: Configuration = {

  entry: path.resolve(__dirname, '..', 'src', 'index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '..', 'public', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /(\.(j|t)sx$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /(\.scss$)/,
        exclude: /node_modules/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: 'asset/resource'
      }
    ],
  },
}
export default config
