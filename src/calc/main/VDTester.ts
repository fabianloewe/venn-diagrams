// @flow
/**
 *
 */

import VDInputReader from "./VDInputReader";
import VDInputGenerator from "./VDInputGenerator";

/**
 * @author Jan Vandenhouten
 */
export default class VDTester {
	static main(args: string[]): void {
		const {
			numberOfSets = 3,
			input = "anb",
		} = VDTester.resolveArgs(args);
		let vdIR = new VDInputReader(numberOfSets);
		let s = vdIR.readInput(input);
		let vdIG = new VDInputGenerator(numberOfSets);
		let result = vdIG.generateInput(s);
		console.log("***ENDRESULT: " + result + "***");
	}

	static resolveArgs(args: string[]): { input?: string, numberOfSets?: number } {
		const nIndex = args.findIndex(a => a === "-n" || a === "--num-sets");
		const iIndex = args.findIndex(a => a === "-i" || a === "--input");
		return {
			numberOfSets: nIndex >= 0 ? Number(args[nIndex + 1]) : undefined,
			input: iIndex >= 0 ? args[iIndex + 1] : undefined,
		}
	}
}

//VDTester.main(process.argv.slice(2));
