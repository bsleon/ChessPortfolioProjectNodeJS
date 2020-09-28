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

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedIn: false,
			username: null,
		};
	}

	componentDidMount() {
		this.getUser();
	}

	updateUser = (loggedIn, username) => {
		this.setState({ loggedIn: loggedIn, username: username });
	}

	getUser = () => {
		axios.get("/users/").then((response) => {
			console.log("Get user response: ");
			console.log(response.data);
			if (response.data.user) {
				console.log(
					"Get User: There is a user saved in the server session: "
				);
				this.setState({
					loggedIn: true,
					username: response.data.user.username,
				});
			} else {
				console.log("Get user: no user");
				this.setState({
					loggedIn: false,
					username: null,
				});
			}
		});
	}

	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Header
						username={this.state.username}
						updateUser={this.updateUser}
					/>
					<Switch>
						{/* <Route exact path="/home" component={Home} /> */}
						{/* <Route exact path="/games/:gameid" component={Home} /> */}
						<Route exact path="/home" component={Home} />
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
								/>
							)}
						/>
						<Route exact path="/users/sign-up" component={SignUp} />
						<Redirect to="/home" />
					</Switch>
					<Footer />
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
