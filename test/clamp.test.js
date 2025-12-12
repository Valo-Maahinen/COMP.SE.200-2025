import clamp from '../src/clamp.js';
import { expect } from 'chai';

describe("unitTests for clamp from test plan", () => {
	it("should return input value when it is within the range", () => {
		expect(clamp(10, 5, 15)).to.equal(10);
	});

	it("should return min value when the input value is below range", () => {
		expect(clamp(10, 11, 100)).to.equal(11);
	});

	it("should return upper limit when input is more than upper limit", () => {
		expect(clamp(15, 10, 0)).to.equal(0);
	});

	it("should handle int input and float lower limit", () => {
		expect(clamp(10, 9.9, 20)).to.equal(10);
	});

	it("should handle float lower limit and input and int upper limit", () => {
		expect(clamp(15.2, 15.1, 20)).to.equal(15.2);
	});

	it("should return NaN for invalid number", () => {
		expect(clamp("Chicken", 0, 20)).to.be.NaN;
	});

	it("should return input for input under upper with invalid lower limit", () => {
		expect(clamp(5, "Food", 20)).to.equal(5);
	});

	it("should return lower limit for input over lower and invalid upper limit", () => {
		expect(clamp(10, 0, "Sauce")).to.equal(0);
	});

	it("should return input for all inputs being equal", () => {
		expect(clamp(5, 5, 5)).to.equal(5);
	});

});