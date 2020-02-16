//@flow strict
import * as React from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';


// Login component.
type Props = {||}; 
type State = {|
	response: string,
	userName: string,
	password: string,
	responseToPost: string,
	loggedIn: Boolean,
|};



// Login Popup component.
class LoginPopup extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			response: '',
			userName: '',
			password: '',
			responseToPost: '',
			loggedIn: false
		}
	}

	handleLoginClick = async ():Promise<void> => {
		const response = await fetch('/api/user/login', {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Credentials': 'true'
			},
			body: JSON.stringify({ userName: this.state.userName, password:this.state.password }),
		});
		const body = await response.text();
		this.state.loggedIn = true;
		
	};

	render(): React.Node {
		let loginButton = (<button type="submit" className="popupbtn" onClick={this.handleLoginClick}>Login</button>)
		if (this.state.loggedIn == true)
		{
			loginButton = (<Link to="MainMenu"><button type="submit" className="popupbtn" onClick={this.handleLoginClick}>Login</button></Link>)
		}
		return (
			<Popup trigger={<button type="button" className="btn">Login</button>} modal>
				{close => (
					<div className="popup">
						<h1>Login</h1>
						<form data-toggle="validator" method="post" action="#">
							<div className="row col-md-12 form-group">
								<label>Username</label>
								<div className="input-group">
									<input type="text" className="inputText" name="loginUserName" value={this.state.userName} onChange={e => this.setState({ userName: e.target.value})} />
								</div>
							</div>
							<div className="row col-md-12 form-group">
								<label>Password</label>
								<div className="input-group">
									<input type="password" name="loginPassword" className="inputText" value={this.state.password} onChange={e => this.setState({ password: e.target.value})} />
								</div>
								<div className="help-block with-errors text-danger"></div>
							</div>
							<div className="row col-md-12">
								{loginButton}
								<button className="closebtn" onClick={() => { close(); }}>Cancel</button>
							</div>
						</form>
					</div>
				)}
			</Popup>
		);
	}
}

export default LoginPopup;
