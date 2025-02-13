import VDInputReader from '../main/VDInputReader';

describe('VDInputReader', () => {
  let inputReader: VDInputReader;

  const compareSets = (result: number[], expected: number[]) => {
    expect(result.sort()).toEqual(expected.sort());
  };

  describe('1 set', () => {
    beforeEach(() => {
      inputReader = new VDInputReader(1);
    });

    it('should handle union correctly', () => {
      const result = inputReader.readInput('AuO');
      compareSets(result.getSet(), [0, 1]);
    });

    it('should handle negation correctly', () => {
      const result = inputReader.readInput('~A');
      compareSets(result.getSet(), [0]);
    });

    it('should handle intersection correctly', () => {
      const result = inputReader.readInput('AnO');
      compareSets(result.getSet(), [1]);
    });

    it('should handle subtraction correctly', () => {
      const result = inputReader.readInput('A-O');
      compareSets(result.getSet(), []);
    });

    it('should handle brackets correctly', () => {
      const result = inputReader.readInput('(AuO)nA');
      compareSets(result.getSet(), [1]);
    });
  });

  describe('2 sets', () => {
    beforeEach(() => {
      inputReader = new VDInputReader(2);
    });

    it('should handle union correctly', () => {
      const result = inputReader.readInput('AuB');
      compareSets(result.getSet(), [1, 2, 3]);
    });

    it('should handle negation correctly', () => {
      const result = inputReader.readInput('~A');
      compareSets(result.getSet(), [0, 2]);
    });

    it('should handle intersection correctly', () => {
      const result = inputReader.readInput('AnB');
      compareSets(result.getSet(), [3]);
    });

    it('should handle subtraction correctly', () => {
      const result = inputReader.readInput('A-B');
      compareSets(result.getSet(), [1]);
    });

    it('should handle brackets correctly', () => {
      const result = inputReader.readInput('(AuB)nA');
      compareSets(result.getSet(), [1, 3]);
    });
  });

  describe('3 sets', () => {
    beforeEach(() => {
      inputReader = new VDInputReader(3);
    });

    it('should handle union correctly', () => {
      const result = inputReader.readInput('AuBuC');
      compareSets(result.getSet(), [1, 2, 3, 4, 5, 6, 7]);
    });

    it('should handle negation correctly', () => {
      const result = inputReader.readInput('~A');
      compareSets(result.getSet(), [0, 2, 3, 5]);
    });

    it('should handle intersection correctly', () => {
      const result = inputReader.readInput('AnBnC');
      compareSets(result.getSet(), [7]);
    });

    it('should handle subtraction correctly', () => {
      const result = inputReader.readInput('A-B-C');
      compareSets(result.getSet(), [1]);
    });

    it('should handle brackets correctly', () => {
      const result = inputReader.readInput('(AuB)n(BuC)');
      compareSets(result.getSet(), [2, 4, 5, 6, 7]);
    });
  });

  describe('4 sets', () => {
    beforeEach(() => {
      inputReader = new VDInputReader(4);
    });

    it('should handle union correctly', () => {
      const result = inputReader.readInput('AuBuCuD');
      compareSets(result.getSet(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    });

    it('should handle negation correctly', () => {
      const result = inputReader.readInput('~A');
      compareSets(result.getSet(), [0, 2, 3, 4, 7, 8, 10, 12]);
    });

    it('should handle intersection correctly', () => {
      const result = inputReader.readInput('AnBnCnD');
      compareSets(result.getSet(), [15]);
    });

    it('should handle subtraction correctly', () => {
      const result = inputReader.readInput('A-B-C-D');
      compareSets(result.getSet(), [1]);
    });

    it('should handle brackets correctly', () => {
      const result = inputReader.readInput('(AuB)n(CuD)');
      compareSets(result.getSet(), [5, 7, 8, 9, 11, 12, 13, 14, 15]);
    });
  });
});