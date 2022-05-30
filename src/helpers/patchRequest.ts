import axios from "axios";

export const patchRequest = async (url, formContent: any) => {
  axios
    .patch(await url, await formContent)
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      // console.log(error);
    });
};
