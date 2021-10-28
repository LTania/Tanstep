export async function putData(url = '', data = {}) {
  return await sendData('PUT', url, data);
}

export async function postData(url = '', data = {}) {
  return await sendData('POST', url, data);
}

async function sendData(method, url = '', data = {}) {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  });

  return response;
}

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}
