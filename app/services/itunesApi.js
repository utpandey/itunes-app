import { api } from '@utils/ituneApiUtils';

// export async function fetchTunes(term) {
//     api.get(`/${term}`).then(response => {
//         console.log(response.data);
//         if (!response.ok) {
//             console.log(response.problem);
//         }
//         return response;
//         //   console.log(response);
//     });
// }

export const getSearchResults = searchText => api.get(`/${searchText}`);