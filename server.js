const { config } = require('dotenv');
config();

const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const five = require("johnny-five");
let tmpInterval = null
let status = "aan"
let API = {
    blink: (state) => {
        if (state == "start") {
            tmpInterval = setInterval(() => {
                if (status == "aan") {
                    status = "uit"
                } else {
                    status = "aan"
                }
                console.log(status)
            }, 1000)
        } else {
            clearInterval(tmpInterval)
            console.log("klaar")
        }
    }
}

if (process.env.NODE_ENV === 'raspberry') {
    API = require('./raspberry-pi.js')
}



const httpServer = createServer();
const corsOrigin = process.env.CORS.split(",").map(url => {
    return `http://${url.trim()}`
})

const io = new Server(httpServer, {
  cors: {
    origin: [ "http://127.0.0.1:5173", "http://localhost"],
    methods: ["GET", "POST"]
  }
});

instrument(io, {
  auth: false,
  mode: process.env.NODE_ENV,
});

io.on("connection", (socket) => {
    console.log("Succesfull socket connection:",socket.id); // ojIckSD2jqNzOqIrAGzL
    socket.on("cycle", ( data) => {
        API.blink(data)
    });
});







console.log(`Server is running on port ${process.env.PORT}`)
httpServer.listen(process.env.PORT);