// @flow
/**
 *
 */

import Set from "./Set";
import VDInputReader from "./VDInputReader"
import VDInputGenerator from "./VDInputGenerator"

/**
 * @author Jan Vandenhouten
 */
export default class VDTester {
	static main(args: string[]): void {
		let numberOfSets = 3;
		let vdIR = new VDInputReader(numberOfSets);
		let s = vdIR.readInput("anb");
		let vdIG = new VDInputGenerator(numberOfSets);
		let result = vdIG.generateInput(s);
		console.log("***ENDRESULT: " + result + "***");
	}

}
