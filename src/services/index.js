import axios from "axios";

// import { API_URL } from 'config/env'

// import { errorToast } from 'components/Toast'

let apiUrl = process.env.REACT_APP_BASE_URL;
console.log("apiUrl: ", apiUrl);

apiUrl = process.env.REACT_APP_BASE_URL;

export const appConst = {
  apiMockTimeout: 1000 * 10, // 10 seconds
};

const codes = {
  UNAUTHORIZED: 401,
  CUSTOM_TOKEN_EXPIRED: -2,
  REQUEST_TIMEOUT: 408,
  ECONNABORTED: "ECONNABORTED",
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === codes.UNAUTHORIZED) {
      // rootStore.AuthStore.onLogOut()
    }

    if (
      (error.response && error.response.status === codes.REQUEST_TIMEOUT) ||
      error.code === codes.ECONNABORTED
    ) {
      //Looks like the server is taking to long to respond, please try again in sometime.
      //errorToast({ content: 'Server request timed out. Please retry again.' })
    }

    if (!error?.response?.data?.message) {
      /* Add something went wrong toast error here
    	statusText in toast maybe.*/
    }
    throw error;
    // return Promise.reject(error)
  }
);

const getFullUrl = (url, type) => {
  return `${apiUrl}${url}`;
};

export const get = (request) => {
  console.log("request: ", request);
  return commonFetch({ method: "get", ...request });
};

export const post = (request) => {
  return commonFetch({
    method: "post",
    ...request,
  });
};

export const patch = (request) => {
  return commonFetch({ method: "patch", ...request });
};

export const put = (request) => {
  return commonFetch({ method: "put", ...request });
};

export const deletee = (request) => {
  return commonFetch({ method: "delete", ...request });
};

const commonFetch = (request) => {
  const { subUrl, method, data = {}, params, headers = {}, type } = request;
  const url = getFullUrl(subUrl, type);
  const commonHeaders = getCommonHeaders();
  return axios({
    method,
    url,
    params,
    data,
    headers:
      type === "image" ? { ...headers } : { ...commonHeaders, ...headers },
  });
};

export const content_types = {
  multipart: {
    "Content-Type": "multipart/form-data",
  },
  json: {
    "Content-Type": "application/json",
  },
};

const getCommonHeaders = () => {
  //   const {
  //     AuthStore: {
  //       state: {
  //         data: { token },
  //       },
  //     },
  //   } = rootStore
  return {
    ...content_types.json,
  };
};
