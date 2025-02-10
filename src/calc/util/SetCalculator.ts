// @flow

/**
 *
 */

/**
 * @author jvad
 *
 */
export default class SetCalculator {

	static intersect(x: Array<number>, y: Array<number>): Array<number> {
		let xc = x.slice(0);
		let yc = y.slice(0);
		let result = [];
		for(let j=0; j<xc.length; j++) {
			for(let k=0; k<yc.length; k++) {
				if (xc[j] === yc[k])
					result.push(xc[j]);
			}
		}
		return result;
	}

	static merge(x: Array<number>, y: Array<number>): Array<number> {
		let xc = x.slice(0);
		let yc = y.slice(0);
		let result = [];
		if (xc.length === 0 && yc.length === 0) return new Array(0);
		if (xc.length === 0)
			return yc;
		if (yc.length === 0)
			return xc;
		outer:
		for(let j=0; j<xc.length; j++) {
			for(let k=0; k<yc.length; k++) {
				if (k===0)
					result.push(yc[k]);
				if (xc[j] === yc[k])
					continue outer;
			}
			result.push(xc[j]);
		}
		return result;
	}

	static subtract(x: Array<number>, y: Array<number>): Array<number> {
		let xc = x.slice(0);
		let yc = y.slice(0);
		let result = [];
		if (yc.length === 0) return xc;
		outer:
		for(let j=0; j<xc.length; j++) {
			for(let k=0; k<yc.length; k++) {
				if (xc[j] === yc[k])
					continue outer;
			}
			result.push(xc[j]);
		}
		return result;
	}

	static complement(omega: Array<number>, x: Array<number>): Array<number> {
		return SetCalculator.subtract(omega, x);
	}
}
