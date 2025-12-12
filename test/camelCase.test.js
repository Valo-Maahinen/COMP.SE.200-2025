import camelCase from '../src/camelCase.js';
import { expect } from 'chai';

/*
These unit tests were created by Copilot.
It was prompted with "Please write unit tests using mocha and chai for the following js function:
<insert function here>"

Copliot gave the following note on filter.js and the unit tests reflect this:

Note: The current implementation initializes the reducer with ' ' (a single space).
That will produce a leading space when words(...) returns at least one word (e.g., "Foo Bar" → " fooBar").
The examples and conventional camelCase behavior expect no leading space.
The tests below assert the expected (space-free) outputs;
if any fail, consider changing the reducer’s initial value from ' ' to ''.
*/

describe("unitTests for camelCase by Copilot", () => {
	describe('basic behavior and examples', () => {
		it('converts "Foo Bar" to "fooBar"', () => {
			expect(camelCase('Foo Bar')).to.equal('fooBar')
		})

		it('converts "--foo-bar--" to "fooBar"', () => {
			expect(camelCase('--foo-bar--')).to.equal('fooBar')
		})

		it('converts "__FOO_BAR__" to "fooBar"', () => {
			expect(camelCase('__FOO_BAR__')).to.equal('fooBar')
		})
	})

	describe('apostrophes and quotes', () => {
		it('removes ASCII apostrophes and camel-cases words: "don\'t stop" -> "dontStop"', () => {
			expect(camelCase("don't stop")).to.equal('dontStop')
		})

		it('removes Unicode right single quote \\u2019: "can’t WAIT" -> "cantWait"', () => {
			expect(camelCase('can\u2019t WAIT')).to.equal('cantWait')
		})

		it('handles mixed apostrophes in multiple words', () => {
			expect(camelCase("FOO's BAR’s BAZ")).to.equal('foosBarsBaz')
		})
	})

	describe('numbers and punctuation', () => {
		it('collapses dot-separated numbers: "version 1.2.3" -> "version123"', () => {
			expect(camelCase('version 1.2.3')).to.equal('version123')
		})

		it('handles mixed separators: "api_v2--beta.release" -> "apiV2BetaRelease"', () => {
			expect(camelCase('api_v2--beta.release')).to.equal('apiV2BetaRelease')
		})

		it('handles leading/trailing/multiple delimiters', () => {
			expect(camelCase('---multiple__delims---here__')).to.equal('multipleDelimsHere')
		})
	})

	describe('casing behavior', () => {
		it('lowercases the first word and upper-firsts subsequent words', () => {
			expect(camelCase('mIxEd cAsE strING')).to.equal('mixedCaseString')
		})

		it('works with already camel-cased input (idempotent-like for common cases)', () => {
			expect(camelCase('fooBarBaz')).to.equal('fooBarBaz')
		})
	})

	describe('Unicode / diacritics', () => {
		it('handles words with accents: "mañana café" -> "mañanaCafé" (keeps letters, changes case)', () => {
			expect(camelCase('mañana café')).to.equal('mañanaCafé')
		})

		it('handles non-Latin characters (no removal, only case normalization where applicable)', () => {
			// Depending on words() implementation, this may split or keep together.
			// This test expects a sensible join: first lowercased, next upperFirst-ed.
			expect(camelCase('тест пример')).to.equal('тестПример')
		})
	})

	describe('edge cases', () => {
		it('empty string -> empty string', () => {
			expect(camelCase('')).to.equal('')
		})

		it('string with only delimiters -> empty string', () => {
			expect(camelCase('---___---')).to.equal('')
		})

		it('handles single word lowercasing', () => {
			expect(camelCase('SINGLE')).to.equal('single')
		})

		it('handles whitespace-only string -> empty string', () => {
			expect(camelCase('     ')).to.equal('')
		})
	})

	describe('non-string inputs via toString()', () => {
		it('undefined -> empty string (as per default param)', () => {
			expect(camelCase()).to.equal('')
		})

		it('null -> "null" -> "null"', () => {
			expect(camelCase(null)).to.equal('null')
		})

		it('numeric input -> "123" -> "123"', () => {
			expect(camelCase(123)).to.equal('123')
		})

		it('boolean true -> "true"', () => {
			expect(camelCase(true)).to.equal('true')
		})

		it('array -> "a,b" or similar, depending on toString(); ensure stable case behavior', () => {
			// If toString([ 'A', 'B' ]) => "A,B", words() likely splits to ["A", "B"].
			expect(camelCase(['A', 'B'])).to.equal('aB')
		})

		it('object -> "[object Object]" -> "objectObject"', () => {
			expect(camelCase({})).to.equal('objectObject')
		})
	})

	describe('regression: leading space issue', () => {
		it('should not have a leading space for typical inputs', () => {
			const out = camelCase('Foo Bar')
			expect(out[0]).to.not.equal(' ')
			expect(out).to.equal('fooBar')
		})
	})
})
