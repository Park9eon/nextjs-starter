import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/public';

export const getPublic = () => sendRequest(`${BASE_PATH}/`, {
  method: 'GET',
});
