import type { Context } from "koa";
import { firstValueFrom, toArray } from "rxjs";
import { CONTROLLER, GET } from "../decorator";
import { getResponseData } from "../model";

import ChinaClient from "../services/chinaClient";

@CONTROLLER("/kline")
export class KLineController {
  @GET("/sina")
  async sina(ctx: Context) {
    const { symbol, interval, limit } = ctx.query;

    const res = await firstValueFrom(
      ChinaClient.fetchSinaKLine(
        symbol as string,
        interval as string,
        limit as string
      ).pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }

  @GET("/sh")
  async sh(ctx: Context) {
    const { symbol } = ctx.query;

    const res = await firstValueFrom(
      ChinaClient.fetchSHDaykLine(
        symbol as string,
      ).pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }

  @GET("/sz")
  async sz(ctx: Context) {
    const { symbol } = ctx.query;

    const res = await firstValueFrom(
      ChinaClient.fetchSZDaykLine(symbol as string).pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }
}
