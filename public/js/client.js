// client side javaScript

const socket = io();
// { transports: ['websocket'] }
const form = document.querySelector(".msger-inputarea");
const messageInput = document.getElementById("msger-input");
const messageContainer = document.querySelector(".msger-chat");
const themeToggler = document.querySelector(".theme-toggler");

var receiveMsg = new Audio("/sound/receive.wav");
var joinLeft = new Audio("/sound/left-join.wav");

const msgBox = (message, position, num, name) => {
  // num = 0 -> left or join
  // num = 1 -> message send or recieve

  // to show current time
  const today = new Date();
  const time = today.getHours() + ":" + today.getMinutes();

  const messageElement = document.createElement("div");
  messageElement.classList.add(position);
  messageElement.classList.add("msg");
  //this div is child of main chat container
  messageContainer.append(messageElement);

  const messageBubble = document.createElement("div");
  messageBubble.classList.add("msg-bubble");
  //this div is child of message element
  messageElement.append(messageBubble);

  if (num === "1") {
    // when messages has to be diplayed

    const messageInfo = document.createElement("div");
    messageInfo.classList.add("msg-info");

    const msgName = document.createElement("p");
    msgName.classList.add("msg-info-name");

    const msgTime = document.createElement("p");
    msgTime.classList.add("msg-info-time");

    // adding name and time element to the info div
    messageInfo.append(msgName, msgTime);
    messageBubble.append(messageInfo);

    // to update the name of user
    msgName.innerText = name;

    // to update time
    msgTime.innerText = time;
  }

  // to create a p element
  const messageText = document.createElement("p");
  messageText.classList.add("msg-text");
  messageText.innerText = message;

  //p is the child of message Bubble
  messageBubble.append(messageText);

  //to play sounds
  if (position == "left-msg" && num == "1") {
    receiveMsg.play();
  } else if(position == "left-msg" && num == "0") {
    joinLeft.play();
  }

  // fun to scroll the message window automatically
  scrollWin();
};

// When a person submit the message
form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents page reloading

  const message1 = messageInput.value;

  //to show the message in sender's box
  msgBox(`${message1}`, "right-msg", "1", "You");

  // to send other users message
  socket.emit("sendMsg", message1);

  // empty the input box
  messageInput.value = "";
});

// fun when someone joins a chat
function userJoin() {
  let userName;

  do {
    //create a prompt
    userName = prompt("Enter your name to join");
  } while (!userName);

  //to show on the joined user screen
  msgBox("You joined the chat", "right-msg", "0", "");
  //to broadcast info to other users
  socket.emit("new-user-joined", userName);
}

userJoin();

// When new user joins the chat call append fun
socket.on("user-joined", (userName) => {
  msgBox(`${userName} joined the chat`, "left-msg", "0", "");
});

// when message recieved show it to others
socket.on("receive", (data) => {
  msgBox(`${data.message}`, "left-msg", "1", `${data.name}`);
});

// to show the total no. of live users
socket.on("count", (num) => {
  const totalUsers = document.querySelector(".count");
  totalUsers.innerHTML = num;
});

//when someone disconnects update others
socket.on("left", (data) => {
  msgBox(`${data} left the chat`, "left-msg", "0", "");
});

//funtion to scroll the chat screen
function scrollWin() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight);
}

// Dark Theme toggle
themeToggler.addEventListener("click", function(){
  document.body.classList.toggle("dark-theme-variables");
  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});