// @flow

/**
 *
 */

/**
 * @author Jan Vandenhouten
 */
export default class Set {
	set: number[];

	constructor(set: ?number[]) {
		this.set = set ? set : [];
	}

	/**
	 * proves if set2 is completely existent in this set.
	 * @param set2 - the other set
	 * @return false, when at least one number in set2 is non existent in this set, true otherwise
	 */
	contains(set2: Set): boolean {
		let result;
		let set2a = set2.getSet();
		for(let j=0; j<set2a.length; j++) {
			result = false;
			for(let k=0; k<this.set.length; k++) {
				if(this.set[k] === set2a[j]) result = true;
			}
			if(!result) return false;
		}
		return true;
	}

	/**
	 * proves if set2 is completely non existent in this set.
	 * @param set2 - the other set
	 * @return false, when at least one number in set2 is existent in this set, true otherwise.
	 */
	 doesntContain(set2: Set): boolean {
		let result;
		let set2a = set2.getSet();
		for(let j=0; j<set2a.length; j++) {
			result = true;
			for(let k=0; k<this.set.length; k++) {
				if(this.set[k] === set2a[j]) result = false;
			}
			if(!result) return false;
		}
		return true;
	}

	/**
	 * intersects this set with set2 and saves the result in this set.
	 * @param set2 - the other set
	 */
	intersect(set2: Set): void {
		let set2a = set2.getSet();
		const result = [];
		for(let j=0; j<this.set.length; j++) {
			for(let k=0; k<set2a.length; k++) {
				if (this.set[j] === set2a[k])
					result.push(this.set[j]);
			}
		}
		this.set = result;
	}

	/**
	 * merges this set with set2 and saves the result in this set.
	 * @param set2 - the other set
	 */
	merge(set2: Set): void {
		let set2a = set2.getSet();
		const result = [];
		if (this.set.length === 0 && set2a.length === 0) this.set = new Array(0);
		if (this.set.length === 0)
			this.set = set2a;
		if (set2a.length === 0)
			return;
		for(let i=0; i<this.set.length; i++) {
			result.push(this.set[i]);
		}
		let h1;
		for(let i=0; i<set2.length; i++) {
			h1 = set2.getSet()[i];
			if(this.doesntContain(new Set([h1]))) {
				result.push(h1);
			}
		}
		this.set = result;
	}

	/**
	 * subtracts set2 from this set and saves the result in this set.
	 * @param set2 - the other set
	 */
	subtract(set2: Set): void {
		const set2a = set2.getSet();
		const result = [];
		if (set2a.length === 0) return;
		outer:
		for(let j=0; j<this.set.length; j++) {
			for(let k=0; k<set2a.length; k++) {
				if (this.set[j] === set2a[k])
					continue outer;
			}
			result.push(this.set[j]);
		}
		this.set = result;
	}

	/**
	 * Builds the complement of this set in respect to the complete set omega
	 * @param omega - the complete set (when merging all part sets together)
	 */
	complement(omega: Set): void {
		const help = this.set;
		this.set = omega.getSet();
		this.subtract(new Set(help));
	}

	getSet(): number[] {
		return this.set;
	}

	get length(): number {
		return this.set.length;
	}

	equals(set2: Set): boolean {
		return this.contains(set2) && set2.contains(this);
	}

	clone(): Set {
		return new Set(this.getSet());
	}

}
