import _ from 'lodash';

/**
 * Prepares text to analyse and comparison.
 * - transforms to lowercase
 * - removes all punctuation
 * - replaces `ё` for `е`
 * - replaces any space symbol sequence with a single space
 * @param text text to normalize
 * @returns normalized text
 */
export function normalize(text: string) {
    return text
        .replace(/ё/ig, "е")
        .replace(/4/ig, "ч")
        .replace(/0/ig, "о")
        .replace(/\$/ig, "s")
        .replace(/\@/ig, "а")
        .replace(/[^\w\s\'а-я]|_/ig, "")
        .replace(/\s+/g, " ")
        .toLowerCase();
}
