
let ioInstance; // Variable to store the io instance

const initializeSocket = (server) => {
  const io = require('socket.io')(server,{
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
  });
  

  io.on('connection', (socket) => {
    console.log('New client connected',io.sockets.length);
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
  ioInstance = io;
};

const getIOInstance = () => {
  if (!ioInstance) {
    throw new Error('IO instance not initialized. Call initializeSocket(server) first.');
  }
  return ioInstance;
};

module.exports = {
  initializeSocket,
  getIOInstance,
};
