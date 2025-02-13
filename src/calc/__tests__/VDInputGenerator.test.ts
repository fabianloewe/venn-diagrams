import VDInputGenerator from '../main/VDInputGenerator';
import Set from '../main/Set';

describe('VDInputGenerator', () => {
  let inputGenerator: VDInputGenerator;

  describe('generateInput', () => {
    describe('1 set', () => {
      beforeEach(() => {
        inputGenerator = new VDInputGenerator(1);
      });

      it('should generate correct input for a single element set', () => {
        const set = new Set([1]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('A');
      });

      it('should generate correct input for the empty set', () => {
        const set = new Set([]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('');
      });

      it('should generate correct input for the universal set', () => {
        const set = new Set([0, 1]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('O');
      });
    });

    describe('2 sets', () => {
      beforeEach(() => {
        inputGenerator = new VDInputGenerator(2);
      });

      it('should generate correct input for a single element set', () => {
        const set = new Set([1]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('~B-~A');
      });

      it('should generate correct input for a union of sets', () => {
        const set = new Set([1, 2, 3]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('AUB');
      });

      it('should generate correct input for an intersection of sets', () => {
        const set = new Set([3]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('B-~A');
      });

      it('should generate correct input for a negation of a set', () => {
        const set = new Set([0, 2]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('~A');
      });

      it('should generate correct input for a complex expression', () => {
        const set = new Set([1, 3]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('A');
      });
    });

    describe('3 sets', () => {
      beforeEach(() => {
        inputGenerator = new VDInputGenerator(3);
      });

      it('should generate correct input for a single element set', () => {
        const set = new Set([1]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('~C-B-~A');
      });

      it('should generate correct input for a union of sets', () => {
        const set = new Set([1, 2, 3, 4, 5, 6, 7]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('AUBUC');
      });

      it('should generate correct input for an intersection of sets', () => {
        const set = new Set([7]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('C-~A-~B');
      });

      it('should generate correct input for a negation of a set', () => {
        const set = new Set([0, 2, 3, 5]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('~A');
      });

      it('should generate correct input for a complex expression', () => {
        const set = new Set([1, 3, 5, 7]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('CU~B-(~An~C)-(AnCn~B)');
      });
    });

    describe('4 sets', () => {
      beforeEach(() => {
        inputGenerator = new VDInputGenerator(4);
      });

      it('should generate correct input for a single element set', () => {
        const set = new Set([1]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('~D-B-C-~A');
      });

      it('should generate correct input for a union of sets', () => {
        const set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('AUBUCUD');
      });

      it('should generate correct input for an intersection of sets', () => {
        const set = new Set([15]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('D-~A-~B-~C');
      });

      it('should generate correct input for a negation of a set', () => {
        const set = new Set([0, 2, 3, 4, 7, 8, 10, 12]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('~A');
      });

      it('should generate correct input for a complex expression', () => {
        const set = new Set([1, 3, 5, 7, 9, 11, 13, 15]);
        const result = inputGenerator.generateInput(set);
        expect(result).toBe('CUDU~B-(~An~Bn~C)-(CnDn~B)-(BnCn~A)');
      });
    });
  });

  describe('isForbidden', () => {
    beforeEach(() => {
      inputGenerator = new VDInputGenerator(2);
    });

    it('should return false for an empty blacklist', () => {
      const set = new Set([1]);
      const result = inputGenerator.isForbidden([], set);
      expect(result).toBe(false);
    });

    it('should return true for a set in the blacklist', () => {
      const set = new Set([1]);
      const blacklist = [new Set([1])];
      const result = inputGenerator.isForbidden(blacklist, set);
      expect(result).toBe(true);
    });

    it('should return false for a set not in the blacklist', () => {
      const set = new Set([1]);
      const blacklist = [new Set([2])];
      const result = inputGenerator.isForbidden(blacklist, set);
      expect(result).toBe(false);
    });
  });

  describe('getLetter', () => {
    it('should return correct letter for 1 set', () => {
      inputGenerator = new VDInputGenerator(1);
      expect(inputGenerator.getLetter(0)).toBe('A');
      expect(inputGenerator.getLetter(1)).toBe('O');
      expect(inputGenerator.getLetter(2)).toBe('~A');
    });

    it('should return correct letter for 2 sets', () => {
      inputGenerator = new VDInputGenerator(2);
      expect(inputGenerator.getLetter(0)).toBe('A');
      expect(inputGenerator.getLetter(1)).toBe('B');
      expect(inputGenerator.getLetter(2)).toBe('O');
      expect(inputGenerator.getLetter(3)).toBe('~A');
      expect(inputGenerator.getLetter(4)).toBe('~B');
    });

    it('should return correct letter for 3 sets', () => {
      inputGenerator = new VDInputGenerator(3);
      expect(inputGenerator.getLetter(0)).toBe('A');
      expect(inputGenerator.getLetter(1)).toBe('B');
      expect(inputGenerator.getLetter(2)).toBe('C');
      expect(inputGenerator.getLetter(3)).toBe('O');
      expect(inputGenerator.getLetter(4)).toBe('~A');
      expect(inputGenerator.getLetter(5)).toBe('~B');
      expect(inputGenerator.getLetter(6)).toBe('~C');
    });

    it('should return correct letter for 4 sets', () => {
      inputGenerator = new VDInputGenerator(4);
      expect(inputGenerator.getLetter(0)).toBe('A');
      expect(inputGenerator.getLetter(1)).toBe('B');
      expect(inputGenerator.getLetter(2)).toBe('C');
      expect(inputGenerator.getLetter(3)).toBe('D');
      expect(inputGenerator.getLetter(4)).toBe('O');
      expect(inputGenerator.getLetter(5)).toBe('~A');
      expect(inputGenerator.getLetter(6)).toBe('~B');
      expect(inputGenerator.getLetter(7)).toBe('~C');
      expect(inputGenerator.getLetter(8)).toBe('~D');
    });
  });
});