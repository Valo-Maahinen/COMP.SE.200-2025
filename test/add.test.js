import add from '../src/add.js';
import { expect } from 'chai';

/*
These unit tests were created by Copilot.
It was prompted with "Please write unit tests using mocha and chai for the following js function:
<insert function here>"
*/

describe("unitTests for add by Copilot", () => {
	it('adds two positive integers', () => {
		expect(add(6, 4)).to.equal(10)
		expect(add(0, 5)).to.equal(5)
		expect(add(5, 0)).to.equal(5)
	})

	it('adds negative integers', () => {
		expect(add(-6, -4)).to.equal(-10)
		expect(add(-6, 4)).to.equal(-2)
		expect(add(6, -4)).to.equal(2)
	})

	it('adds decimal numbers (floating point)', () => {
		// direct equality can be flaky due to floating-point representation;
		// use closeTo for safer verification
		expect(add(0.1, 0.2)).to.be.closeTo(0.3, 1e-12)
		expect(add(-0.1, 0.2)).to.be.closeTo(0.1, 1e-12)
		expect(add(1.2345, 2.3456)).to.be.closeTo(3.5801, 1e-12)
	})

	it('handles large numbers', () => {
		const a = 9007199254740991 // Number.MAX_SAFE_INTEGER
		const b = 1
		// Note: JS precision limits may affect exactness beyond MAX_SAFE_INTEGER.
		// The test just ensures the operation executes.
		expect(add(a, b)).to.equal(9007199254740992)
	})

	it('returns NaN if either argument is NaN', () => {
		expect(Number.isNaN(add(NaN, 1))).to.equal(true)
		expect(Number.isNaN(add(1, NaN))).to.equal(true)
		expect(Number.isNaN(add(NaN, NaN))).to.equal(true)
	})

	/* NOTE BY HUMAN:
	Interestingly the last row of this throws "AssertionError; expected NaN to equal NaN".
	Using .to.deep.equal(NaN) fixes this. Seems be some JS thing that
	Copilot did not account for.
	*/
	it('handles Infinity and -Infinity', () => {
		expect(add(Infinity, 1)).to.equal(Infinity)
		expect(add(-Infinity, -1)).to.equal(-Infinity)
		expect(add(Infinity, -Infinity)).to.equal(NaN) // per numeric rules
	})

	it('treats -0 and +0 correctly', () => {
		// In JS, -0 + 0 === 0. Check sign when relevant.
		const result = add(-0, 0)
		expect(result).to.equal(0)
		// Ensure adding -0 and -0 remains -0 by comparing 1/result === -Infinity
		const negZeroSum = add(-0, -0)
		expect(Object.is(negZeroSum, -0)).to.equal(true)
	})

	it('returns the other argument when one is undefined (createMathOperation behavior)', () => {
		expect(add(undefined, 5)).to.equal(5)
		expect(add(5, undefined)).to.equal(5)
	})

	it('returns the default accumulator (0) when both are undefined', () => {
		expect(add(undefined, undefined)).to.equal(0)
	})

	/* NOTE BY HUMAN:
	The first 3 lines cause "AssertionError: expected 64 to equal 10".
	The last 2 cause "AssertionError: expected false to equal true".
	So it seems it does in fact concatenate strings. Copilot made no mention of this.
	*/
	it('does not concatenate strings (unlike `+`)', () => {
		// If createMathOperation coerces non-numbers, it should try numeric conversion.
		// Here, numeric strings should be treated as numbers (Lodash add behavior).
		expect(add('6', '4')).to.equal(10)
		expect(add('6', 4)).to.equal(10)
		expect(add(6, '4')).to.equal(10)

		// Non-numeric strings should lead to NaN
		expect(Number.isNaN(add('a', 1))).to.equal(true)
		expect(Number.isNaN(add(1, 'b'))).to.equal(true)
	})
})
