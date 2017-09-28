//Make Connection
const socket = io.connect("http://62.69.69.165:3000");
// const socket = io.connect("http://192.168.0.172:3000");

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
  message.value = "";
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
  scrollSmoothToBottom("chat-window");
  feedback.innerHTML = "";
});

socket.on("typing", username => {
  feedback.innerHTML =
    "<p><em>" + username + " is typing a message...</em></p>";
});

function scrollSmoothToBottom(id) {
  var div = document.getElementById(id);
  $("#" + id).animate(
    {
      scrollTop: div.scrollHeight - div.clientHeight
    },
    100
  );
}

function search(ele) {
  if (event.keyCode == 13) {
    //alert(ele.value);
    // console.log("ele", ele);
    socket.emit("chat", {
      message: message.value,
      username: username.value
    });
    message.value = "";
  }
}
