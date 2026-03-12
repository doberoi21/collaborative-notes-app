const { Server } = require("socket.io");

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

console.log("WebSocket server running on port 3001");

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-document", (documentId) => {
    socket.join(documentId);
    console.log(`User joined document ${documentId}`);
  });

  socket.on("send-changes", ({ documentId, content }) => {
    socket.to(documentId).emit("receive-changes", content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});