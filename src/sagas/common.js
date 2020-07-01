import CONFIG from '../config';

const { API_HOST } = CONFIG;

export async function getCsrfToken() {
  const response = await fetch(`${API_HOST}/csrf/`, {
    credentials: 'include',
  });
  const data = await response.json();
  return data.csrfToken;
}

async function getHeaders() {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    Accept: 'application/json',
    'Accept-Encoding': 'gzip,deflate',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRFToken': await getCsrfToken(),
  };
}

export const ajaxHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  Accept: 'application/json',
  'Accept-Encoding': 'gzip,deflate',
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRFToken': getCsrfToken(),
};

export const putRequest = {
  method: 'put',
  redirect: 'manual',
  credentials: 'include',
  headers: getHeaders(),
};

export const postRequest = {
  method: 'post',
  redirect: 'manual',
  credentials: 'include',
  headers: getHeaders(),
};

export const getRequest = {
  method: 'get',
  redirect: 'manual',
  credentials: 'include',
  headers: getHeaders(),
};

export const checkStatus = function(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  fetch(`${API_HOST}/login/?next=/`, {
    method: 'GET',
  }).then((response) => {
    document.location.href = response.url;
  });
  throw new Error(response.statusText);
};
