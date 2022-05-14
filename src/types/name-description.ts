import { Gender } from "./gender";
import { Name } from "./name";

export interface NameDescription {
    name: Name;
    gender: Gender;

    shorts?: string[];
    transliterations?: string[];

    variants: string[];


    count: { [source: string]: number };

    /**
     * from 0 to 1.
     */
    frequency: number;
}