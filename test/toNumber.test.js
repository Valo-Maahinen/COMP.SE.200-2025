import toNumber from '../src/toNumber.js';
import { expect } from 'chai';

describe("unitTests for toNumber", () => {
    it("should handle no input", () => {
        expect(toNumber()).to.be.NaN;
    });

    it("should handle invalid string", () => {
        expect(toNumber("GabeCube")).to.be.NaN;
    });

    it("should handle valid string", () => {
        expect(toNumber("55")).to.equal(55);
    });

    it("should handle newline", () => {
        expect(toNumber("\n")).to.be.NaN;
    });

    it("should handle Number.MAX_VALUE", () => {
        expect(toNumber(Number.MAX_VALUE)).to.equal(Number.MAX_VALUE);
    });

    it("should handle Number.MIN_VALUE", () => {
        expect(toNumber(Number.MIN_VALUE)).to.equal(Number.MIN_VALUE);
    });

    it("should handle int", () => {
        expect(toNumber(165)).to.equal(165);
    });

    it("should handle float", () => {
        expect(toNumber(11.98)).to.equal(11.98);
    });

});