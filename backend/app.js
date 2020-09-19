let express = require("express");
let socket = require("socket.io");

let app = express();

const server = app.listen(8080, function () {
	console.log("server is running on port 8080");
});

const io = socket(server);

io.on("connection", (socket) => {
	console.log(socket.id);

	socket.on("SEND_MESSAGE", function (data) {
		io.emit("RECEIVE_MESSAGE", data);
	});
});
