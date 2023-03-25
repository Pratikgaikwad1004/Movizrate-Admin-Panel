import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("@token")) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
      <Sidebar />
    );
};

export default Home;
