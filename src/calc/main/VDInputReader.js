// @flow

import Set from "./Set"
import VennDiagram from "./VennDiagram"

/**
 *
 */

/**
 * @author Jan Vandenhouten
 */
export default class VDInputReader {
  markedAreas: Set
  helpSets: Map<number, Set>
  negatedSets: Map<number, Set>
  helpSetCount: number
  vd: VennDiagram
  static NEGATETOKEN = "~"
  static MERGETOKEN = "Uu"
  static INTERSECTTOKEN = "Nn"
  static SUBTRACTTOKEN = "-"
  static CALCULATIONTOKENS = VDInputReader.MERGETOKEN + VDInputReader.INTERSECTTOKEN + VDInputReader.SUBTRACTTOKEN
  static SETTOKENS = "aAbBcCdD"
  static ALLOWEDTOKENS = "()" + VDInputReader.SETTOKENS + VDInputReader.NEGATETOKEN + VDInputReader.CALCULATIONTOKENS

  /**
   * Constructor
   * @param numberOfSets
   */
  constructor(numberOfSets: number) {
    this.vd = new VennDiagram(numberOfSets)
    this.helpSets = new Map()
    this.negatedSets = new Map()
  }

  /**
   * Reads given input, evaluates it and transforms it into a @Set
   * @param input
   * @return
   */
  readInput(input: string): Set {
    input = input.replace(/\s/g, "")
    if (input.length === 0) return new Set(new Array(0))
    this.checkInput(input)
    let bracketsRemover = input
    let curStart = 0
    let curEnd = -1
    let openBrackets = 0
    let l
    this.helpSetCount = 0
    let evaluated = false
    while (bracketsRemover.length) {
      l = bracketsRemover.length
      curEnd++
      if (bracketsRemover.charAt(curEnd) === "(") {
        if (curEnd === l - 1) {
          throw new Error("Opening bracket doesn't have a closing bracket to it.")
        }
        curStart = curEnd
        openBrackets++
        continue
      }
      if (bracketsRemover.charAt(curEnd) === ")") {
        if (openBrackets > 0) {
          console.log("" + (this.helpSetCount + 1))
          this.evaluateSubstring(bracketsRemover.substring(curStart, curEnd + 1))
          bracketsRemover = bracketsRemover.substring(0, curStart) + this.helpSetCount +
            bracketsRemover.substring(curEnd + 1, l)
          openBrackets--
          evaluated = true
        } else if (openBrackets <= 0) {
          throw new Error("Closing bracket doesn't have an opening bracket to it.")
        }
      }
      if (curEnd === l - 1 && bracketsRemover.length > 0) {
        if (openBrackets === 0) {
          this.evaluateSubstring(bracketsRemover.substring(0, bracketsRemover.length))
          bracketsRemover = ""
        } else {
          throw new Error("Opening bracket doesn't have a closing bracket to it.")
        }
      }
      if (evaluated) {
        openBrackets = 0
        curStart = 0
        curEnd = -1
        evaluated = false
      }
    }
    this.markedAreas = this.helpSets.get(this.helpSetCount)
    this.logResult(this.markedAreas)
    console.log("Completed input reading.")
    return this.markedAreas
  }

