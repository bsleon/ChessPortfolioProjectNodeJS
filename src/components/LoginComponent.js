import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Login extends Component {
	constructor() {
		super();
		this.state = { username: "", password: "", redirectTo: null };
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleLogin = (event) => {
		event.preventDefault();
		console.log("handleLogin");

		axios
			.post("/users/login", {
				username: this.state.username,
				password: this.state.password,
				// games: ["123fdadf"],
			})
			.then((response) => {
				console.log("login response: ");
				console.log(response);
				if (response.status === 200) {
					// update App.js state
                    this.props.updateUser(true, response.data.username);
                    console.log(response.data)
					// update the state to redirect to home
					this.setState({
						redirectTo: "/startgame",
					});
				}
			})
			.catch((error) => {
				console.log("login error: ");
				console.log(error);
			});
	};

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />;
		} else {
			return (
				<React.Fragment>
					<div className="container">
						<div className="row row-content">
							<div className="col-6">
								<Form>
									<FormGroup>
										<Label htmlFor="username">
											Username
										</Label>
										<Input
											type="text"
											id="username"
											name="username"
											onChange={this.handleChange}
										/>
									</FormGroup>
									<FormGroup>
										<Label htmlFor="password">
											Password
										</Label>
										<Input
											type="password"
											id="password"
											name="password"
											onChange={this.handleChange}
										/>
									</FormGroup>
									<Button
										type="submit"
										value="submit"
										color="primary"
										onClick={this.handleLogin}
									>
										Login
									</Button>
								</Form>
							</div>
						</div>
					</div>
				</React.Fragment>
			);
		}
	}
}

export default Login;
