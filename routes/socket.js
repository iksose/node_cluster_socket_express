/*
 * Serve content over a socket
 */

module.exports = function (socket) {

  console.log("New socket connection -- Jon")
  console.log('socket call handled by worker with pid ' + process.pid);

  socket.emit('send:name', {
    name: 'Bob'
  });

  setInterval(function () {
    socket.emit('news', {
      time: (new Date()).toString()
    });
  }, 1000);


  socket.once('disconnect', function(){
    console.log("Disconnect called")
    socket.disconnect();
  })

  socket.on('connectPlz', function(){
    socket.emit('message', {message: "okay dude"})
  })

  socket.on('disconnect', function() {
    console.log("On disconnect fired")
  })



};
