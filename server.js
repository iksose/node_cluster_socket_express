// var RedisStore, app, client, cluster, http, i, io, numCPUs, pub, redis, server, sub;

var RedisStore = require("socket.io/lib/stores/redis"),
    cluster = require("cluster"),
    http = require("http"),
    numCPUs = require("os").cpus().length,
    RedisStore = require("socket.io/lib/stores/redis"),
    redis = require("socket.io/node_modules/redis"),
    api = require('./routes/api'),
    views = require('./routes/views'),
    pub = redis.createClient(),
    sub = redis.createClient(),
    client = redis.createClient();

if (cluster.isMaster) {
  i = 0;
  while (i < numCPUs) {
    cluster.fork();
    i++;
  }
  cluster.on('fork', function(worker) {
    return console.log('forked worker ' + worker.process.pid);
  });
  cluster.on("listening", function(worker, address) {
    return console.log("worker " + worker.process.pid + " is now connected to " + address.address + ":" + address.port);
  });
  cluster.on("exit", function(worker, code, signal) {
    cluster.fork();
    return console.log("worker " + worker.process.pid + " died");
  });
} else {
  app = require("express")();
  app.set('views', __dirname + '/client');
  app.engine('html', require('ejs').renderFile);
  server = require("http").createServer(app);
  io = require("socket.io").listen(server);
  io.set("store", new RedisStore({
    redisPub: pub,
    redisSub: sub,
    redisClient: client
  }));
  server.listen(8000);
  // app.get("/", function(req, res) {
  //   return res.sendfile(__dirname + '/index.html');
  // });

  app.get('/', views.index);

  // io.sockets.on("connection", function(socket) {
  //   console.log('socket call handled by worker with pid ' + process.pid);
  //   return setInterval(function () {
  //   socket.emit('news', {
  //     time: (new Date()).toString()
  //   });
  // }, 1000);
  // });

  io.sockets.on('connection', require('./routes/socket'));
}
