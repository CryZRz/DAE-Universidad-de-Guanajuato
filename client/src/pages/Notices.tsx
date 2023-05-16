import { useContext } from "react"
import Footer from "../Compounents/Footer"
import Header from "../Compounents/Header"
import HeaderImage from "../Compounents/HeaderImage"
import NoticesComp from "../Compounents/NoticesComp"
import ValidateLogin from "../Compounents/ValidateLogin"
import { DataContextLogin } from "../context/Context"

export default function Notices() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <NoticesComp/>
        <Footer/>
      </ValidateLogin>
    </>
  )
}
