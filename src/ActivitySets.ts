import InsightlyHTTPRequest from './utils/http';
import { ActivitySet } from './types/ActivitySet';

async function getActivitySetList(apiKey: string, apiUrl: string, brief?: boolean, skip?: number, top?: number, countTotal?: boolean): Promise<ActivitySet[]> {
    brief = !!brief;

    // skip and top will be removed from the url if falsy
    const skipVal = !!skip;
    const topVal = !!top;

    countTotal = !!countTotal

    const request = new InsightlyHTTPRequest(apiKey, apiUrl);

    return await request.get(`/ActivitySets?brief=${brief}${skipVal ? `&skip=${skip}` : ``}${topVal ? `&top=${top}` : ``}&countTotal=${countTotal}`);
}

async function getActivitySet(apiKey: string, apiUrl: string, id: number): Promise<ActivitySet> {
    const request = new InsightlyHTTPRequest(apiKey, apiUrl);

    return await request.get(`/ActivitySets/${id}`);
}

export { getActivitySet, getActivitySetList };