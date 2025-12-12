import add from '../src/add.js';
import { expect } from 'chai';

describe("unitTests for add by Copilot", () => {

	  it('should add two numbers correctly', () => {
		expect(add(2, 3)).to.equal(5);
	  });

	  it('should handle negative numbers', () => {
		expect(add(-2, -3)).to.equal(-5);
	  });

	  it('should handle zero', () => {
		expect(add(0, 5)).to.equal(5);
		expect(add(5, 0)).to.equal(5);
	  });
	  
});