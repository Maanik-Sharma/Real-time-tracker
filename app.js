const express = require("express");
const app = express();
const path = require("path");
const http = require("http"); // Setup for HTTP server
const socketio = require("socket.io"); 

const server = http.createServer(app);
const io = socketio(server); // Setup for socket.io

// Set EJS as the view engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
//Static Files Middleware: Changed app.set to app.use for serving static files
app.use(express.static(path.join(__dirname, "public")));

// Handle connection requests from socket.io
io.on("connection", function (socket) {
    //send location accept
    socket.on("send-location", function (data){
       //ab bando ko wapas bhejna h 
       io.emit("receive-location",   { id: socket.id, ...data});
    });
    // console.log("connected");
    //disconnect
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    });
});  

// Handle GET request for the root route
app.get("/", function(req, res){
    res.render("index");
});

// Start the server on port 3000
server.listen(3002, function() {
    console.log("Server is running on port 3002");
});
