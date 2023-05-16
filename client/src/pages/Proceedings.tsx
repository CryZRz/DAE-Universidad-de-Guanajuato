import { useContext } from "react";
import Header from "../Compounents/Header";
import HeaderImage from "../Compounents/HeaderImage";
import KardexStudent from "../Compounents/KardexStudent";
import KardexTeacher from "../Compounents/KardexTeacher";
import ValidateLogin from "../Compounents/ValidateLogin";
import { DataContextLogin} from "../context/Context"

export default function Proceedings() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        {
          dataUser.role == "teacher" ?
          <KardexTeacher/>
          :
          <KardexStudent/>
        }
      </ValidateLogin>
    </>
  )
}
