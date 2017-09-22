const Koa = require('../');
const Spacecraft = require('spacecraft');

let spacecraft = new Spacecraft();
spacecraft.mount(new Koa());
spacecraft.koa.use(async ctx => {
  ctx.body = 'Hello World';
});

spacecraft.run();
