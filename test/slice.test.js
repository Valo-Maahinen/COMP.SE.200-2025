import slice from '../src/slice.js';
import { expect } from 'chai';

describe("unitTests for slice", () => {
    it("should handle no input", () => {
        expect(slice()).to.deep.equal([]);
    });
    it("should handle no end given", () => {
        expect(slice([1, 2, 3, 4], 2)).to.deep.equal([3, 4]);
    });

    it("should handle (array, 2, 3)", () => {
        expect(slice([1, 2, 3, 4], 2, 3)).to.deep.equal([3]);
    });

    it("should handle end < start", () => {
        expect(slice([1, 2, 3, 4], 3, 2)).to.deep.equal([]);
    });

    it("should handle end = start", () => {
        expect(slice([1, 2, 3, 4], 1, 1)).to.deep.equal([]);
    });

    it("should handle strings", () => {
        expect(slice("red leather strings", 4)).to.deep.equal("leather strings".split(''));
    });

});