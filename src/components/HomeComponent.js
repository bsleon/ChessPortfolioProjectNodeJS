import React, { Component } from "react";
import Board from "./BoardComponent";

class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<div className="container">
					<div className="row">
						<Board pgn={this.props.pgn}/>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
