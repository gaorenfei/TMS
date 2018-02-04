var socket = io.connect("http://localhost");

socket.on("chat message", function(msg) {});
socket.on("connecting", function(msg) {
  console.log("正在连接.....");
});
socket.on("connect", function(msg) {
  console.log("连接到服务器");
});
socket.on("connect_failed", function(msg) {
  console.log("链接失败");
});
socket.on("reconnecting", function(msg) {
  console.log("正在重新链接......");
});
socket.on("reconnect", function(msg) {
  console.log("重新连接到服务器");
});
socket.on("disconnect", function(msg) {
  console.log("与服务器断开");
});
socket.on("error", function(msg) {
  console.log("错误发生,并且无法被其他事件类型所处理 ");
});
