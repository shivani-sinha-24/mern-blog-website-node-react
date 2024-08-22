import axios from "axios";
const token = JSON.parse(localStorage.getItem("blogUser"));

const headers = {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
};
const headers2 = {
    authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
};

export const getReq = (url) => {
    return axios
    .get(url, {
        headers: headers,
    })
    .then((response) => response)
    .catch((error) => {
        return { error: error };
    });
};

export const postReq = (url, payload) => {
    return axios
        .post(url, payload, {
            headers: headers,
        })
        .then((response) => response)
        .catch((error) => {
            return { error: error };
        });
};

export const putReq = (url, payload) => {
    return axios
        .put(url, payload, {
            headers: headers2,
        })
        .then((response) => response)
        .catch((error) => {
            return { error: error };
        });
};

export const deleteReq = (url) => {
    return axios
        .delete(url, {
            headers: headers,
        })
        .then((response) => response)
        .catch((error) => {
            return { error: error };
        });
};
