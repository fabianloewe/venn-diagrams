// @flow

/**
 * Generates an Array of Integer that iterates for each value to a given range
 *
 * @author Skyphoenix
 */
export default class MultiIndexIterator implements Iterable<Array<number>> {
  countAll: boolean;
  size: number;
  index: number;
  points: number[];

  /**
   * Iterator for any number of digits that count up to a specific value
   *
   * @param size - count up to this number -1
   * @param index - number of digits
   * @param countAll
   */
  constructor(size: number, index: number, countAll: boolean = false) {
    this.points = Array.from({ length: index }, () => 0);
    this.points[index - 1] = -1;
    this.size = size;
    this.index = index;
    this.countAll = countAll;
  }

  next(): Array<number> {
    if (this.hasNext()) {
      this.points[this.index - 1] += 1;
      if (this.points[this.index - 1] >= this.size) {
        let i = 1;
        const added: boolean[] = new Array(this.index);
        while ((this.points[this.index - i]) >= this.size) {
          this.points[this.index - (i + 1)] += 1;
          added[this.index - i] = true;
          i++;
        }
        for (i = 0; i < this.index; i++) {
          if (added[i]) {
            if (this.countAll)
              this.points[i] = this.points[i - 1];
            else
              this.points[i] = 0;
          }
        }
      }
      return this.points;
    } else {
      throw new Error("No such element");
    }
  }

  hasNext(): boolean {
    let hasNext = false;
    for (const i of this.points) {
      if (i !== (this.size - 1))
        hasNext = true;
    }
    return hasNext;
  }

  /*
  iterator(): Iterator<number[]> {
    return this;
  }
  */

  // $FlowFixMe
  [Symbol.iterator](): Iterator<number[]> {
    return {
      next: () : IteratorResult<number[]> => {
        if (this.hasNext()) {
          return { value: this.next(), done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }

  /*::
  @@iterator(): Iterator<number[]> {
    // $FlowFixMe
    return this[Symbol.iterator]()
  }
  */
}
