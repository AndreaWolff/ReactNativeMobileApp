import { formatHeight, formatWeight } from '@/utils/PokemonFormat';

describe('formatHeight', () => {
  it('converts decimetres to metres with one decimal place', () => {
    expect(formatHeight(6)).toBe('0.6 m');
    expect(formatHeight(10)).toBe('1.0 m');
    expect(formatHeight(17)).toBe('1.7 m');
    expect(formatHeight(88)).toBe('8.8 m');
  });
});

describe('formatWeight', () => {
  it('converts hectograms to kilograms with one decimal place', () => {
    expect(formatWeight(85)).toBe('8.5 kg');
    expect(formatWeight(100)).toBe('10.0 kg');
    expect(formatWeight(905)).toBe('90.5 kg');
  });
});