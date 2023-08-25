// import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// export const createOrGetUser = async (response) => {
//     const decode = jwtDecode(response.credential);
//     const { name, picture, sub } = decode;

//     const user = {
//         _id: sub,
//         _type: 'user',
//         username: name,
//         image: picture
//     }

//     await axios.post('http://localhost:5173/api/auth', user);
// }