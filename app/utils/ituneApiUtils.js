import { create } from 'apisauce';

export const api = create({
    baseURL: 'https://itunes.apple.com/search?media=music&term=',
    headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    mode: 'no-cors'
});