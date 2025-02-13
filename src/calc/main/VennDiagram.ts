// @flow

import Set from "./Set";

/**
 * @author Jan Vandenhouten
 */
export default class VennDiagram {
	numberOfSets: number;
	allSets?: Set[];
	omega?: Set;
	a?: Set;
	b?: Set;
	c?: Set;
	d?: Set;

	constructor(numberOfSets: number) {
		this.numberOfSets = numberOfSets;
		this.setNumberOfSets(numberOfSets);
		this.setAmounts(numberOfSets);
	}

	setAmounts(numberOfSets: number): void {
		this.setArraysToNull();
		this.numberOfSets = numberOfSets;
		switch (numberOfSets) {
		case 1 :
			this.omega = new Set([0,1]);
			this.a = new Set([1]);
			this.allSets = [this.a, this.omega];
			break;
		case 2 :
			this.omega = new Set([0,1,2,3]);
			this.a = new Set([1,3]);
			this.b = new Set([2,3]);
			this.allSets = [this.a, this.b, this.omega];
			break;
		case 3 :
			this.omega = new Set([0,1,2,3,4,5,6,7]);
			this.a = new Set([1,4,6,7]);
			this.b = new Set([2,4,5,7]);
			this.c = new Set([3,5,6,7]);
			this.allSets = [this.a, this.b, this.c, this.omega];
			break;
		case 4 :
			this.omega = new Set([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
			this.a = new Set([1,5,6,9,11,13,14,15]);
			this.b = new Set([2,6,7,8,11,12,13,15]);
			this.c = new Set([3,8,9,10,12,13,14,15]);
			this.d = new Set([4,5,7,10,11,12,14,15]);
			this.allSets = [this.a, this.b, this.c, this.d, this.omega];
			break;
		default:
			throw new Error("Only 0 to 4 sets allowed.");
		}
	}

	setArraysToNull(): void {
		this.omega = undefined;
		this.a = undefined;
		this.b = undefined;
		this.c = undefined;
		this.d = undefined;
		this.allSets = undefined;
	}

	getNumberOfSets(): number {
		return this.numberOfSets;
	}

	setNumberOfSets(numberOfSets: number): void {
		if(0 < numberOfSets && numberOfSets < 5) this.numberOfSets = numberOfSets;
		else throw new Error("only 1-4 Sets allowed");
	}

	getAllSets(): Set[] {
		if(this.allSets !== null && this.allSets !== undefined)
			return this.allSets;
		else
			throw new Error("allSets is null");
	}

	getOmega(): Set {
		if(this.omega !== null && this.omega !== undefined)
			return this.omega.clone();
		else
			throw new Error("omega is null");
	}

	getA(): Set {
		if (this.a !== null && this.a !== undefined)
			return this.a.clone();
		else
			throw new Error("a is null");
	}

	getB(): Set {
		if (this.b !== null && this.b !== undefined)
			return this.b.clone();
		else
			throw new Error("b is null");
	}

	getC(): Set {
		if (this.c !== null && this.c !== undefined)
			return this.c.clone();
		else
			throw new Error("c is null");
	}

	getD(): Set {
		if (this.d !== null && this.d !== undefined)
			return this.d.clone();
		else
			throw new Error("d is null");
	}
}
