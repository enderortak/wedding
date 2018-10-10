import React from "react";
import NotificationService from "./NotificationService";

const APP_API_URL = "http://localhost:3031/api/v1";
// const APP_API_URL = "/api/v1";

export default class ApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl || APP_API_URL;
    this.notify = new NotificationService();
  }
  fetch(apiMethod, httpMethod, requestBody) {
    let requestUrl = `${this.apiUrl}/${apiMethod}`;
    if (httpMethod === "GET" && requestBody) requestUrl += `?${this.convertToUrlParams(requestBody)}`;
    console.log("fetching data from ", requestUrl, " method: ", httpMethod);
    const requestHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    };
    const requestOptions = {
      headers: requestHeaders,
      method: httpMethod,
      mode: "cors",
      body: httpMethod === "GET" ? undefined : JSON.stringify(requestBody),
    };
    return fetch(requestUrl, requestOptions)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
      })
      .then((response) => {
        if (response.status === 204) return null;
        else if (response.headers.get("content-type") && response.headers.get("content-type").indexOf("application/json") !== -1) { // checking response header
          return response.json();
        }
        throw new TypeError("Sunucudan gelen veri beklenmeyen bir formatta");
      })
      .catch((error) => {
        this.notify.extended(
          "Sunucu erişim hatası",
          <p>Sunucu ile iletişime geçerken bir hata oluştu: <br />
            {error.message}
          </p>,
          { type: "error" },
        );
        throw error;
      });
  }
  convertToUrlParams(params) {
    return Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
  }
}
