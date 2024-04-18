const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:3000";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FrienderApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  static token = null;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${FrienderApi.token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Logs user in, returns token */
  static async login(data) {
    let res = await this.request(`auth/login`, data, "POST");
    return res.token;
  }

  /** Registers user, returns token */
  static async register(data) {
    let res = await this.request(`auth/register`, data, "POST");
    return res.token;
  }

  /** Updates user */
  static async updateUser(data) {
    const username = data.username;

    const validData = {...data};
    delete validData.username;

    let res = await this.request(`users/${username}`, validData, "PATCH");
    return res.user;
  }

  /** Get user */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Add photo to user */
  static async updatePhoto(formData) {
    let res = await fetch(`${BASE_URL}/upload`, {
            method: "POST",
            headers: {
              authorization: `Bearer ${FrienderApi.token}`
            },
            body: formData
        });
    const data = await res.json();

    return data.imageUrl;
  }

  /** Add photo to user */
  static async getViewableUsers(username, location, friendRadius) {
    const queryParams = { location, friendRadius };

    let res = await this.request(`users/${username}/viewable`, queryParams);
    return res.users;
  }

  /** checks match, returns boolean */
  static async checkMatch(username, data) {
    let res = await this.request(`users/${username}/check-match`, data, "POST");
    return res.matched;
  }

  /** gets friends of the user from API */
  static async getFriends(username) {
    let res = await this.request(`users/${username}/friends`);
    return res.friends;
  }

  /** gets messages between the current user and their specified friend */
  static async getMessagesBetween(currUsername, friendUsername) {
    let res = await this.request(`users/${currUsername}/messages-between/${friendUsername}`);
    return res.messages;
  }

  static async sendMessage(data) {
    let res = await this.request('messages', data, "POST");
    return res.message;
  }

  // obviously, you'll add a lot here ...
}

export default FrienderApi;