import ceil from '../src/ceil.js';
import { expect } from 'chai';

describe("unitTests for ceil", () => {

	it("default precision (0 decimals) should return the same integer when given an integer", () => {
		expect(ceil(15)).to.equal(15);
	});

	it("default precision (0 decimals) should return the next integer when given a float", () => {
		expect(ceil(4.05)).to.equal(5);
	});

	it("negative precision should round integers up to the nearest tens, hundreds, etc.", () => {
		expect(ceil(15, -1)).to.equal(20);
	});

	it("negative precision should round floats up to the nearest tens, hundreds, etc.", () => {
		expect(ceil(14.05, -1)).to.equal(20);
	});

	it("positive precision should extent decimals when given an integer", () => {
		expect(ceil(15, 2)).to.equal(15.00);
	});

	it("positive precision should round floats up to the given decimal places", () => {
		expect(ceil(4.05, 1)).to.equal(4.1);
	});

	it("negative precision should extend integers with zeros", () => {
		expect(ceil(15, -3)).to.equal(1000);
	});

	it("positive precision should handle floats with more decimal places than the precision", () => {
		expect(ceil(4.00001, 2)).to.equal(4.01);
	});

	it("invalid input number should return NaN", () => {
		expect(ceil("Chicken")).to.be.NaN;
	});

	it("invalid input precision should return NaN", () => {
		expect(ceil(15, "Food")).to.be.NaN;
	});

})