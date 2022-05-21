import axios from "axios";

export const patchRequest = async (formContent: any) => {
  axios
    .patch("http://192.168.0.22:4000/tasks/edit", await formContent)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
