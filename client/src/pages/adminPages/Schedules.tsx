import SchedulesComp from "../../Compounents/adminComponents/SchedulesComp";
import ValidateAdmin from "../../Compounents/adminComponents/ValidateAdmin";
import Footer from "../../Compounents/Footer";
import Header from "../../Compounents/Header";
import HeaderImage from "../../Compounents/HeaderImage";
import ValidateLogin from "../../Compounents/ValidateLogin";

export default function Schedules() {
  return (
    <ValidateLogin>
        <ValidateAdmin>
            <Header/>
            <HeaderImage/>
            <SchedulesComp/>
            <Footer/>
        </ValidateAdmin>
    </ValidateLogin>
  )
}
