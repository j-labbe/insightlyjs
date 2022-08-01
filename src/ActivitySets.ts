import InsightlyHTTPRequest from './utils/http';
import { ActivitySet } from './types';
import buildUrlParams from './utils/buildUrlParams';

async function getActivitySetList(
    apiKey: string,
    apiUrl: string,
    brief?: boolean,
    skip?: number,
    top?: number,
    countTotal?: boolean,
): Promise<ActivitySet[]> {
    countTotal = !!countTotal;
    const request = new InsightlyHTTPRequest(apiKey, apiUrl, countTotal);

    const urlParams = buildUrlParams({ brief: !!brief }, { skip }, { top }, { count_total: countTotal });

    return await request.get(`/ActivitySets${urlParams}`);
}

async function getActivitySet(apiKey: string, apiUrl: string, id: number): Promise<ActivitySet> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);

    return await request.get(`/ActivitySets/${id}`);
}

export { getActivitySet, getActivitySetList };
