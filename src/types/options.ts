/**
 * Defines options for the algorithm.
 */
export interface Options {
    
    /**
     * Defines sample from which name frequencies are extracted.
     * `vk` refers to a large random sample from a russian social network. 
     * `bmstu` refers to an anonimized sample based on lists of students at Bauman Moscow State Technical University. 
     * @default "vk"
     */
    frequenciesSource: 'vk' | 'bmstu';
    
    /**
     * Handling "ё" letter in input strings. `ignore` policy replaces all "ё" with "е" preserving original case.
     * @default "ignore"
     */
    handlingYo: 'ignore';
    
    /**
     * Handling letters in defferent cases. `ignore` policy ignores case difference while comparing input strings with dataset values.
     * @default "ignore"
     */
    handlingCase: 'ignore';

    /**
     * Inclusive minimum distance. Words clother or exact at the distance treats similar.
     * @default 2
     */
    minAcceptibleDistance: number;
    
    /**
     * If set to `true` uses Levenshtein distance with treshold for comparison. Else uses default exact string comparison.
     * @default true
     */
    useLevenshtein: boolean;
    
}