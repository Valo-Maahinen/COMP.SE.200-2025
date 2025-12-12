import isEmpty from '../src/isEmpty.js';
import { expect } from 'chai';

describe("unitTests for isEmpty", () => {
    it("should return true for null", () => {
        expect(isEmpty(null)).to.be.true;
    });

    it("should return true for number", () => {
        expect(isEmpty(10)).to.be.true;
    });

    it("should return true for bool", () => {
        expect(isEmpty(false)).to.be.true;
    });

    it("should return true for set of size 0", () => {
        const emptySet = new Set();
        expect(isEmpty(emptySet)).to.be.true;
    });

    it("should return false for string", () => {
        expect(isEmpty("a string")).to.be.false;
    });

    it("should return false for set of size 2", () => {
        const twoSet = new Set(["a", "b"]);
        expect(isEmpty(twoSet)).to.be.false;
    });

    it("should return false for array of size 5", () => {
        const fiveMap = [1, 10, 100, 1000, 10000];
        expect(isEmpty(fiveMap)).to.be.false;
    });
    
});