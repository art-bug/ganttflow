/*
import axios from 'axios';

import stringify from 'utils/stringify';

type AbstractError = string | any;

const jsonContent = { headers: {'Content-Type': 'application/json'} };

export default function useErrorTrace<E = AbstractError>(error: E) {
  return axios.post('/', `${new Date()} ${stringify(error)}`, jsonContent).then(response => response);
}
*/

export default {};
