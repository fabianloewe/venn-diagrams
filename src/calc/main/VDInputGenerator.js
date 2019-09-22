// @flow

import Set from "./Set";
import VennDiagram from "./VennDiagram";
import VDInputReader from "./VDInputReader";
import MultiIndexIterator from "./MultiIndexIterator";

/**
 * This class generates input from the given input numbers from a complete set
 * @author Jan Vandenhouten
 */
export default class VDInputGenerator {
	vd: VennDiagram;
	allSets: Map<Number, Set> = new Map();
	numberOfSets: number;

	constructor(numberOfSets: number = 2) {
		this.vd = new VennDiagram(numberOfSets);
		let allSetsArray = this.vd.getAllSets();
		let l = allSetsArray.length;
		let h1;
		for(let i=0; i<l-1; i++) {
			h1 = 2*l - 3;
			const s = new Set(allSetsArray[i+1]);
			this.allSets.put(h1-(i), s.clone());
			s.complement(new Set(allSetsArray[0]));
			this.allSets.put(h1-(i+l-1), s.clone());
		}
		this.numberOfSets = numberOfSets;
	}

	/**
	 * Step 1 - Put all necessary Sets together (merging), until there is one Set, containing all numbers in s.
	 * Step 2 - Try to remove the remaining numbers with intersection with the other sets, without eliminating the numbers in s.
	 * Step 3 - Try to remove the remaining numbers with subtraction of the other sets, without eliminating the numbers in s.
	 * Step 4 - Try to remove the remaining numbers with a combination of subtraction of the other sets, and intersect it with the rest,
	 * without eliminating the numbers in s.
	 * Step 5 - Try to remove the remaining numbers with a combination of intersection of the other sets, and subtract it from the rest,
	 * without eliminating the numbers in s.
	 * @param s - the set that has to be generated
	 * @return - a string that set together generates a set that equals s.
	 */
	generateInput(s: Set): string {

		let sb = "";
		let vdIR = new VDInputReader(this.numberOfSets);
		let firstRun = true;
		let step = 0;
		let runCounter = 0;
		let totalCounter = 0;
		const LASTSTEP = 4;
		let l;
		let help1 = new Set(new int[0]);
		let help2;
		let help3 = new Set(new int[0]);
		let blacklist = [];
		let curBest: Set[] = new Array(5);
		let allSetsSize = this.allSets.size();
		let curSets: boolean[] = new Array(allSetsSize);
		let curBestSets: boolean[] = new Array(allSetsSize);
		let removeLastLetter;
		while(!vdIR.readInput(sb.toString()).equals(s)) {
			console.log("Step: " + step);
			switch(step) {
			case 0:
				sb = "";
				curBest = new Array(5);
				firstRun = true;
				let mii = new MultiIndexIterator(2, allSetsSize);
				mii.next();
				let now;
				while(mii.hasNext()) {
					now = mii.next();
					help1 = new Set(new Array(0));
					curSets = new Array(allSetsSize);
					for(let i=0; i<now.length; i++) {
						if(now[i] === 1) {
							help1.merge(this.allSets.get(i));
							curSets[i] = true;
						}
					}
					if(help1.equals(s)) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
						break;
					}
					if(help1.contains(s)
							&& (curBest[step] == null ||
							help1.length() < curBest[step].length())
							&& !this.isForbidden(blacklist, help1)) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
					}
				}
				l = curBestSets.length;
				removeLastLetter = false;
				for(let i=0; i<l; i++) {
					if(curBestSets[i]) {
						sb += this.getLetter(l-1-i) + "U";
						removeLastLetter = true;
					}
				}
				if (removeLastLetter) sb = sb.slice(0, sb.length()-1);
				curBest[step+1] = curBest[step].clone();
				step++;
				curBestSets = new Array(allSetsSize);
				break;
			case 1:
				let mii2 = new MultiIndexIterator(2, allSetsSize);
				let now2;
				while(mii2.hasNext()) {
					now2 = mii2.next();
					help1 = firstRun ? curBest[step-1].clone() : curBest[LASTSTEP];
					curSets = new Array(allSetsSize);
					for(let i=0; i<now2.length; i++) {
						if(now2[i] === 1) {
							help1.subtract(this.allSets.get(i));
							curSets[i] = true;
						}
					}
					if(help1.equals(s)) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
						break;
					}
					if(help1.contains(s) &&
							(curBest[step] == null || help1.length() < curBest[step].length())) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
					}
				}
				removeLastLetter = false;
				l = curBestSets.length;
				for(let i=0; i<l; i++) {
					if(curBestSets[i]) {
						if(!removeLastLetter) sb += "-";
						sb += this.getLetter(l-1-i) + "-";
						removeLastLetter = true;
					}
				}
				if (removeLastLetter) sb = sb.slice(0, sb.length()-1);
				curBest[step+1] = curBest[step].clone();
				step++;
				curBestSets = new Array(allSetsSize);
				break;
			case 2:
				let mii3 = new MultiIndexIterator(2, allSetsSize);
				let now3;
				while(mii3.hasNext()) {
					now3 = mii3.next();
					help1 = curBest[step-1].clone();
					curSets = new Array(allSetsSize);
					for(let i=0; i<now3.length; i++) {
						if(now3[i] === 1) {
							help1.intersect(this.allSets.get(i));
							curSets[i] = true;
						}
					}
					if(help1.equals(s)) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
						break;
					}
					if(help1.contains(s) &&
							(curBest[step] == null || help1.length() < curBest[step].length())) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
					}
				}
				removeLastLetter = false;
				l = curBestSets.length;
				for(let i=0; i<l; i++) {
					if(curBestSets[i]) {
						if(!removeLastLetter) sb += "n";
						sb += this.getLetter(l-1-i) + "n";
						removeLastLetter = true;
					}
				}
				if (removeLastLetter) sb = sb.slice(0, sb.length()-1);
				curBest[step+1] = curBest[step].clone();
				step++;
				curBestSets = new Array(allSetsSize);
				break;
			case 3:
				let mii4 = new MultiIndexIterator(2, allSetsSize);
				let now4;
				while(mii4.hasNext()) {
					now4 = mii4.next();
					help1 = curBest[step-1].clone();
					help2 = null;
					curSets = new Array(allSetsSize);
					for(let i=0; i<now4.length; i++) {
						if(now4[i] === 1) {
							if (help2 == null) {
								help2 = this.allSets.get(i).clone();
							}
							else {
								help2.intersect(this.allSets.get(i));
							}
							curSets[i] = true;
						}
					}
					if(help2 == null) help2 = new Set(new Array(0));
					help1.subtract(help2);
					if(help1.equals(s)) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
						break;
					}
					if(help1.contains(s) &&
							(curBest[step] == null || help1.length() < curBest[step].length())) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
					}
				}
				removeLastLetter = false;
				l = curBestSets.length;
				for(let i=0; i<l; i++) {
					if(curBestSets[i]) {
						if(!removeLastLetter) sb += "-(";
						sb += this.getLetter(l-1-i) + "n";
						removeLastLetter = true;
					}
				}
				if (removeLastLetter) {
					sb = sb.slice(0, sb.length()-1);
					sb += ")";
				}
				curBest[step+1] = curBest[step].clone();
				step++;
				curBestSets = new Array(allSetsSize);
				break;
			case LASTSTEP:
				let mii5 = new MultiIndexIterator(2, allSetsSize);
				let now5;
				while(mii5.hasNext()) {
					now5 = mii5.next();
					help1 = curBest[step-1].clone();
					help2 = null;
					curSets = new Array(allSetsSize);
					for(let i=0; i<now5.length; i++) {
						if(now5[i] === 1) {
							if (help2 == null) {
								help2 = this.allSets.get(i).clone();
							}
							else {
								help2.subtract(this.allSets.get(i));
							}
							curSets[i] = true;
						}
					}
					if(help2 == null) help2 = new Set(new Array(0));
					help1.intersect(help2);
					if(help1.equals(s)) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
						break;
					}
					if(help1.contains(s) &&
							(curBest[step] == null || help1.length() < curBest[step].length())) {
						curBest[step] = help1.clone();
						curBestSets = curSets.slice(0);
					}
				}
				removeLastLetter = false;
				l = curBestSets.length;
				for(let i=0; i<l; i++) {
					if(curBestSets[i]) {
						if(!removeLastLetter) sb += "n(";
						sb += this.getLetter(l-1-i) + "-";
						removeLastLetter = true;
					}
				}
				if (removeLastLetter) {
					sb = sb.slice(0, sb.length()-1);
					sb += ")";
				}
				firstRun = false;
				curBest[1] = curBest[step].clone();
				step = 1;
				curBestSets = new Array(allSetsSize);
				if (runCounter > 5 && curBest[step].equals(help3)) {
					step = 0;
					runCounter = 0;
					totalCounter++;
					blacklist.push(help3);
				}
				help3 = curBest[step];
				runCounter++;
				if (totalCounter > 5) step = 6;
				break;
			case 6:
				let remainder = curBest[LASTSTEP].clone();
				remainder.subtract(s);
				let remL = remainder.length();
				let s1;
				for(let i=0; i<remL; i++) {
					s1 = this.generateInput(new Set([remainder.getSet()[i]]));
					sb += "-(" + s1 + ")";
				}
				break;
			default:
				throw new Error("NO!");
			}


		}
		return sb.toString();
	}

	isForbidden(blacklist: Set[], element: Set): boolean {
		if(blacklist.length() === 0) return false;
		for(let i=0; i<blacklist.length(); i++) {
			if(element.equals(blacklist[i])) return true;
		}
		return false;
	}

	getLetter(i): string {
		let exceptionI = "[getLetter], i: ";
		switch(this.numberOfSets) {
		case 1:
			switch(i) {
			case 0: return "A";
			case 1: return "~A";
			default: throw new Error(exceptionI + i);
			}
		case 2:
			switch (i) {
			case 0: return "A";
			case 1: return "B";
			case 2: return "~A";
			case 3: return "~B";
			default: throw new Error(exceptionI + i);
			}
		case 3:
			switch(i) {
			case 0: return "A";
			case 1: return "B";
			case 2: return "C";
			case 3: return "~A";
			case 4: return "~B";
			case 5: return "~C";
			default: throw new Error(exceptionI + i);
			}
		case 4:
			switch (i) {
			case 0: return "A";
			case 1: return "B";
			case 2: return "C";
			case 3: return "D";
			case 4: return "~A";
			case 5: return "~B";
			case 6: return "~C";
			case 7: return "~D";
			default: throw new Error(exceptionI + i);
			}
		default: throw new Error("[getLetter], numberOfSets: " + this.numberOfSets);
		}
	}
}
