const Component = require('spacecraft/component');
const Koa = require('koa');
const logger = require('spacecraft-logger')({
  format: "{{timestamp}} <koa> {{message}}",
  allLogsFileName: "koa",
});

class KoaComponent extends Component {
  constructor(port = 3000) {
    super();
    this.port = port;
  }

  onMount() {
    super.onMount();
    const koa = new Koa();
    this.app.koa = this.koa = koa;
    this.use = koa.use;

    this.defaultUse(koa);
  }

  onLoad() {
    this.koa.listen(this.port);
  }

  defaultUse(koa) {
    // x-response-time
    koa.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      ctx.set('X-Response-Time', `${ms}ms`);
    });

    // logger
    koa.use(async (ctx, next) => {
      const start = Date.now();
      await next();
      const ms = Date.now() - start;
      // console.log(`${ctx.method} ${ctx.url} - ${ms}`);
      logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
    })
  }
}

module.exports = KoaComponent;
