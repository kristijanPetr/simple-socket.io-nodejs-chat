//Make Connection
const socket = io.connect("http://192.168.0.172:4000");

//QUERY Dom
const button = document.getElementById("send"),
  username = document.getElementById("username"),
  message = document.getElementById("message"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback");

button.addEventListener("click", function() {
  socket.emit("chat", {
    message: message.value,
    username: username.value
  });
});

message.addEventListener("keypress", function() {
  console.log("typing message");
  socket.emit("typing", username.value);
});

//Listen for events

socket.on("chat", function(data) {
  console.log("new message received", data);
  output.innerHTML +=
    "<p><strong>" + data.username + ": </strong>" + data.message + "</p>";
  feedback.innerHTML = "";
});

socket.on("typing", username => {
  feedback.innerHTML =
    "<p><em>" + username + " is typing a message...</em></p>";
});
