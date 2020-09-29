import React, { Component } from "react";
import {
	Navbar,
	NavbarBrand,
	Nav,
	NavbarToggler,
	Collapse,
	NavItem,
} from "reactstrap";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";

class Header extends Component {
	constructor() {
		super();
		this.state = {
			isNavOpen: false,
		};

		this.toggleNav = this.toggleNav.bind(this);

	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen,
		});
	}

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
												style={{ cursor: "pointer"}}
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
							</Collapse>
						</div>
					</Navbar>
				</React.Fragment>
			);
		}
	}
}

export default Header;
