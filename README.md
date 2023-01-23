# Real Time online Chat application using Socket.io and NodeJs
## OrangeChat App
* It is an scalable Realtime Chatting Application that provides an interface for multiple user chatting at the same time.
* Live Link : https://real-time-online-chat-app-orangechat-bvqr.onrender.com
* **FrontEnd Technologies**: - 
    - HTML
    - CSS 
    - Javascript
* **BackEnd Technologies**- 
    - JavaScript
    - Node.js
    - Express 
    - Socket.io
* Used Socket.io module for a two-way connection between client and server.
* Added Client sided JavaScript for the purpose of playing with DOM elements.
* Everytime a new user tries to join, first of all ask his/her name and let the server know.
* If a new user joins, receive the event from the server using eventListner.
* Receive message from server using receive function.
* If a user leaves the chat, tell all the other users that this user has left the chat.
* Server Side JavaScript handles the Socket IO connections.
* If a new user joins, let the other users connected with server know.
* If someone sends the message, broadcast it to other people.
* If someone leaves the chat, let others know.
* When a user joins, left of receives a message audio is played.
* Total number of active users is shown to each user.
* A toggler to switch to dark theme.

## Process to run the app
* run node index.js
* The above line of code will create a portal 3000.
* Go to browser write localhost:3000 to view your live site.

## Site images

![](https://github.com/sheetalMehta7/Real-time-online-chat-app-OrangeChat-/blob/main/public/images/first.jpg)
![](https://github.com/sheetalMehta7/Real-time-online-chat-app-OrangeChat-/blob/main/public/images/user1.jpg)
![](https://github.com/sheetalMehta7/Real-time-online-chat-app-OrangeChat-/blob/main/public/images/user2.jpg)
