const Koa = require('koa');
const beerRoutes = require('./routes/beer.routes');
const PORT = process.env.PORT || 8081;
const app = new Koa();

app.use(beerRoutes.routes());

const server = app.listen(PORT).on('error',err=>{
    console.error(err);
})

module.exports = server;