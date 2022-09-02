import axios from "axios";
import { concatMap, defer, delay, filter, from, map, retry } from "rxjs";
import { ShanghaiStockClient, ShenZhenStockClient } from "rxjs-china-stock";

class ChinaClient {
  private shanghaiStockClient: ShanghaiStockClient = new ShanghaiStockClient();
  private shenZhenStockClient: ShenZhenStockClient = new ShenZhenStockClient();

  constructor() {
    this.test();
  }

  test() {
    // this.fetchDaykLine('600000').subscribe((x) => console.log(x, '股票数据'));
    // this.fetchSHEquityData().subscribe((x) => console.log(x, '股票数据'));
    // this.fetchFwrData().subscribe((x) => console.log(x, '基金数据'));
    // this.fetchBondData().subscribe((x) => console.log(x, '债券数据'));
    // this.fetchIndexData().subscribe((x) => console.log(x, '指数数据'));
    // this.fetchSZDaykLine('123002').subscribe((x) => console.log(x, '股票数据'));
    // this.fetchSZEquityData().subscribe((x) => console.log(x, '股票 list 数据'));
    // this.fetchSZConvertibleBondData().subscribe((x) =>
    //   console.log(x, '可转债 list 数据'),
    // );
    // this.fetchSZFwrData().subscribe((x) => console.log(x, '基金 list 数据'));
  }

  /**
   * 获取深圳交易所 股票 日k线
   */
  fetchSZDaykLine(code: string) {
    return this.shenZhenStockClient.fetchDaykData(code).pipe(
      delay(750),
      concatMap((items: any[][]) =>
        from(items).pipe(
          map(([date, open, close, low, high, _1, _2, volume]) => ({
            id: new Date(date).getTime(),
            open,
            close,
            high,
            low,
            volume,
          }))
        )
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取深圳交易所 股票 list 数据
   */
  fetchSZEquityData() {
    return this.shenZhenStockClient.fetchEquityData().pipe(
      delay(750),
      concatMap((lists) =>
        from(lists).pipe(
          map((x: any) => ({ code: x["A股代码"], name: x["A股简称"] }))
        )
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取深圳交易所 可转债 list 数据
   */
  fetchSZConvertibleBondData() {
    return this.shenZhenStockClient.fetchConvertibleBondData().pipe(
      delay(750),
      concatMap((lists) =>
        from(lists).pipe(
          map((x: any) => ({ code: x["证券代码"], name: x["证券简称"] }))
        )
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取深圳交易所 基金 list 数据
   */
  fetchSZFwrData() {
    return this.shenZhenStockClient.fetchFwrData().pipe(
      delay(750),
      concatMap((lists) =>
        from(lists).pipe(
          map((x: any) => ({
            code: x["基金代码"],
            name: x["基金简称"],
            type: x["基金类别"],
            investmentType: x["投资类别"],
            listingDate: x["上市日期"],
            currentScale: x["当前规模"],
            fundManager: x["基金管理人"],
          }))
        )
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取上海交易所 股票 日k线
   */
  fetchSHDaykLine(code: string, begin: number = -50, end: number = -1) {
    return this.shanghaiStockClient.fetchDaykData(code, begin, end).pipe(
      delay(750),
      concatMap((x) =>
        from(x.kline as number[][]).pipe(
          map(([date, open, high, low, close, volume]) => ({
            id: new Date(
              `${date.toString().slice(0, 4)}-${date
                .toString()
                .slice(4, 6)}-${date.toString().slice(-2)}`
            ).getTime(),
            open,
            close,
            high,
            low,
            volume,
          }))
        )
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取上海交易所 股票 list 数据
   */
  fetchSHEquityData(begin: number = 0, end: number = 9999999) {
    return this.shanghaiStockClient.fetchEquityData(begin, end).pipe(
      delay(750),
      concatMap((x) =>
        from(x.list as string[][]).pipe(map(([code, name]) => ({ code, name })))
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取上海交易所 基金 list 数据
   */
  fetchFwrData(begin: number = 0, end: number = 9999999) {
    return this.shanghaiStockClient.fetchFwrData(begin, end).pipe(
      delay(750),
      concatMap((x) =>
        from(x.list as string[][]).pipe(map(([code, name]) => ({ code, name })))
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取上海交易所 债券 list 数据
   */
  fetchBondData(begin: number = 0, end: number = 9999999) {
    return this.shanghaiStockClient.fetchBondData(begin, end).pipe(
      delay(750),
      concatMap((x) =>
        from(x.list as string[][]).pipe(map(([code, name]) => ({ code, name })))
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取上海交易所 指数 list 数据
   */
  fetchIndexData(begin: number = 0, end: number = 9999999) {
    return this.shanghaiStockClient.fetchIndexData(begin, end).pipe(
      delay(750),
      concatMap((x) =>
        from(x.list as string[][]).pipe(map(([code, name]) => ({ code, name })))
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取新浪股票接口数据
   * @param symbol 品种名称
   * @param interval 时间间隔
   * @param limit 条数
   * @returns
   */
  fetchSinaKLine(symbol: string, interval: string, limit: string) {
    return defer(() =>
      axios
        .get(
          `https://money.finance.sina.com.cn/quotes_service/api/json_v2.php/CN_MarketData.getKLineData?symbol=${symbol}&scale=${interval}&ma=240&datalen=${limit}`
        )
        .then((x) => x.data)
    ).pipe(
      delay(750),
      concatMap((items: any[]) =>
        from(items).pipe(
          map(({ day, ...rest }) => ({
            id: new Date(day).getTime(),
            ...rest,
          }))
        )
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }

  /**
   * 获取东方财富股票接口数据
   * @param symbol 品种名称
   * @param interval 时间间隔
   * @param limit 条数
   * @returns
   */
  fetchEastKLine(
    symbol: string,
    interval: string,
    begin: string,
    end: string = "20500101"
  ) {
    return defer(() =>
      axios
        .get(
          `https://push2his.eastmoney.com/api/qt/stock/kline/get?fields1=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12,f13&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&beg=${begin}&end=${end}&ut=fa5fd1943c7b386f172d6893dbfba10b&rtntype=6&secid=${symbol}&klt=${interval}&fqt=`
        )
        .then((x) => x.data)
    ).pipe(
      delay(750),
      filter((x) => !!x.data),
      concatMap((x) =>
        from(x.data.klines as string[]).pipe(
          map((x) => x.split(",")),
          map(([id, open, close, high, low, volume]) => ({
            id: new Date(id).getTime() - 1000 * 60 * 60 * 8,
            open: +open,
            close: +close,
            high: +high,
            low: +low,
            volume: +volume,
          }))
        )
      ),
      retry({
        count: 3,
        delay: 5 * 1000,
      })
    );
  }
}

export default new ChinaClient();
