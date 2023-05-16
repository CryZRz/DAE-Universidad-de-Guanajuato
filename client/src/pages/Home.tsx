import { useContext } from "react";
import Footer from "../Compounents/Footer";

import Header from "../Compounents/Header";
import HeaderImage from "../Compounents/HeaderImage";
import HomeMenu from "../Compounents/HomeMenu";
import ListEventsSchool from "../Compounents/ListEventsSchool";
import NoticesPreview from "../Compounents/NoticesPreview";
import PostsPreview from "../Compounents/PostsPreview";
import ValidateLogin from "../Compounents/ValidateLogin";
import { DataContextLogin } from "../context/Context";

export default function Home() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <>
      <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <NoticesPreview/>
        <HomeMenu/>
        <ListEventsSchool/>
        <PostsPreview/>
        <Footer/>
      </ValidateLogin>
    </>
  )
}
