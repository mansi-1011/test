import Axios from "axios";

/*
 *  this function used for get data by id and slug_name etc
 */

// data as use for id and slug_name

export function getApiByIdAndName(url, data) {
  return Axios.get(`${url}${data}`)
    .then((res) => res)
    .catch((err) => console.log(err));
}

export function getApiData(url) {
  return Axios.get(`${url}`)
    .then((res) => res)
    .catch((err) => console.log(err));
}