  /**
   * Evaluates a String and puts the Set into the @HashMap
   * @param substring - the String to be evaluated
   */
  evaluateSubstring(substring: string): void {
    substring = substring.replace(/[()]/g, "")
    console.log(substring)
    this.helpSetCount++
    let xSetCount = 0
    //remove negated sets
    let setPattern = new RegExp("[" + VDInputReader.SETTOKENS + "]")
    let setPattern2 = /[X]?[\d]*/
    for (let i = 0; i < substring.length; i++) {
      if (substring.charAt(i) === VDInputReader.NEGATETOKEN.charAt(0)) {
        if (i === substring.length - 1) throw new Error(VDInputReader.NEGATETOKEN + " doesn't have a follow up set.")
        if (substring.charAt(i + 1) === VDInputReader.NEGATETOKEN.charAt(0)) {
          substring = substring.substring(0, i) + substring.substring(i + 2, substring.length)
          i--
          continue
        }
        let startIndex = i + 1
        let endIndex = this.indexForNextSet(startIndex, substring)
        let set = substring.substring(startIndex, endIndex)
        if (set.match(setPattern) || set.match(setPattern2)) {
          let complement = this.extractSet(set)
          complement.complement(new Set(this.vd.getOmega()))
          this.negatedSets.set(xSetCount, complement)
          substring = (endIndex === substring.length) ? substring.substring(0, i) + "X" + xSetCount :
            substring.substring(0, i) + "X" + xSetCount + substring.substring(endIndex, substring.length)
          xSetCount++
        } else {
          throw new Error("something went wrong here [remove negated sets] -> pattern doesn't match")
        }
      }

    }
    //evaluate the rest
    let endIndex = this.indexForNextSet(0, substring)
    let helpSet = this.extractSet(substring.substring(0, endIndex))
    substring = substring.substring(endIndex)
    while (substring.length) {
      let s = substring.substring(0, 1)
      endIndex = this.indexForNextSet(1, substring)
      switch (s) {
        case "U":
          helpSet.merge(this.extractSet(substring.substring(1, endIndex)))
          break
        case "u":
          helpSet.merge(this.extractSet(substring.substring(1, endIndex)))
          break
        case "N":
          helpSet.intersect(this.extractSet(substring.substring(1, endIndex)))
          break
        case "n":
          helpSet.intersect(this.extractSet(substring.substring(1, endIndex)))
          break
        case "-":
          helpSet.subtract(this.extractSet(substring.substring(1, endIndex)))
          break
        default:
          throw new Error("no such calculation token allowed: " + s)
      }
      substring = substring.substring(endIndex)
    }
    this.helpSets.set(this.helpSetCount, helpSet.clone())
  }

  /**
   * Determines the index, where the next @Set starts
   * @param startIndex - from where to begin to search
   * @param string - the String to be searching in
   * @return start index of the next @Set
   */
  indexForNextSet(startIndex: number, string: string): number {
    let endIndex = startIndex + 1
    for (let j = startIndex + 1; j < string.length; j++) {
      if (VDInputReader.CALCULATIONTOKENS.includes(string.substring(j, j + 1))) {
        endIndex = j
        break
      }
      endIndex = j + 1
    }
    return endIndex
  }

  /**
   * Checks if there are any tokens in the input that are not allowed
   * @param input
   */
  checkInput(input: string): void {
    let s
    for (let i = 0; i < input.length; i++) {
      s = input.charAt(i)
      if (!VDInputReader.ALLOWEDTOKENS.includes(s)) {
        throw new Error("Token used which is not allowed. (" + s + ")")
      }
    }
  }

  /**
   * Extracts a @Set from a given string:
   * Either from the @VennDiagram
   * or the @HashMap
   * @param string
   * @return the extracted @Set
   */
  extractSet(string: string): Set {
    const xNumberPattern = /[X][\d]+/
    if (string.match(xNumberPattern)) {
      let i = Number.parseInt(string.substring(1, string.length))
      return this.negatedSets.get(i)
    }

    const numberPattern = /[\d]+/
    if (string.match(numberPattern)) {
      let i = Number.parseInt(string)
      return this.helpSets.get(i)
    }

    switch (string) {
      case "A":
        return new Set(this.vd.getA())
      case "a":
        return new Set(this.vd.getA())
      case "B":
        return new Set(this.vd.getB())
      case "b":
        return new Set(this.vd.getB())
      case "C":
        return new Set(this.vd.getC())
      case "c":
        return new Set(this.vd.getC())
      case "D":
        return new Set(this.vd.getD())
      case "d":
        return new Set(this.vd.getD())
      default:
        throw new Error("something went wrong here [extractSet()]: " + string)
    }
  }

  /**
   * Logs a given @Set to the console
   * @param set
   */
  logResult(set: Set): void {
    let markedAreas = set.getSet()
    console.log("Result:")
    let sb = "{"
    for (let i = 0; i < markedAreas.length; i++) {
      sb += "" + markedAreas[i] + ", "
    }
    sb += "}"
    let result = sb.toString()
    let rl = result.length
    result = result.substring(0, rl - 3) + result.substring(rl - 1, rl)
    console.log(result)
  }

}
