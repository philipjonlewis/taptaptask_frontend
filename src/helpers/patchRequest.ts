import axios from "axios";

export const patchRequest = async (url: string, formContent: any) => {
  axios
    .patch(url, await formContent, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
};
