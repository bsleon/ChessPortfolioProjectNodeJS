import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";

class Signup extends Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			confirmPassword: "",
			redirectTo: null,
		};
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		console.log("sign-up handleSubmit, username: ");
		console.log(this.state.username);
		event.preventDefault();

		//request to server to add a new username/password
		axios
			.post("/users/sign-up", {
				username: this.state.username,
				password: this.state.password,
			})
			.then((response) => {
				console.log(response.data);
				if (!response.data.error) {
					console.log("successful signup");
					this.setState({
						//redirect to login page
						redirectTo: "/users/login",
					});
				} else {
					console.log("username already taken");
				}
			})
			.catch((error) => {
				console.log("signup error: ");
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
										onClick={this.handleSubmit}
									>
										Sign Up
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

export default Signup;
