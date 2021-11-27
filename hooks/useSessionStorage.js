import { useState, useEffect } from "react";

const useSessionStorage = () => {
  const [auth, setAuth] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    setAuth(sessionStorage.getItem("auth"));
    setRoomName((roomName = window.sessionStorage.getItem("roomName")));
  }, []);

  return { auth, roomName };
};

export default useSessionStorage;
