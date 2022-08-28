import 'reflect-metadata'

export const enum Methods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

const requestDecorator = (type: Methods) => {
  return (path: string) => {
    // 这里 可以用类 限制 target的类型： target: LoginController | DataController
    // 通用模块不建议这么写。用 any 代替
    return (target: any, key: string) => {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type.toLowerCase(), target, key)
    }
  }
}

// 生成多种请求类型
export const GET = requestDecorator(Methods.GET)
export const POST = requestDecorator(Methods.POST)
export const PUT = requestDecorator(Methods.PUT)
export const DELETE = requestDecorator(Methods.DELETE)
