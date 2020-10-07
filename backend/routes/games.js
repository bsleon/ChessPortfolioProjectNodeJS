const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Game = require("../database/models/game");
// const passport = require("../passport");

// router.get("/", (req, res, next) => {
// 	console.log("Games: ");
// 	console.log(req.body);
// 	res.send(req.body.user);
// 	next();
// });

router.post("/", (req, res, next) => {
	console.log("req body is: ");
	console.log(req.body);
	// const id = new mongoose.Types.ObjectId();
	// console.log("NEW ID GEN IS: " + id);
	// console.log("New object id is: ")
	// console.log(req.body.user)

	// Game.findOne({ _id: id }, (err, game) => {
	// 	if (err) {
	// 		console.log("Game.js post error: ", err);
	// 	} else if (game) {
	// 		res.json({
	// 			error: `Sorry, already a game with the id: ${id}`,
	// 		});
	// 	} else {
	// 		console.log("ADDING GAME");
	// 		const newGame = new Game({
	// 			_id: id,
	// 			pgn: req.body.pgn,
	// 			player: new mongoose.Types.ObjectId(),
	// 		});
	// 		newGame.save((err, savedGame) => {
	// 			if (err) return res.json(err);
	// 			res.json(savedGame);
	// 		});
	// 	}
	// });

	// const newGame = new Game({
	// 	pgn: req.body.pgn,
	// 	player: new mongoose.Types.ObjectId(),
	// });

	// Game.create(newGame)
	// 	.then((dbModel) => res.json(dbModel))
	//     .catch((err) => res.status(422).json(err));

	// axios.get("/users/user").then((response) => {
	//     console.log("Get user response: ");
	//     console.log(response.data);
	// })

	const newGame = new Game({
		pgn: req.body.pgn,
		player: req.body.player,
		// player: new mongoose.Types.ObjectId(),
		// player: "2342536gasfasf",
	});
	newGame.save((err, savedGame) => {
		if (err) return res.json(err);
		res.json(savedGame);
	});
});

router.get("/:gameId", (req, res, next) => {
	// console.log("USer is: " + req.user);
	// res.send(req.body.username);
	// next();
	console.log("gameId is: ");
	console.log(req.params);
	// res.send("id is: " + req.params);

	res.send("gameId is: " + req.params.gameId);

	// Game.findOne({ _id: req.params.gameId })
	// 	.populate("player")
	// 	.then((game) => res.json(game))
	// 	.catch((err) => res.status(422).json(err));
});

router.put("/:gameId", (req, res, next) => {
	Game.findOneAndUpdate(
		{ _id: req.params.gameId },
		{ pgn: req.body.pgn },
		{ new: true }
	)
		.then((game) => res.json(game))
		.catch((err) => res.status(422).json(err));
});

// router.post("/:gameId", (req, res, next) => {
//gameId: {
// 		type: "String",
// 		unique: true,
// 		required: false,
// 	},
// 	fen: {
// 		type: "String",
// 		unique: false,
// 		required: false,
// 	},
// const { username, password, game } = req.body;

// const gameObj = {
// 	pgn: "fenStuffshere kQRNB#$2342342",
// };
// const filter = { username: req.body.username };
// const update = { $push: { games: [gameObj] } };

// User.findOneAndUpdate(filter, update, { new: true }, (error, doc) => {
// 	res.send(doc);
// });
// res.send(req.body.username);
// });

module.exports = router;
