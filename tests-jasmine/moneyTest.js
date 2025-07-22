import { formatCurreny } from '../scripts/utils/money.js';

describe('test suite : formatCurreny', () => {
  it('converts cents into dollars', () => {
    expect(formatCurreny(2095)).toEqual('20.95');
  });

  it('works with zero', () => {
    expect(formatCurreny(0)).toEqual('0.00');
  });

  it('round up to nearest cent', () => {
    expect(formatCurreny(2000.5)).toEqual('20.01');
  })
});
