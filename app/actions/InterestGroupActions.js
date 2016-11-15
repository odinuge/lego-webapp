import { arrayOf } from 'normalizr';
import { interestGroupSchema } from 'app/reducers';
import callAPI from 'app/actions/callAPI';
import { InterestGroup } from './ActionTypes';

/* CallAPI lager en HTTP-melding og sender den av gårde */

export function fetchInterestGroup(interestGroupId) {
  return callAPI({
    types: InterestGroup.FETCH,
    endpoint: `/interest-groups/${interestGroupId}/`,
    schema: interestGroupSchema,
    meta: {
      errorMessage: 'Fetching interestGroup failed'
    }
  });
}

export function fetchAll() {
  return callAPI({
    types: InterestGroup.FETCH_ALL,
    endpoint: '/interest-groups/',
    schema: arrayOf(interestGroupSchema),
    meta: {
      errorMessage: 'Fetching interestGroups failed'
    }
  });
}
