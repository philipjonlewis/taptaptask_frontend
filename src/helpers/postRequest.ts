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

// .post("http://192.168.0.22:4000/tasks", await formContent)
