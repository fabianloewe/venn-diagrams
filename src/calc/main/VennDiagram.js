// @flow

/**
 *
 */

/**
 * @author Jan Vandenhouten
 */
export default class VennDiagram {
	numberOfSets: number;
	allSets: number[][];
	omega: number[];
	a: number[];
	b: number[];
	c: number[];
	d: number[];

	constructor(numberOfSets: number) {
		this.setNumberOfSets(numberOfSets);
		this.setAmounts(numberOfSets);
	}

	setAmounts(numberOfSets: number): void {
		this.setArraysToNull();
		this.numberOfSets = numberOfSets;
		switch (numberOfSets) {
		case 1 :
			this.omega = [0,1];
			this.a = [1];
			this.allSets = [this.omega, this.a];
			break;
		case 2 :
			this.omega = [0,1,2,3];
			this.a = [1,3];
			this.b = [2,3];
			this.allSets = [this.omega, this.a, this.b];
			break;
		case 3 :
			this.omega = [0,1,2,3,4,5,6,7];
			this.a = [1,4,6,7];
			this.b = [2,4,5,7];
			this.c = [3,5,6,7];
			this.allSets = [this.omega, this.a, this.b, this.c];
			break;
		case 4 :
			this.omega = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
			this.a = [1,5,6,9,11,13,14,15];
			this.b = [2,6,7,8,11,12,13,15];
			this.c = [3,8,9,10,12,13,14,15];
			this.d = [4,5,7,10,11,12,14,15];
			this.allSets = [this.omega, this.a, this.b, this.c, this.d];
			break;
		default:
			throw new Error("Only 0 to 4 sets allowed.");
		}
	}

	setArraysToNull(): void {
		this.omega = null;
		this.a = null;
		this.b = null;
		this.c = null;
		this.d = null;
		this.allSets = null;
	}

	getNumberOfSets(): number {
		return this.numberOfSets;
	}

	setNumberOfSets(numberOfSets: number): void {
		if(0 < numberOfSets && numberOfSets < 5) this.numberOfSets = numberOfSets;
		else throw new Error("only 1-4 Sets allowed");
	}

	getAllSets(): number[][] {
		return this.allSets;
	}

	getOmega(): number[] {
		if(this.omega != null)
			return this.omega;
		else
			throw new Error("omega is null");
	}

	getA(): number[] {
		if (this.a != null)
			return this.a;
		else
			throw new Error("a is null");
	}

	getB(): number[] {
		if (this.b != null)
			return this.b;
		else
			throw new Error("b is null");
	}

	getC(): number[] {
		if (this.c != null)
			return this.c;
		else
			throw new Error("c is null");
	}

	getD(): number[] {
		if (this.d != null)
			return this.d;
		else
			throw new Error("d is null");
	}
}
