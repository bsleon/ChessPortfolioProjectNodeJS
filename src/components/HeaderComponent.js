import React, { Component } from "react";
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavbarToggler,
	Collapse,
	NavItem,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Input,
	Label,
} from "reactstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";

class Header extends Component {
	constructor() {
		super();
		this.state = {
			isNavOpen: false,
			// isModalOpen: false,
			// username: "",
			// password: "",
			// confirmPassword: "",
			// redirectTo: null,
			// loggedIn: false,
		};

		this.toggleNav = this.toggleNav.bind(this);
		// this.toggleModal = this.toggleModal.bind(this);
		// this.handleLogin = this.handleLogin.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
		});
	}

	// toggleModal() {
	// 	this.setState({
	// 		isModalOpen: !this.state.isModalOpen,
	// 	});
	// }

	// handleLogin(event) {
	// 	alert(
	// 		`Username: ${this.username.value} Password: ${this.password.value} Remember: ${this.remember.checked}`
	// 	);
	// 	this.toggleModal();
	// 	event.preventDefault();
	// }

	// updateUser(userObject) {
	// 	this.setState(userObject);
	// }

	// getUser() {
	// 	axios.get("/user").then((response) => {
	// 		console.log("Get user response: ");
	// 		console.log(response.data);
	// 		if (response.data.user) {
	// 			console.log(
	// 				"Get User: There is a user saved in the server session: "
	// 			);

	// 			this.setState({
	// 				loggedIn: true,
	// 				username: response.data.user.username,
	// 			});
	// 		} else {
	// 			console.log("Get user: no user");
	// 			this.setState({
	// 				loggedIn: false,
	// 				username: null,
	// 			});
	// 		}
	// 	});
	// }

	handleLogout = (event) => {
		event.preventDefault();
		console.log("handleLogout");

		axios
			.post("/users/logout", {
				username: this.state.username,
				password: this.state.password,
			})
			.then((response) => {
				console.log("logout response: ");
				console.log(response);
				if (response.status === 200) {
					// update App.js state
					this.props.updateUser(false, response.data.username);
					// update the state to redirect to home
					// this.setState({
					// 	redirectTo: "/home",
					// });
				}
			})
			.catch((error) => {
				console.log("logout error: ");
				console.log(error);
			});
	};

	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />;
		} else {
			return (
				<React.Fragment>
					<Navbar dark expand="md">
						<div className="container">
							<NavbarBrand className="mr-auto">
								<NavLink className="nav-link" to="/home">
									<i className="fas fa-chess fa-lg" />
									CHESSFEN
								</NavLink>
							</NavbarBrand>
							<NavbarToggler onClick={this.toggleNav} />
							<Collapse isOpen={this.state.isNavOpen} navbar>
								<Nav navbar>
									<NavItem>
										<NavLink
											className="nav-link"
											to="/home"
										>
											Board
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className="nav-link"
											to="/playcomputer"
										>
											Play Computer
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											className="nav-link"
											to="/contact"
										>
											Contact Me
										</NavLink>
									</NavItem>
								</Nav>
								<Nav navbar className="ml-auto">
									<NavItem>
										<NavLink
											className="nav-link"
											to="/users/login"
										>
											{this.props.username
												? this.props.username
												: "Login"}
										</NavLink>
									</NavItem>
									<NavItem>
										{this.props.username ? (
											<a
												onClick={this.handleLogout}
												className="nav-link"
												// to="/home"
											>
												Logout
											</a>
										) : (
											<NavLink
												className="nav-link"
												to="/users/sign-up"
											>
												Signup
											</NavLink>
										)}
									</NavItem>
								</Nav>
								{/* <span className="navbar-text ml-auto">
									<Button
										outline
										onClick={this.toggleModal}
										id="loginButton"
									>
										<i className="fa fa-sign-in-alt fa-lg" />{" "}
										Login
									</Button>
								</span>

								<span className="navbar-text ml-auto">
									<Button
										outline
										onClick={this.toggleModal}
										id="loginButton"
									>
										<i className="fa fa-sign-in-alt fa-lg" />{" "}
										Register
									</Button>
								</span> */}
							</Collapse>
						</div>
					</Navbar>

					{/* <Modal
						isOpen={this.state.isModalOpen}
						toggle={this.toggleModal}
					>
						<ModalHeader toggle={this.toggleModal}>
							Login
						</ModalHeader>
						<ModalBody>
							{" "}
							<Form onSubmit={this.handleLogin}>
								<FormGroup>
									<Label htmlFor="username">Username</Label>
									<Input
										type="text"
										id="username"
										name="username"
										onChange={(event) => {
											console.log("username Changed! ");
											console.log(event.target.value);
											this.setState({
												username: event.target.value,
											});
										}}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="password">Password</Label>
									<Input
										type="password"
										id="password"
										name="password"
										onChange={(event) => {
											console.log("password Changed! ");
											console.log(event.target.value);
											this.setState({
												password: event.target.value,
											});
										}}
									/>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input
											type="checkbox"
											name="remember"
											innerRef={(input) =>
												(this.remember = input)
											}
										/>
										Remember me
									</Label>
								</FormGroup>
								<Button
									type="submit"
									value="submit"
									color="primary"
									onClick={(event) => {
										event.preventDefault();
										axios
											.post("/users/login", {
												username: this.state.username,
												password: this.state.password,
											})
											.then((response) => {
												console.log("login response: ");
												console.log(response);
												if (response.status === 200) {
													// update App.js state
													this.updateUser({
														loggedIn: true,
														username:
															response.data
																.username,
													});
													// update the state to redirect to home
													this.setState({
														redirectTo: "/",
													});
												}
											})
											.catch((error) => {
												console.log("login error: ");
												console.log(error);
											});
										this.setState({
											username: "",
											password: "",
										});
									}}
								>
									Login
								</Button>
							</Form>
						</ModalBody>
					</Modal> */}

					{/* <Modal
						isOpen={this.state.isModalOpen}
						toggle={this.toggleModal}
					>
						<ModalHeader toggle={this.toggleModal}>
							Register
						</ModalHeader>
						<ModalBody>
							{" "}
							<Form onSubmit={this.handleLogin}>
								<FormGroup>
									<Label htmlFor="username">Username</Label>
									<Input
										type="text"
										id="username"
										name="username"
										// innerRef={(input) =>
										// 	(this.username = input)
										// }
										onChange={(event) => {
											console.log("username Changed! ");
											console.log(event.target.value);
											this.setState({
												username: event.target.value,
											});
										}}
									/>
								</FormGroup>
								<FormGroup>
									<Label htmlFor="password">Password</Label>
									<Input
										type="password"
										id="password"
										name="password"
										// innerRef={(input) => {
										// 	this.password = input;
										// }}
										onChange={(event) => {
											console.log("password Changed! ");
											console.log(event.target.value);
											this.setState({
												password: event.target.value,
											});
										}}
									/>
								</FormGroup>
								<Button
									type="submit"
									value="submit"
									color="primary"
									onClick={(event) => {
										console.log(
											"sign-up handleSubmit, username: "
										);
										console.log(this.state.username);
										event.preventDefault();
										axios
											.post("/users", {
												username: this.state.username,
												password: this.state.password,
											})
											.then((response) => {
												console.log(
													"register response: "
												);
												console.log(response);
												if (!response.data.errmsg) {
													console.log(
														"successful signup"
													);
													this.setState({
														//redirect to login page
														redirectTo: "/login",
													});
												} else {
													console.log(
														"username already taken"
													);
												}
											})
											.catch((error) => {
												console.log("signup error: ");
												console.log(error);
											});
										this.setState({
											username: "",
											password: "",
										});
									}}
								>
									Register
								</Button>
							</Form>
						</ModalBody>
					</Modal> */}
				</React.Fragment>
			);
		}
	}
}

export default Header;
