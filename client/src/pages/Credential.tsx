import { useContext } from "react";
import Footer from "../Compounents/Footer";
import Header from "../Compounents/Header";
import HeaderImage from "../Compounents/HeaderImage";
import UserCredential from "../Compounents/UserCredential";
import ValidateLogin from "../Compounents/ValidateLogin";
import { DataContextLogin } from "../context/Context";

export default function Credential() {

    const {dataUser} = useContext(DataContextLogin)

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <UserCredential
          id={dataUser.id}
          name={dataUser.name}
          lastName={dataUser.lastName}
          image={dataUser.image}
        />
        <Footer/>
      </ValidateLogin>
    </>
  )
}
