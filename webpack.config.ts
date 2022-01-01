import { merge } from 'webpack-merge'
import baseConfig from './webpack/webpack.base'
const mode = process.env.NODE_ENV === 'development' ? 'dev' : 'prod'
import devConfig  from './webpack/webpack.dev'
import prodConfig from './webpack/webpack.prod'

const config = mode === 'dev' ? devConfig : prodConfig
export default merge(baseConfig, config)
