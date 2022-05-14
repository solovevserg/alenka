import { NamePredictor } from '../src/index';

test('predicts with known gender', () => {
    const nc = new NamePredictor();
    expect(nc.predictName('Сашка', 'male')).toBe('Александр');
    expect(nc.predictName('Sashka', 'male')).toBe('Александр');
    expect(nc.predictName('$ashka', 'male')).toBe('Александр');
    expect(nc.predictName('Алёнка', 'female')).toBe('Алена');
    expect(nc.predictName('Аленка', 'female')).toBe('Алена');
    expect(nc.predictName('Аленушка', 'female')).toBe('Алена');
    expect(nc.predictName('Варька', 'female')).toBe('Варвара');
    expect(nc.predictName('Eugen', 'male')).toBe('Евгений');
    expect(nc.predictName('Evgen', 'male')).toBe('Евгений');
    expect(nc.predictName('Жека', 'male')).toBe('Евгений');
});

test('predicts with unknown gender', () => {
    const nc = new NamePredictor();
    expect(nc.predictName('Сашка')).toBe('Александр');
    expect(nc.predictName('Sashka')).toBe('Александр');
    expect(nc.predictName('$ashka')).toBe('Александр');
    expect(nc.predictName('Алёнка')).toBe('Алена');
    expect(nc.predictName('Аленка')).toBe('Алена');
    expect(nc.predictName('Аленушка')).toBe('Алена');
    expect(nc.predictName('Варька')).toBe('Варвара');
    expect(nc.predictName('Eugen')).toBe('Евгений');
    expect(nc.predictName('Evgen')).toBe('Евгений');
    expect(nc.predictName('Жека')).toBe('Евгений');
});