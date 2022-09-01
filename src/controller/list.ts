import type { Context } from "koa";
import { firstValueFrom, toArray } from "rxjs";
import { CONTROLLER, GET } from "../decorator";
import { getResponseData } from "../model";

import ChinaClient from "../services/chinaClient";

@CONTROLLER("/list")
export class ListController {
  @GET("/sh")
  async sh(ctx: Context) {
    const res = await firstValueFrom(
      ChinaClient.fetchSHEquityData().pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }

  @GET("/sh/jj")
  async shjj(ctx: Context) {
    const res = await firstValueFrom(
      ChinaClient.fetchFwrData().pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }

  @GET("/sh/zj")
  async shzj(ctx: Context) {
    const res = await firstValueFrom(
      ChinaClient.fetchBondData().pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }

  @GET("/sh/zs")
  async shzs(ctx: Context) {
    const res = await firstValueFrom(
      ChinaClient.fetchIndexData().pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }

  @GET("/sz")
  async sz(ctx: Context) {
    const res = await firstValueFrom(
      ChinaClient.fetchSZEquityData().pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }

  @GET("/sz/kzz")
  async szzz(ctx: Context) {
    const res = await firstValueFrom(
      ChinaClient.fetchSZConvertibleBondData().pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }

  @GET("/sz/jj")
  async szjj(ctx: Context) {
    const res = await firstValueFrom(
      ChinaClient.fetchSZFwrData().pipe(toArray())
    );

    ctx.body = getResponseData(res);
  }
}
