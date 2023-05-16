import { useContext } from "react"
import Footer from "../Compounents/Footer"
import Header from "../Compounents/Header"
import HeaderImage from "../Compounents/HeaderImage"
import UpsAndDownsComp from "../Compounents/UpsAndDownsComp"
import ValidateLogin from "../Compounents/ValidateLogin"
import { DataContextLogin} from "../context/Context"

export default function UpsAndDowns() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <UpsAndDownsComp
            user={dataUser.role}
        />
        <Footer/>
      </ValidateLogin>
    </>
  )
}
