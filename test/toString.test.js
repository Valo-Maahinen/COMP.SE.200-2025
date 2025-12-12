import toString from '../src/toString.js';
import { expect } from 'chai';

describe("unitTests for toString", () => {
    it("should return empty string for null", () => {
        expect(toString(null)).to.equal('');
    });

    it("should return empty string for no input", () => {
        expect(toString()).to.equal('');
    });

    it("should return newline for newline", () => {
        expect(toString("\n")).to.equal("\n");
    });

    it("should return \"65\" for 65", () => {
        expect(toString(65)).to.equal("65");
    });

    it("should return \"1, 2, 3, 4\" for array [1,2,3,4]", () => {
        expect(toString([1, 2, 3, 4])).to.equal("1,2,3,4");
    });

    it("should return \"a,, 3\" for array [a, ,3]", () => {
        expect(toString(["a", , 3])).to.equal("a,,3");
    });

    it("should return \"1, 2, 3, 4\" for array [1, [2, 3], 3]", () => {
        expect(toString([1, [2, 3], 3])).to.equal("1,2,3,3");
    });

});