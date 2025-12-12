import words from '../src/words.js';
import { expect } from 'chai';

/*
These unit tests were created by Copilot.
It was prompted with "Please write unit tests using mocha and chai for the following js function:
<insert function here>"
*/

describe('unitTests for words by Copilot', () => {
    describe('ASCII and punctuation', () => {
        it('splits ASCII string with punctuation (example from docs)', () => {
            const input = 'fred, barney, &amp; pebbles'
            const result = words(input)
            expect(result).to.deep.equal(['fred', 'barney', 'pebbles'])
        })

        it('returns [] for empty string', () => {
            expect(words('')).to.deep.equal([])
        })

        it('returns [] for whitespace-only string', () => {
            expect(words('    \t\n  ')).to.deep.equal([])
        })

        it('splits words and strips punctuation marks', () => {
            const input = 'Hello! This—is_a-test, okay?'
            // asciiWords will grab contiguous "word-like" ASCII sequences
            // Note: the em-dash and underscore behavior varies: underscore is ASCII word char here,
            // em-dash splits. The regex groups letters/digits.
            const result = words(input)
            // Depending on unicode/ASCII path, "This—is_a" may be split as ['This', 'is_a'] or ['This', 'is', 'a'].
            // Since em-dash is not ASCII word, it splits. Underscore is allowed by reAsciiWord.
            expect(result).to.deep.equal(['Hello', 'This', 'is_a', 'test', 'okay'])
        })
    })

    describe('Pattern override', () => {
        it('honors a custom pattern (example from docs)', () => {
            const input = 'fred, barney, &amp; pebbles'
            const result = words(input, /[^, ]+/g)
            expect(result).to.deep.equal(['fred', 'barney', '&amp;', 'pebbles'])
        })

        it('returns [] if pattern matches nothing', () => {
            const input = 'abc def'
            const result = words(input, /#/g)
            expect(result).to.deep.equal([])
        })
    })

    describe('CamelCase and alphanumeric transitions (unicodeWords path)', () => {
        it('splits camelCase based on transitions', () => {
            const input = 'fooBar bazQux'
            const result = words(input)
            // hasUnicodeWord detects [a-z][A-Z] and should route to unicodeWords, which splits camelCase
            expect(result).to.deep.equal(['foo', 'Bar', 'baz', 'Qux'])
        })

        it('splits around letter↔digit boundaries', () => {
            const input = 'Order66 isComingSoon2U'
            const result = words(input)
            // unicodeWords typically splits on changes: Order 66 is Coming Soon 2 U
            expect(result).to.deep.equal(['Order', '66', 'is', 'Coming', 'Soon', '2', 'U'])
        })
    })

    describe('Unicode scripts and emoji', () => {
        it('handles accented Latin correctly', () => {
            const input = 'mañana café'
            const result = words(input)
            expect(result).to.deep.equal(['mañana', 'café'])
        })

        it('handles Cyrillic', () => {
            const input = 'привет мир'
            const result = words(input)
            expect(result).to.deep.equal(['привет', 'мир'])
        })

        it('extracts emoji as tokens', () => {
            const input = 'rock 🤘 star ✨'
            const result = words(input)
            expect(result).to.deep.equal(['rock', '🤘', 'star', '✨'])
        })

        it('handles multi-emoji sequences', () => {
            const input = '🍎🍌🍇'
            const result = words(input)
            expect(result).to.deep.equal(['🍎', '🍌', '🍇'])
        })
    })

    describe('Apostrophes and quotes', () => {
        it('splits words containing apostrophes into components', () => {
            const input = "don't stop believin'"
            const result = words(input)
            // Typical behavior splits "don't" -> ['don', 't']; "believin'" -> ['believin']
            // Trailing apostrophe is dropped.
            expect(result).to.deep.equal(['don', 't', 'stop', 'believin'])
        })

        it('handles smart quotes', () => {
            const input = '“smart” ‘quotes’ test'
            const result = words(input)
            expect(result).to.deep.equal(['smart', 'quotes', 'test'])
        })
    })

    describe('Edge cases / robustness', () => {
        it('does not throw for long strings', () => {
            const input = 'a'.repeat(10_000)
            const fn = () => words(input)
            expect(fn).not.to.throw()
            expect(words(input)).to.deep.equal(['a'.repeat(10_000)])
        })

        // NOTE: Your implementation will throw if string is undefined and pattern is not provided,
        // because asciiWords(undefined) => undefined.match(...) throws.
        // If you later add a default parameter in the implementation (string=''),
        // you can enable this test to ensure it returns [] instead of throwing.
        it('throws on undefined input with current implementation (documented behavior)', () => {
            const fn = () => words(undefined)
            expect(fn).to.throw(TypeError)
        })
    })
})
