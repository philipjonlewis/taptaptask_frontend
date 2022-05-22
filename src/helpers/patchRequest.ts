import axios from "axios";

export const patchRequest = (formContent: any) => {
  axios
    .patch("http://192.168.0.22:4000/tasks/edit", formContent)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
