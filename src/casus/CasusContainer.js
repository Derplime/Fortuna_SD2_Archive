//@flow strict

import * as React from 'react';
import { Link } from 'react-router-dom';
import './CasusContainer.css';
import BlockBank from './blockBank/BlockBank.js';
import CasusEditor from './CasusEditor.js';
import CasusBlock from './blocks/CasusBlock.js';
import Navbar from '../globalComponents/Navbar.js';

type Props = {||};

type State = {
	draggedBlocks: ?Array<CasusBlock>
};

class CasusContainer extends React.Component<Props, State> {

	constructor(props: Props) {
		super(props);
		this.state = {
			draggedBlocks: null
		};
	}

	render(): React.Node {
		return (
			<div className="casusContainerDiv">
				<Navbar
					linkName='Armory'
					returnName='Back to Armory'
					pageName='Casus'
				/>
				<BlockBank 
					draggedBlocks={this.state.draggedBlocks}
					onBlocksDragged={this.onBlocksDragged} 
					onDraggedBlocksReleased={this.onDraggedBlocksReleased}
				/>
				<CasusEditor 
					draggedBlocks={this.state.draggedBlocks}
					onBlocksDragged={this.onBlocksDragged} 
					onDraggedBlocksReleased={this.onDraggedBlocksReleased}
				/>
				<div className='casusNav'>
					<Link to='TrainingArena'>
						<button className='primarybtn'>Test Code</button>
					</Link>
				</div>
			</div>
		);
	}

	onBlocksDragged = (draggedBlocks: Array<CasusBlock>): void  => {
		this.setState({
			draggedBlocks: draggedBlocks
		});
	}

	onDraggedBlocksReleased = (): void => {
		this.setState({
			draggedBlocks: null
		});
	}
}

export default CasusContainer;
