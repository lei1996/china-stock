import type { Context } from 'koa'
import { CONTROLLER, GET } from '../decorator'
import { getResponseData } from '../model'

@CONTROLLER()
export class ExampleController {
  @GET('/')
  async example(ctx: Context) {
    ctx.body = getResponseData('hello koa')
  }
}
