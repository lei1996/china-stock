import Koa from 'koa'
import 'dotenv/config'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import { setupSessionConfig } from './config/session'
import './controller'
import { router } from './router'

const app = new Koa()
const { port } = process.env

const { session } = setupSessionConfig(app)
  ;[
  session, // session 相关信息 设置登陆时间等等
  cors(), // 允许跨域
  bodyParser(), // 解析post请求
  router.routes(),
  router.allowedMethods(),
].map(m => app.use(m))

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`----- Server is listening on port ${port} -----`)
})
