import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import { Switch, Redirect, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/HomeComponent";
import PlayComputer from "./components/PlayComputerComponent";
import Contact from "./components/ContactMeComponent";
import Login from "./components/LoginComponent";
import SignUp from "./components/SignUpComponent";
import StartGame from "./components/StartGameComponent";

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			username: null,
			userId: null,
			pgn: null,
		};
	}

	componentDidMount() {
		this.getUser();
	}

	// componentDidUpdate() {
	// 	this.getUser();
	// }

	updateUser = (loggedIn, username, userId, pgn) => {
		this.setState({
			loggedIn: loggedIn,
			username: username,
			userId: userId,
			pgn: pgn,
		});
	};

	getUser = () => {
		axios.get("/users/user").then((response) => {
			console.log("Get user response: ");
			console.log(response.data);
			if (response.data.user) {
				console.log(
					"Get User: There is a user saved in the server session: "
				);
				this.setState({
					loggedIn: true,
					username: response.data.user.username,
					userId: response.data.user._id,
				});
			} else {
				console.log("Get user: no user");
				this.setState({
					loggedIn: false,
					username: null,
					userId: null,
				});
			}
		});
	};

	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Header
						username={this.state.username}
						updateUser={this.updateUser}
					/>
					{this.state.loggedIn ? (
						<Switch>
							{/* <Route exact path="/home" component={Home} /> */}
							{/* <Route exact path="/games/:gameid" component={Home} /> */}

							<Route exact path="/games/:gameId"
								render={() => (
									<Home pgn={this.state.pgn}/>
								)}
							// component={Home} 
							/>

							<Route
								exact
								path="/playcomputer"
								component={PlayComputer}
							/>
							<Route exact path="/contact" component={Contact} />
							<Route
								exact
								path="/users/login"
								render={() => (
									<Login
										updateUser={this.updateUser}
										loggedIn={this.state.loggedIn}
										username={this.state.username}
										userId={this.state.userId}
									/>
								)}
							/>
							<Route
								exact
								path="/users/sign-up"
								component={SignUp}
							/>
							<Route
								exact
								path="/startgame"
								render={() => (
									<StartGame userId={this.state.userId} />
								)}
							/>
							{/* <Redirect to="/home" /> */}
						</Switch>
					) : (
						<Switch>
							<Route exact path="/" />
							<Route exact path="/contact" component={Contact} />
							<Route
								exact
								path="/users/login"
								render={() => (
									<Login
										updateUser={this.updateUser}
										loggedIn={this.state.loggedIn}
									/>
								)}
							/>
							<Route
								exact
								path="/users/sign-up"
								component={SignUp}
							/>
						</Switch>
					)}
					<Footer />
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
