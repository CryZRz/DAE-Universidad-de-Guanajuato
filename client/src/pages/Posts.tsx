import { useContext } from "react";
import CreatePost from "../Compounents/CreatePost";
import Footer from "../Compounents/Footer";
import Header from "../Compounents/Header";
import HeaderImage from "../Compounents/HeaderImage";
import ListPosts from "../Compounents/ListPosts";
import ValidateLogin from "../Compounents/ValidateLogin";
import { DataContextLogin } from "../context/Context";

export default function Posts() {

  const {dataUser} = useContext(DataContextLogin)

  return (
    <>
    <ValidateLogin>
      <Header/>
      <HeaderImage/>
      <CreatePost/>
      <ListPosts/>
      <Footer/>
    </ValidateLogin>
    </>
  )
}
