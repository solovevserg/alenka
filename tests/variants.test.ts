import { NamePredictor } from '../src/index';
import names from '../src/data/names.json';
import _ from 'lodash';

const descriptions = _(names)
    .toPairs()
    .map(([name, description]) => ({ name, ...description }))
    .value();

const variants = _(descriptions)
    .flatMap(description => description.variants.map(variant => [variant, description.name] as const))
    .value();

test('predicts name for all known variants', () => {
    const nc = new NamePredictor({minAcceptibleDistance: 0});

    for (const [variant, name] of variants) {
        expect(nc.predictName(variant)).not.toBeUndefined();
    }
});
