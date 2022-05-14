import { Options } from "./types/options";
import names from './data/names.json';
import { normalize } from "./utils/normalize";
import { Name } from "./types/name";
import _ from "lodash";
import { NameDescription } from "./types/name-description";

export class NamesRegistry {

    public readonly descriptions: DeepReadonly<NameDescription[]>;
    public readonly namesToDescriptions: DeepReadonly<Map<Name, NameDescription>>;
    public readonly variants: DeepReadonly<string[]>;
    public readonly variantsToDescriptions: DeepReadonly<Map<string, NameDescription[]>>;

    constructor(
        public readonly options: DeepReadonly<Options>,
    ) {
        const totalCount = _(names).values().sumBy(name => name.count[options.frequenciesSource]);
        this.descriptions = _.toPairs(names)
            .map(([name, info]) => ({
                ...info,
                name,
                frequency: info.count[options.frequenciesSource] / totalCount,
                variants: [...info.variants.map(variant => normalize(variant)), normalize(name)],
            } as NameDescription));

        this.namesToDescriptions = new Map(this.descriptions.map(description => [description.name, description]));

        this.variants = _(this.descriptions)
            .flatMap(description => description.variants)
            .uniq()
            .value();

        this.variantsToDescriptions = new Map(
            this.variants.map(variant => [
                variant,
                this.descriptions.filter(description => description.variants.includes(variant)),
            ] as const),
        );
    }

}