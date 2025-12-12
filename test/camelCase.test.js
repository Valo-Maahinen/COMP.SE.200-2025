import camelCase from '../src/camelCase.js';
import { expect } from 'chai';

describe("unitTests for add by Copilot", () => {

	  it('should convert string to camelCase', () => {
		expect(camelCase('Hello World')).to.equal('helloWorld');
		expect(camelCase('foo_bar-baz')).to.equal('fooBarBaz');
	  });

	  it('should handle empty string', () => {
		expect(camelCase('')).to.equal('');
	  });

	  it('should handle single word', () => {
		expect(camelCase('hello')).to.equal('hello');
		expect(camelCase('WORLD')).to.equal('world');
	  });
	  
});