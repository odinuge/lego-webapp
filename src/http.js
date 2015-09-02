import superagent from 'superagent';
import camelize from 'camelize';
import config from '../config.js';

function urlFor(resource) {
  return config.serverUrl + resource;
}

export function get(url) {
  return request({ method: 'get', url });
}

export function post(url, body) {
  return request({ method: 'post', url, body });
}

export function put(url, body) {
  return request({ method: 'put', url, body });
}

export function del(url, body) {
  return request({ method: 'delete', url, body });
}

export default function request({ method = 'get', url, body, headers = {} }) {
  const req = superagent[method].call(request, urlFor(url));

  for (let header in headers) {
    req.set(header, headers[header]);
  }

  if (body) {
    req.send(body);
  }

  return new Promise((resolve, reject) => {
    req.end((err, res) => {
      if (err) return reject(err);
      if (!res.ok) return reject(new Error(res.body));
      return resolve(camelize(res.body));
    });
  });
}

export function callAPI(action) {
  return (dispatch, getState) => {
    const jwt = getState().auth.token;
    const { method, endpoint, body } = action;

    return dispatch({
      type: action.type,
      promise: request({
        method,
        url: endpoint,
        body,
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      })
    })
  };
}
