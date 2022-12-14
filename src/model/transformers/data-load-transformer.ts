import { DB } from '../db/db';

/**
 * Function that loads the data from the storage and transformes it to a DB object
 */
export type dataLoadTransformer = (jsonObject: JSON) => DB | null;
