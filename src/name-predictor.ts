import _ from 'lodash';
import cyrillicToTranslit from 'cyrillic-to-translit-js';
import { Options } from './types/options';
import { normalize } from './utils/normalize';
import { distance as levenshteinDistance } from 'fastest-levenshtein';
import { defaulOptions } from './default-options';
import { NamesRegistry } from './name-registry';
import { Gender } from './types/gender';

export class NamePredictor {

    /**
     * Stores options of `NamePredictor` instance. 
     */
    public readonly options: DeepReadonly<Options>;

    private readonly registry: NamesRegistry;

    /**
     * Builds an instance of comparator matcher with provided options.
     * @param options configuration of `NamePredictor`.
     */
    constructor(
        options: Partial<Options> = {},
    ) {
        this.options = { ...defaulOptions, ...options };
        this.registry = new NamesRegistry(this.options);
    }

    /**
     * Predicts an array of possible names for a variant 
     * @param token string to restore full form from
     * @param gender known gender. Provide it to resolve gender match conflicts in cases like "Саша"
     * wich matches both "Александр" (male) and "Александра" (female). 
     * @returns array of predicted names' descriptions with their frequencies
     * or empty array if no names matches the token.
     */
    predictAll(token: string, gender?: Gender) {
        const normalized = normalize(token);
        const transliterated = cyrillicToTranslit().reverse(normalized);
        const tokenForms = [normalized, transliterated];

        const distance = this.options.useLevenshtein
            ? levenshteinDistance
            : (x: string, y: string) => x === y ? 0 : Infinity;

        let variantsDistances = this.registry.variants.map(variant => [
            variant,
            _(tokenForms).map(token => distance(variant, token)).min() ?? Infinity,
        ] as const);

        let possibleNames = _(variantsDistances)
            .filter(([, distance]) => distance <= this.options.minAcceptibleDistance)
            .flatMap(([variant, distance]) =>
                this.registry.variantsToDescriptions.get(variant)!
                    .map(description => ({ ...description, distance }) as const),
            )
            .orderBy([
                ({ distance }) => distance,
                ({ frequency }) => -frequency,
            ])
            .value();

        if (gender) {
            possibleNames = possibleNames.filter(description => description.gender === gender);
        }

        return possibleNames;
    }

    /**
     * Same as `predictAll`, but returns the only one most possible predicted name.
     * @param token any string to restore full form 
     * @param gender known gender. Provide it to resolve gender match conflicts in cases like "Саша"
     * wich matches both "Александр" (male) and "Александра" (female). 
     * @returns the closest and most frequent predicted name's description
     * or undefined if no names matches the variant.
     */
    predict(token: string, gender?: Gender, returnDefault?: boolean) {
        const possibleNames = this.predictAll(token, gender);
        return possibleNames.length ? _.first(possibleNames) : undefined;
    }
    
    /**
     * Alias for `predict(...params)?.name`.
     * @param token any string to restore full form 
     * @param gender known gender. Provide it to resolve gender match conflicts in cases like "Саша"
     * wich matches both "Александр" (male) and "Александра" (female). 
     * @param returnDefault provide true to get back original token if no names matched.
     * @returns matched name string, else `undefined` or original token if `returnDefault` is set to true.
     */
    predictName(token: string, gender?: Gender, returnDefault?: true) {
        return this.predict(token, gender)?.name ?? (returnDefault && token);
    }

    /**
     * Predicts gender for any string token based on predicted name for the token.
     * @param token any string to predict gender 
     * @returns predicted gender or `undefined` if no names matched the token.
     */
    predictGender(token: string) {
        return this.predict(token)?.gender;
    }
}
