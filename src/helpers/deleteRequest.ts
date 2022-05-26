import axios from "axios";

export const deleteRequest = async (taskId, url) => {
  axios
    .post(url, await taskId)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// .post("http://192.168.0.22:4000/tasks", await formContent)
