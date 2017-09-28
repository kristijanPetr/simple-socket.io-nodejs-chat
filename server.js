const express = require("express");
const socket = require("socket.io");

const PORT = 3000;

//App
const app = express();
const server = app.listen(PORT, () => {
  console.log("listening on port 3000");
});

//Static files
app.use(express.static("public"));

//Socket setup
const io = socket(server);

io.on("connection", socket => {
  console.log("Made socket connection", socket.id);

  socket.on("chat", function(data) {
    console.log("New message", data);
    io.sockets.emit("chat", data);
  });

  socket.on("typing", username => {
    socket.broadcast.emit("typing", username);
    // console.log("User", username, "is typing...");
  });
});
