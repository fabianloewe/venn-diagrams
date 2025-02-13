import Set from '../main/Set';

describe('Set', () => {
  describe('constructor', () => {
    it('should create empty set when no arguments provided', () => {
      const set = new Set();
      expect(set.getSet()).toEqual([]);
    });

    it('should create set with provided numbers', () => {
      const set = new Set([1, 2, 3]);
      expect(set.getSet()).toEqual([1, 2, 3]);
    });
  });

  describe('contains', () => {
    it('should return true when set contains all elements of another set', () => {
      const set1 = new Set([1, 2, 3, 4]);
      const set2 = new Set([2, 3]);
      expect(set1.contains(set2)).toBe(true);
    });

    it('should return false when set does not contain all elements', () => {
      const set1 = new Set([1, 2, 3]);
      const set2 = new Set([2, 3, 4]);
      expect(set1.contains(set2)).toBe(false);
    });
  });

  describe('intersect', () => {
    it('should correctly intersect two sets', () => {
      const set1 = new Set([1, 2, 3, 4]);
      const set2 = new Set([3, 4, 5, 6]);
      set1.intersect(set2);
      expect(set1.getSet()).toEqual([3, 4]);
    });

    it('should return empty set when no common elements', () => {
      const set1 = new Set([1, 2]);
      const set2 = new Set([3, 4]);
      set1.intersect(set2);
      expect(set1.getSet()).toEqual([]);
    });
  });

  describe('merge', () => {
    it('should correctly merge two sets', () => {
      const set1 = new Set([1, 2]);
      const set2 = new Set([2, 3]);
      set1.merge(set2);
      expect(set1.getSet()).toEqual([1, 2, 3]);
    });

    it('should handle empty sets correctly', () => {
      const set1 = new Set([]);
      const set2 = new Set([1, 2]);
      set1.merge(set2);
      expect(set1.getSet()).toEqual([1, 2]);
    });
  });

  describe('complement', () => {
    it('should correctly compute complement of a set', () => {
      const omega = new Set([1, 2, 3, 4]);
      const set = new Set([2, 3]);
      set.complement(omega);
      expect(set.getSet()).toEqual([1, 4]);
    });
  });
});