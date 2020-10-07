import React, { Component } from "react";
import { Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

class StartGame extends Component {
	constructor() {
		super();
		this.state = {
			redirectTo: null,
			username: null,
			userId: null,
			pgn: null,
		};
	}

	componentDidMount() {
		this.getUser();
	}

	getUser = () => {
		axios.get("/users/user").then((response) => {
			console.log("Get user response: ");
			console.log(response.data);
			if (response.data.user) {
				console.log(
					"Get User: There is a user saved in the server session: "
				);
				this.setState({
					username: response.data.user.username,
					userId: response.data.user._id,
				});
			} else {
				console.log("Get user: no user");
				this.setState({
					username: null,
					userId: null,
				});
			}
		});
	};

	handleGameCreate = (event) => {
		event.preventDefault();
		// console.log("player is: ");
		// console.log(this.props.userId);
		// const newGame = {
		// 	player: this.props.userId,
		// };
		axios
			.post("/games", {
				player: this.state.userId,
			})
			.then((res) => {
				console.log("pgn is: " + res.data.pgn);
				// console.log(res.data);
				if (res.status === 200) {
					this.setState({
						redirectTo: "/games/" + res.data._id,
						pgn: res.data.pgn,
					});
				}
			})
			.catch((err) => console.log(err));
	};

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} pgn={this.state.pgn} />;
		} else {
			return (
				<React.Fragment>
					<div className="container">
						<div className="row row-content">
							<div className="col-6">
								<Button
									type="submit"
									value="submit"
									color="primary"
									onClick={this.handleGameCreate}
								>
									New Game
								</Button>
							</div>
						</div>
					</div>
				</React.Fragment>
			);
		}
	}
}

export default StartGame;
