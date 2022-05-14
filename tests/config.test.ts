import { NamePredictor } from '../src/index';

test('predicts names with distance 0', () => {
    const nc = new NamePredictor({useLevenshtein: false});
    expect(nc.predictName('Сирожа')).toBeUndefined();
    expect(nc.predictName('Диниска')).toBeUndefined();
    expect(nc.predictName('Котя', 'female')).toBeUndefined();
    expect(nc.predictName('Костя')).toBe('Константин');
    expect(nc.predictName('Валя', 'male')).toBe('Валентин');
    expect(nc.predictName('Саша', 'female')).toBe('Александра');
});

test('predicts names with distance 1', () => {
    const nc = new NamePredictor({minAcceptibleDistance: 1});
    expect(nc.predictName('Сирожа')).toBeUndefined();
    expect(nc.predictName('Диниска')).toBe('Денис');
    expect(nc.predictName('Котя', 'female')).toBe('Екатерина');
    expect(nc.predictName('Костя')).toBe('Константин');
    expect(nc.predictName('Валя', 'male')).toBe('Валентин');
    expect(nc.predictName('Саша', 'female')).toBe('Александра');
});

test('predicts names with distance 2', () => {
    const nc = new NamePredictor({minAcceptibleDistance: 2});
    expect(nc.predictName('Сирожа')).toBe('Сергей');
    expect(nc.predictName('Диниска')).toBe('Денис');
    expect(nc.predictName('Котя', 'female')).toBe('Екатерина');
    expect(nc.predictName('Костя')).toBe('Константин');
    expect(nc.predictName('Валя', 'male')).toBe('Валентин');
    expect(nc.predictName('Саша', 'female')).toBe('Александра');
});

