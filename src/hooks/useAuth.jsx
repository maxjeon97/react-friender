import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import FrienderApi from "../api/api";
import { jwtDecode } from "jwt-decode";

function useAuth(key) {
  const [token, setToken] = useLocalStorage(key);
  const [user, setUser] = useState();

  useEffect(function getUserData() {
    async function fetchUserData() {
      FrienderApi.token = token;
      const { username } = jwtDecode(token);
      const userData = await FrienderApi.getUser(username);
      setUser({
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        imageUrl: userData.imageUrl,
        hobbies: userData.hobbies,
        interests: userData.interests,
        location: userData.location,
        friendRadius: userData.friendRadius,
        lastSearched: userData.lastSearched,
      });
    }
    if (token) {
      fetchUserData();
    } else {
      setUser(null);
      FrienderApi.token = null;
    }
  }, [token]);

  async function login(formData) {
    const resp = await FrienderApi.login(formData);
    setToken(resp.token);
  }

  async function register(formData) {
    const resp = await FrienderApi.register(formData);
    setToken(resp.token);
  }

  async function updateUser(formData) {
    const updatedData = await FrienderApi.updateUser(formData);
    setUser((user) => ({
      ...user,
      ...updatedData,
    }));
  }

  async function logout() {
    setToken(null);
  }

  return { user, token, login, register, updateUser, logout };
}

export default useAuth;