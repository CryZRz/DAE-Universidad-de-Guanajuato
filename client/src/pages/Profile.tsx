import { DataContextLogin } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Header from "../Compounents/Header";
import CardProfile from "../Compounents/CardProfile";
import CardEditProfile from "../Compounents/CardEditProfile";
import Loading from "../Compounents/Loading";
import { UserDataIn } from "../Interfaces/Users";
import { getCookie } from "../helpers/getCookie";

export default function Profile() {
  const { dataUser, isLoading, err, updateInfo } = useContext(DataContextLogin);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = getCookie("token");
  const [dataSearchUser, setDataSearchUser] = useState<UserDataIn>({
    token: "",
    id: 0,
    email: "",
    name: "",
    lastName: "",
    role: "",
    image: "",
    teamName: "",
    semesterId: 0,
    description: "",
    social: [
      {
        name: "",
        link: "",
      },
    ],
  });
  const [loadDataUser, setLoadDataUser] = useState(false);
  const [showMenuEditProfile, setShowMenuEditProfile] = useState(false);
  const [notExistUserErr, setNotExistUserErr] = useState("")

  useEffect(() => {
    if (err) {
      navigate("/");
    }
  }, [err]);

  useEffect(() => {
    async function searchUser() {
      try {
        const reqSearchUser = await axios.get(
          `http://localhost:3000/profile/user/${id}`,
          {
            headers: {
              token,
            },
          }
        );
        setDataSearchUser(reqSearchUser.data);
        setLoadDataUser(true)
      } catch (e : any) {
        setLoadDataUser(true)
        setNotExistUserErr(e.response.data.message)
        console.log(e.response.data.message);
      }
    }

    searchUser();
  }, []);

  return (
    <>
      {isLoading && loadDataUser ? (
        <>
          <Header/>
          <div className="profile-user-container">
            {
              notExistUserErr != "" ?
              <h1>{notExistUserErr}</h1>
              :
              showMenuEditProfile ? (
                <CardEditProfile
                  userId={dataSearchUser.id}
                  image={dataSearchUser.image}
                  name={dataSearchUser.name}
                  lastName={dataSearchUser.lastName}
                  role={dataSearchUser.role}
                  team={dataSearchUser.teamName}
                  description={dataSearchUser.description}
                  email={dataSearchUser.email}
                  btnEditProfile={setShowMenuEditProfile}
                  linkFacebook={dataSearchUser.social[0].link}
                  linkInstagram={dataSearchUser.social[1].link}
                  linkTwitter={dataSearchUser.social[2].link}
                  updateInfo={updateInfo}
                />
              ) : (
                <CardProfile
                  userId={dataUser.id}
                  profileId={dataSearchUser?.id}
                  image={dataSearchUser.image}
                  name={dataSearchUser.name}
                  lastName={dataSearchUser.lastName}
                  role={dataSearchUser.role}
                  team={dataSearchUser.teamName}
                  description={dataSearchUser.description}
                  email={dataSearchUser.email}
                  btnEditProfile={setShowMenuEditProfile}
                  linkFacebook={dataSearchUser.social[0].link}
                  linkInstagram={dataSearchUser.social[1].link}
                  linkTwitter={dataSearchUser.social[2].link}
                />
              )
            }
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
