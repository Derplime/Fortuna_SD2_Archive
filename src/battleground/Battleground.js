//@flow strict

import * as React from 'react';
import './Battleground.css';
import getBattlegroundWidth from './getBattlegroundWidth.js';
import getBattlegroundHeight from './getBattlegroundHeight.js';
import {imageLoaderInit, getImage, addCallbackWhenImageLoaded} from './ImageLoader.js';
import ImageDrawer from './ImageDrawer.js';
import Tank from '../tanks/Tank.js';
import Wall from './Wall.js';
import Vec from '../casus/blocks/Vec.js';
import {getTestTank} from '../tanks/TankLoader.js';

class Battleground extends React.Component<{||}> {
	intervalID: number;
	alive: boolean;
	testTank: Tank;
	walls: Array<Wall>;

	constructor() {
		super();
		window.addEventListener('resize', () => this._rerender());
		imageLoaderInit();
		addCallbackWhenImageLoaded(()=>this._rerender());

		this.testTank = getTestTank();
		this.walls=[
			new Wall(new Vec(10, 0), Math.PI/2),
			new Wall(new Vec(60, 0), 0),
			new Wall(new Vec(-50, 30), Math.PI/5),
			new Wall(new Vec(-50, -30), -Math.PI/5)
		];
	}

	componentDidMount(): void {
		this._rerender();
		this.alive=true;
		setTimeout(() => this._gameLoop(), 1000/20);
	}

	render(): React.Node {
		return (
			<div>
				<canvas
					className="battlegroundCanvas"
					ref="canvas"
				/>
			</div>
		);
	}

	componentWillUnmount() {
		this.alive=false;
	}

	_gameLoop(): void {
		if (!this.alive) {
			//stop updating
			return;
		}
		this._update();
		this._rerender();
		setTimeout(() => this._gameLoop(), 1000/20);
	}

	_update(): void {
		this.testTank.executeCasusFrame();
		this.testTank.executePhysics();
	}

	_rerender(): void {
		this._resizeCanvas();
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		ctx.drawImage(getImage('DIRT_BACKGROUND'), 0, 0, getBattlegroundWidth(), getBattlegroundHeight());
		const drawer=new ImageDrawer(ctx);


		this.testTank.drawSelf(drawer);
		for (const wall: Wall of this.walls) {
			wall.drawSelf(drawer);
		}
	}

	_resizeCanvas() {
		const canvas: HTMLCanvasElement = this.refs.canvas;
		const targetWidth=canvas.clientWidth;
		const targetHeight=targetWidth*8/16;
		if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
			canvas.width = targetWidth;
			canvas.height = targetHeight;
		}
	}

}

export default Battleground;