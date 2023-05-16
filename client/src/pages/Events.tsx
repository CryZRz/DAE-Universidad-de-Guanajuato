import { useContext } from "react";
import EventsComp from "../Compounents/EventsComp";
import Footer from "../Compounents/Footer";
import Header from "../Compounents/Header";
import HeaderImage from "../Compounents/HeaderImage";
import ListEventsSchool from "../Compounents/ListEventsSchool";
import ValidateLogin from "../Compounents/ValidateLogin";
import { DataContextLogin } from "../context/Context";

export default function Events() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <EventsComp/>
        <Footer/>
    </ValidateLogin>
  )
}
