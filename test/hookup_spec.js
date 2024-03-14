const { describe, it } = require('node:test');
const assert = require('node:assert').strict;

describe('2 + 2', () => {
    it('equals 4', () => {
      assert.strictEqual(4, 2 + 2);
    });
}); 

describe('2 + 0', () => {
    it('equals 2', () => {
      assert.strictEqual(2, 2 + 0);
    });
})