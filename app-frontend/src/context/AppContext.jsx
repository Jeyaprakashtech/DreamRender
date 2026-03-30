import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setuser] = useState(null);
  const [showlogin, setShowlogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [credits, setcredits] = useState(0);

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backend_url + "/api/users/credits", {
        headers: { token },
      });

      if (data.success) {
        setcredits(data.credits);
        setuser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setuser(null);
    toast.success("Logout Successfully")
  };
  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        backend_url + "/api/image/generate-image",
        { prompt },
        { headers: { token } },
      );
      console.log(prompt);
      if (data.success) {
        loadCreditsData();
        return data.result_img;
      } else {
        toast.error(data.message);
        loadCreditsData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getUserImage = async () => {
    try {
      const { data } = await axios.get(backend_url + "/api/image/user-image", {
        headers: { token },
      });

      if (data.success) {
        return data.images;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      loadCreditsData();
    }
  }, [token]);
  const value = {
    user,
    setuser,
    showlogin,
    setShowlogin,
    backend_url,
    token,
    setToken,
    credits,
    setcredits,
    loadCreditsData,
    logout,
    generateImage,
    getUserImage,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
