const { describe, it } = require('node:test');
const assert = require('node:assert').strict;

describe('2 + 2', () => {
    it('equals 4', () => {
      assert.strictEqual(4, 2 + 2);
    });
  }); 