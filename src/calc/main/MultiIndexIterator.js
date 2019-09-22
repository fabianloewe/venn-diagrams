// @flow

/**
 * Generates an Array of Integer that iterates for each value to a given range
 *
 * @author Skyphoenix
 */
export default class MultiIndexIterator implements Iterator<number[]>, Iterable<number[]> {
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
  constructor(size: number, index: number, countAll: boolean) {
    this.points = new Array(index);
    this.points[index - 1] = -1;
    this.size = size;
    this.index = index;
    this.countAll = countAll;
  }

  next(): number[] {
    if (this.hasNext()) {
      this.points[index - 1] += 1;
      if (this.points[index - 1] >= size) {
        let i = 1;
        let added = new Array(index);
        while ((this.points[index - i]) >= size) {
          this.points[index - (i + 1)] += 1;
          added[index - i] = true;
          i++;
        }
        for (i = 0; i < index; i++) {
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
      if (!(i === this.size - 1))
        hasNext = true;
    }
    return hasNext;
  }

  iterator(): Iterator<number[]> {
    return this;
  }
}
