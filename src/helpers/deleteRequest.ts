import axios from "axios";

export const deleteRequest = async (id, url) => {
  axios
    .post(url, await { id: id })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });
};
