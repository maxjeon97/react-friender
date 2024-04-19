import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import FrienderApi from "../api/api";
import { jwtDecode } from "jwt-decode";

function useAuth(key) {
  const [token, setToken] = useLocalStorage(key);
  const [user, setUser] = useState();

  useEffect(function fetchUserDataOnMountAndTokenChange() {
    async function fetchUserData() {
      console.log("got here", token);
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
        friends: userData.friends,
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
    const respToken = await FrienderApi.login(formData);
    setToken(respToken);
  }

  async function register(formData) {
    const respToken = await FrienderApi.register(formData);
    setToken(respToken);
  }

  async function updateUser(formData) {
    const updatedData = await FrienderApi.updateUser(formData);
    setUser((user) => ({
      ...user,
      ...updatedData,
    }));
  }

  async function updatePhoto(formData) {
    const updatedPhoto = await FrienderApi.updatePhoto(formData);
    setUser((user) => ({
      ...user,
      imageUrl: updatedPhoto
    }));
  }

  async function logout() {
    setToken(null);
  }

  return { user, setUser, token, login, register, updateUser, updatePhoto, logout };
}

export default useAuth;