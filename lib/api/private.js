import sendRequest from './sendRequest';

const BASE_PATH = '/api/v1/private';

export const getPrivate = () => sendRequest(`${BASE_PATH}/`, {
  method: 'GET',
});
