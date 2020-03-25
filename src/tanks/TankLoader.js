//@flow strict

import Tank from './Tank.js';
import Vec from '../casus/blocks/Vec.js';
import Chassis from './Chassis.js';
import Gun from './Gun.js';
import Item from './Item.js';
import Treads from './Treads.js';
import CasusBlock from '../casus/blocks/CasusBlock.js';
import ContainerBlock from '../casus/blocks/ContainerBlock.js';
import Scanner from './Scanner.js';
import Jammer from './Jammer.js';
import TankPart from './TankPart.js';
import loadCasus from '../casus/loadCasus.js';
import { getComponentsOfType } from '../armory/GetInventoryInfo.js';
import BackendTank from './BackendTank.js';
import type { TankComponent } from '../armory/TankComponent.js';

function getTestTank(id: number=1): Tank {
	const position=id===1?new Vec(20, -20):new Vec(50, 40);
	const toReturn: Tank = new Tank(
		position,
		new Chassis(id===1?'moddableLight':'heavy'),  
		new Gun(id===1?'laser':'plasma', false),
		new Gun(id===1?'missile':'pulseLaser', true),
		new Scanner(id===1?'mediumRangeScanner':'shortRangeScanner', false, false),
		null,
		null,
		new Jammer(id===1?'mediumRangeJammer':'longRangeJammer'),
		new Treads(id===1?'advancedTreads':'heavilyArmoredTreads'),
		null,
		null,
		null,
		getEmptyCasusCode(),
		id===1?'TestTank1':'TestTank2',
		'',
		'',
	);
	loadCasus(blocks => {toReturn.casusCode = blocks});
	return toReturn;
}

function getTank(tank: BackendTank): Tank {
	// Setup TankComponent arrays.
	const position = new Vec(50, 40);
	const chassis: Array<TankComponent> = getComponentsOfType(tank.components, 'chassis');
	const weapons: Array<TankComponent> = getComponentsOfType(tank.components, 'weapon');
	const scanners: Array<TankComponent> = getComponentsOfType(tank.components, 'scanner');
	const scannerAddons: Array<TankComponent> = getComponentsOfType(tank.components, 'scannerAddon');
	const jammers: Array<TankComponent> = getComponentsOfType(tank.components, 'jammer');
	const treads: Array<TankComponent> = getComponentsOfType(tank.components, 'treads');
	const items: Array<TankComponent> = getComponentsOfType(tank.components, 'item');
	
	// Setup return value.
	const toReturn: Tank = new Tank (
		position,
		new Chassis(chassis[0]),
		new Gun(weapons[0], false),
		new Gun(weapons[1], true),
		new Scanner(
			scanners[0], 
			(scannerAddons.includes('itemScanner')) ? true : false,
			(scannerAddons.includes('antiJammerScanner')) ? true : false,
		),
		new TankPart(scannerAddons[0]),
		new TankPart(scannerAddons[1]),
		new Jammer(jammers[0]),
		new Treads(treads[0]),
		new Item(items[0]),
		new Item(items[1]),
		new Item(items[2]),
		getEmptyCasusCode(),
		tank.tankName,
		tank._id,
		tank.userId,
	)
	loadCasus(blocks => {toReturn.casusCode = blocks});
	return toReturn;
}

function getEmptyCasusCode(): CasusBlock {
	const childrenBlocks: Array<CasusBlock> = [];
	const container: ContainerBlock = new ContainerBlock(childrenBlocks);
	return container;
}

export { getTank, getTestTank };
