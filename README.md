# Koa Starter 

## Features ✨

- Koa2
- TypeScript
- ESM
- Koa-Router

## Getting Started 🚀

```bash
# install deps
pnpm i
# start app
pnpm start
```

The koa web servcice will listen on port 3000 default.

If you want to change the default listen port, Please go to `.env` file.

## How it works? 📝
<details>
<summary>查看装饰器相关信息</summary>

### 在 koa 中使用装饰器

我们知道，可以使用 `koa-router` 来描述一个路由：

```ts
router.get('/', (ctx) => {})
```

而装饰器要做的事情，其实就是将 `@GET` 以及其函数，转换为上文的写法

核心的代码其实就是：
```ts
// 从元数据中获取 path、method、handler
const path: string = Reflect.getMetadata('path', target.prototype, key)
const method: Methods = Reflect.getMetadata('method', target.prototype, key)
const handler: any = target.prototype[key]
const middlewares: any[] = Reflect.getMetadata('middlewares', target.prototype, key) || []
if (path && method) {
  const prefixCoverPath = prefix === '/' ? path : `${prefix}${path}`
  // 转换为这个 router['GET']('xxxxxx') 的写法
  if (middlewares.length)
    router[method](prefixCoverPath, ...middlewares, handler)
  else
    router[method](prefixCoverPath, handler)

}
```

### 注意

核心的逻辑就是通过获取 class 中的所有的方法，然后遍历，通过装饰器挂载到 `koa-router` 中
不过由于用到了 `class.prototype` 获取所有的实例方法，所以，如果 class 中的方法是静态方法，那么就会收取不到，而且只能在 `tsconfig.compilerOptions.target = 'es5'` 的时候才能用，因为 es5 实现 class 是直接将实例属性和方法挂载到了 object 上面
</details>

## References 🔗

- [koa-utils](https://github.com/TTiip/koa-utils)
