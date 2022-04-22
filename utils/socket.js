import {Server} from 'socket.io';

const socket = (server, port) => {
  const io = new Server(server, {
    cors: {
      methods: ["GET", "POST", 'OPTIONS'],
      allowedHeaders: ["react-header"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('disconnect', () => {
      console.log('a user disconnected', socket.id);
    });
  });

  server.listen(port, () => console.log("Server listening port", port))
};

export default socket;