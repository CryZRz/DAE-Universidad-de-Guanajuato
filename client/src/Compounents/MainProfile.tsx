import { useContext, useState } from "react";
import { DataContextLogin } from "../context/Context";


import CardProfile from "./CardProfile";

export default function MainProfile() {

  const { dataUser } = useContext(DataContextLogin)

  return (
    <div className="profile-user-container">
      
    </div>
  );
}
