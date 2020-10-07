const express = require("express");
const socket = require("socket.io");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");

const app = express();
const PORT = 8080;
// const cors = require("cors");

//Route requires
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");

// MIDDLEWARE
// app.use(cors());
app.use(morgan("dev"));
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

// Sessions
app.use(
	session({
		secret: "fraggle-rock",
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false,
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

//Routes
app.use("/users", usersRouter);
app.use("/games", gamesRouter);

//Socket.io
const server = app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`);
});

const io = socket(server);

io.on("connection", (socket) => {
	console.log(socket.id);

	socket.on("SEND_MESSAGE", function (data) {
		io.emit("RECEIVE_MESSAGE", data);
	});
});
