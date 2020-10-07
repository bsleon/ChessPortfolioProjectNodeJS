const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose.promise = Promise;

// Define userSchema
const gameSchema = new Schema({
	// _id: { type: Schema.Types.ObjectId, ref: "User" },
	pgn: {
		type: String,
		// default: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
		default:
			"r2q2k1/pbpnprb1/3p1nNp/5P1P/1p1P1Bp1/3B4/PPP3P1/R2Q1RK1 b - - 0 1",
		unique: false,
		required: false,
	},
	player: { type: Schema.Types.ObjectId, ref: "User" },
	// player: { type: String },
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
