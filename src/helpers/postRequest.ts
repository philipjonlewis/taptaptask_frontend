import axios from "axios";

export const postRequest = async (formContent: Object[], url: string) => {
  axios
    .post(url, await formContent, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error.response);
    });
};


