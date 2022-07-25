import { ActivitySet, Activity } from './types/ActivitySet';
import runtimeIsCompatible from './utils/runtimeIsCompatible';
import * as ActivitySets from './ActivitySets';

// TODO: add ISO 8601 date format validation

class InsightlyJS {
    private readonly apiKey: string;
    private readonly apiUrl: string;

    constructor(options: { apiKey: string; apiHost: string }) {
        this.apiKey = options.apiKey;
        this.apiUrl = options.apiHost;
        
        if (!runtimeIsCompatible()) {
            throw new Error('InsightlyJS is not compatible with this runtime. Please ugrade your browser or Node version (18+).');
        }

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
        return await ActivitySets.getActivitySetList(this.apiKey, this.apiUrl, brief, skip, top, countTotal);
    }

    /**
     * @param id The ID of the ActivitySet
     * @see https://api.insightly.com/v3.1/Help#!/ActivitySets/GetActivitySet
     */
    public async getActivitySet(id: number): Promise<ActivitySet> {
        return await ActivitySets.getActivitySet(this.apiKey, this.apiUrl, id);
    }

    /**************************************************************************
     **************************************************************************
     * Comments
     **************************************************************************
     *************************************************************************/
}

export default InsightlyJS;
