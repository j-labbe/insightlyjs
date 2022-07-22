import { ActivitySet, Activity } from './types/ActivitySet';

import * as ActivitySets from './ActivitySets';

// TODO: add ISO 8601 date format validation

class InsightlyJS {
    private readonly apiKey: string;
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**************************************************************************
     **************************************************************************
     * Activity Sets
     **************************************************************************
     *************************************************************************/

    /**
     * @param brief Only return the top level properties of the ActivitySet
     * @param skip Number of ActivitySets to skip
     * @param top Maximum number of ActivitySets to return
     * @param countTotal Return the total number of ActivitySets
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySets
     */
    public async getActivitySetList(brief?: boolean, skip?: number, top?: number, countTotal?: boolean): Promise<ActivitySet[]> {
        return await ActivitySets.getActivitySetList(this.apiKey, brief, skip, top, countTotal);
    }

    /**
     * @param id The ID of the ActivitySet
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySet
     */
    public async getActivitySet(id: number): Promise<ActivitySet> {
        return await ActivitySets.getActivitySet(this.apiKey, id);
    }


    /**************************************************************************
     **************************************************************************
     * Comments
     **************************************************************************
     *************************************************************************/

     
}

export default InsightlyJS;
