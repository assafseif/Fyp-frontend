import { parseCookies } from "nookies";

export const postData = async (url, data, context) => {
  const jwt = parseCookies(context).jwt || null;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${parseCookies().jwt}`,
    },
    body: JSON.stringify(data),
  });
  const Resdata = await res.json();

  return Resdata;
};

export const getData = async (url, context) => {
  const jwt = parseCookies(context).jwt || null;
  const Data = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  });

  const Dataresponse = await Data.json();

  return Dataresponse;
};

export const DeletePost = async (url, context) => {
  const jwt = parseCookies(context).jwt || null;
  const Data = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${parseCookies().jwt}`,
    },
  });

  const Dataresponse = await Data.json();

  return Dataresponse;
};

//PATCH API
export const PatchApi = async (payload, url, context) => {
  const jwt = parseCookies(context).jwt || null;
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
      Authorization: `Bearer ${parseCookies().jwt}`,
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
