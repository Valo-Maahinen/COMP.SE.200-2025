import slice from '../src/slice.js';
import { expect } from 'chai';

describe("unitTests for slice", () => {
    it("should return [] for no input", () => {
        expect(slice()).to.deep.equal([]);
    });
    it("should return from start to len(input) for no end given", () => {
        expect(slice([1, 2, 3, 4], 2)).to.deep.equal([3, 4]);
    });

    it("should return [3] for (array, 2, 3)", () => {
        expect(slice([1, 2, 3, 4], 2, 3)).to.deep.equal([3]);
    });

    it("should return [] for end < start", () => {
        expect(slice([1, 2, 3, 4], 3, 2)).to.deep.equal([]);
    });

    it("should return [] for end = start", () => {
        expect(slice([1, 2, 3, 4], 1, 1)).to.deep.equal([]);
    });

    it("should handle strings", () => {
        expect(slice("red leather strings", 4)).to.deep.equal("leather strings".split(''));
    });

});