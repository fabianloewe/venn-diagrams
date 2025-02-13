import VennDiagram from '../main/VennDiagram';

describe('VennDiagram', () => {
  describe('constructor', () => {
    it('should create valid diagram with 2 sets', () => {
      const vd = new VennDiagram(2);
      expect(vd.getNumberOfSets()).toBe(2);
      expect(vd.getOmega().getSet()).toEqual([0, 1, 2, 3]);
    });

    it('should throw error for invalid number of sets', () => {
      expect(() => new VennDiagram(5)).toThrow();
      expect(() => new VennDiagram(0)).toThrow();
    });
  });

  describe('set operations', () => {
    let vd: VennDiagram;

    beforeEach(() => {
      vd = new VennDiagram(3);
    });

    it('should return correct set A', () => {
      const setA = vd.getA();
      expect(setA.getSet()).toEqual([1, 4, 6, 7]);
    });

    it('should return correct set B', () => {
      const setB = vd.getB();
      expect(setB.getSet()).toEqual([2, 4, 5, 7]);
    });

    it('should return correct omega set', () => {
      const omega = vd.getOmega();
      expect(omega.getSet()).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
    });
  });
});