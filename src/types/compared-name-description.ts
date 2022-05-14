import { Gender } from "./gender";
import { NameDescription } from "./name-description";

/**
 * Represents result of comparison the name variants with token in different forms.
 */
export interface ComparedNameDescription extends NameDescription {
    
    /**
     * The closes distance from name's variants to compared token.
     */
    distance: number;
}