const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.filter((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected");
  // take user id and socket id from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // when send and get message
  socket.on("sendMessage", ({ senderId, receieverId, text }) => {
    const user = getUser(receieverId);
    console.log(user);
    io.to(user[0].socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on("disconnect", () => {
    console.log("A User Disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
