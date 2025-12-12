import filter from '../src/filter.js';
import { expect } from 'chai';

/*
These unit tests were created with Copilot.
Copliot gave the following note on filter.js and the unit tests reflect this:

⚠️ Note on behavior
The implementation initializes result as [[]] and only overwrites that first element when at least one item matches. Therefore:

If no elements match (including when the array is empty or null/undefined), it returns [[]].
If some elements match, it returns an array of those matched elements (e.g., [obj1, obj2]).
*/

describe("unitTests for filter by Copilot", () => {
    it('filters elements that satisfy the predicate (basic case)', () => {
        const users = [
            { user: 'barney', active: true },
            { user: 'fred', active: false }
        ]

        const result = filter(users, ({ active }) => active)

        // Should return only the truthy items
        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(1)
        expect(result[0]).to.deep.equal({ user: 'barney', active: true })
    })

    it('returns [ [] ] when no elements match', () => {
        const arr = [1, 2, 3]
        const result = filter(arr, (v) => v > 10)

        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(1)
        expect(result[0]).to.deep.equal([]) // per current implementation
    })

    it('returns [ [] ] for an empty array', () => {
        const arr = []
        const result = filter(arr, () => true)

        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(1)
        expect(result[0]).to.deep.equal([])
    })

    it('returns [ [] ] when array is null', () => {
        const result = filter(null, () => true)

        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(1)
        expect(result[0]).to.deep.equal([])
    })

    it('returns [ [] ] when array is undefined', () => {
        const result = filter(undefined, () => true)

        expect(result).to.be.an('array')
        expect(result).to.have.lengthOf(1)
        expect(result[0]).to.deep.equal([])
    })

    it('invokes predicate with (value, index, array)', () => {
        const arr = ['a', 'b', 'c']
        const calls = []

        const result = filter(arr, (value, index, array) => {
            calls.push({ value, index, arrayRefSame: array === arr })
            return value !== 'b'
        })

        // Check predicate call structure
        expect(calls).to.have.lengthOf(3)
        expect(calls[0]).to.deep.include({ value: 'a', index: 0, arrayRefSame: true })
        expect(calls[1]).to.deep.include({ value: 'b', index: 1, arrayRefSame: true })
        expect(calls[2]).to.deep.include({ value: 'c', index: 2, arrayRefSame: true })

        // Only 'a' and 'c' should be included
        expect(result).to.have.lengthOf(2)
        expect(result[0]).to.equal('a')
        expect(result[1]).to.equal('c')
    })

    it('does not mutate the original array', () => {
        const arr = [1, 2, 3]
        const arrCopy = arr.slice()

        const result = filter(arr, (v) => v % 2 === 1)

        // Original array retained
        expect(arr).to.deep.equal(arrCopy)
        // Result is a new array (different reference)
        expect(result).to.not.equal(arr)
    })

    it('handles sparse arrays (holes) by passing undefined to predicate', () => {
        // Create an array with holes: [empty, 1, empty, 2]
        const arr = []
        arr[1] = 1
        arr[3] = 2

        // Predicate excludes undefined, keeps numbers
        const result = filter(arr, (value) => value !== undefined)

        expect(result).to.deep.equal([1, 2])
    })

    it('supports index-based filtering logic correctly', () => {
        const arr = ['x', 'y', 'z', 'w']
        const result = filter(arr, (_value, index) => index % 2 === 0) // even indices

        expect(result).to.deep.equal(['x', 'z'])
    })

    it('returns a new array even when matches exist', () => {
        const arr = [10, 20, 30]
        const result = filter(arr, (v) => v >= 20)

        expect(result).to.be.an('array')
        expect(result).to.not.equal(arr) // new reference
        expect(result).to.deep.equal([20, 30])
    })
})
