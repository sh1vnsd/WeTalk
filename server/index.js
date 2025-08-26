const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");
const { Server } = require("socket.io");

const app = express();

//configure .env package
require("dotenv").config();

//Middlewares
app.use(express.json()); //this will allow us to receive and send json data
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute);


const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;

const expressServer = app.listen(port, (req, res) => {
  console.log(`Server running on port...: ${port}`);
});

//connecting with database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));

const io = new Server(expressServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  }
})

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  //Listen to a connection 
  socket.on("addNewUser", (userId) => {
    if (!userId) return;
    !onlineUsers.some(user => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id
      })

    io.emit("getOnlineUsers", onlineUsers);
  });

  //add message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(user => user.userId === message.recipientId)

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date()
      });
    }
  })

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)

    io.emit("getOnlineUsers", onlineUsers);
  })
});

