import clamp from '../src/clamp.js';
import { expect } from 'chai';

describe("unitTests for clamp", () => {
	it("should return the input value when it is within the range", () => {
		expect(clamp(10, 5, 15)).to.equal(10);
	});

	it("should return the min value when the input value is below the range", () => {
		expect(clamp(10, 11, 100)).to.equal(11);
	});

});