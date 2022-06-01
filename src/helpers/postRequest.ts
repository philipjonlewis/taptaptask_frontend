import axios from "axios";

export const postRequest = async (formContent, url) => {
  axios
    .post(url, await formContent)
    .then(function (response: any) {
      console.log(response.json());
    })
    .catch(function (error) {
      console.log(error.response);
    });
};

// .post("http://192.168.0.22:4000/tasks", await formContent)
