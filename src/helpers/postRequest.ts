import axios from "axios";

export const postRequest = async (formContent) => {
  axios
    .post("http://192.168.0.22:4000/tasks", await formContent)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
