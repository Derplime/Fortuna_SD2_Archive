//@flow strict
import * as React from 'react';
import OptionClass from '../armory/OptionClass.js';
import {getAllUsersTanks} from '../globalComponents/tankAPIIntegration.js';
import {getUser} from '../globalComponents/userAPIIntegration.js';
import {makeASale} from './marketPlaceAPIConnections.js';

type Props = {||}; 
type State = {|
	userId: string,
	salePrice: number,
	tankBeingSoldId: string,
	tanksToSell: Array<OptionClass>,
|};
class MakeAComponentSaleView extends React.Component<Props, State> {

	constructor() {
		super();
		this.state={
			userId: '',
			salePrice: 0,
			tankBeingSoldId: '',
			itemAmount: 0,
			tanksToSell: [],
		}
		this.getUserID();
	}

	//this gets the user id
	getUserID() : void {
		const responsePromise = getUser();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfUser = data;
					//set the users id
					this.setState({userId:jsonObjectOfUser._id});
					//gets the tanks that the user has currently to sell
					this.getAllUsersTanksForSell();
				}
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
			}
		);
	};

	//This gets all of the users tanks and then adds them to the dropdown
	getAllUsersTanksForSell() : void {
		console.log("gete");
		const responsePromise = getAllUsersTanks();
		responsePromise.then(
			response => response.json().then(data => {
				if (response.status !== 200) {
					console.log(response.status);
					console.log(data.msg);
					console.log(data);
					return data;
				}
				else {
					const jsonObjectOfTanks = data;
					const tankOptions = [new OptionClass('', '')];
					//for every tank we will make a select option
					for (const tank in jsonObjectOfTanks) {
						tankOptions.push(new OptionClass(jsonObjectOfTanks[tank]._id, jsonObjectOfTanks[tank].tankName));
					}
					this.setState({tanksToSell : tankOptions});
				}
			})
		).catch(
			error => {
				console.log('Couldnt connect to server!');
				console.log(error);
				return error;
			}
		);
	};

	//This will make a sale for a tank
	makeASaleOfATank = ():void => {
		const responsePromise = makeASale(this.state.userId, this.state.salePrice, this.state.tankBeingSoldId, 'tank', 1);
		responsePromise.then(
			response => response.json().then(data => {
				console.log(data);
				//lets get the new tanks that we have since we lost the current one
				this.getAllUsersTanksForSell();
				//set the new selling price to zero 
				this.setState({salePrice: 0});
				}
			)
		);
	};

	handleChangeInSaleItem = ({ target }:{target:HTMLInputElement }) => {this.setState({tankBeingSoldId: target.value});}
	handleChangeInSalePrice = ({ target }:{target:HTMLInputElement }) => {this.setState({salePrice: parseInt(target.value)});}
	
	render(): React.Node  { 
		return (
			<div id="Parent">
				<label>Select a tank to Sell</label>
				<select className="tankForSell" onChange={this.handleChangeInSaleItem}>{this.state.tanksToSell.map(({ value, label }, index) => <option key={index}  value={value}>{label}</option>)}</select>
				<label>Selling Price</label>
				<input type="number" value={this.state.salePrice} className="form-control" onChange={this.handleChangeInSalePrice}></input>
				<button className="btn btn-success mt-2" onClick={this.makeASaleOfATank}>Sell</button>
			</div>
		);
	}
}

export default MakeAComponentSaleView;