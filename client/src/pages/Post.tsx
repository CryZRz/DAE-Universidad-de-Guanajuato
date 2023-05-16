import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import CardPost from "../Compounents/CardPost"
import Header from "../Compounents/Header"
import Loading from "../Compounents/Loading"
import { DataContextLogin } from "../context/Context"
import { getCookie } from "../helpers/getCookie"
import { CardPostIn } from "../Interfaces/CardPostsIn"

export default function Post() {

  const {id} = useParams()
  const {dataUser, isLoading, err} = useContext(DataContextLogin)
  const navigate = useNavigate()
  const token = getCookie("token")
  const [dataPost, setDataPost] = useState<CardPostIn[]>([{
    id: 0,
    title : "", 
    image : "", 
    date: "",
    userAuthor: {
      id: 0,
      name: "",
      lastName: "",
      image: "",
      role: ""
    },
    comments : [{
      commentId: 0,
      comment: "",
      date: "",
      userAuthor: {
        id: 0,
        name: "",
        lastName: "",
        image: "",
        role: ""
      }
    }],
  }])
  const [loadDataPost, setLoadDataPost] = useState(false)

  useEffect(() => {
    if (err) {
      navigate("/")
    }
  }, [err])

  useEffect(() => {
    async function getPost(){
      try {
        const reqGetPost = await axios.get(`http://localhost:3000/post/${id}`,{
          headers: {
            token
          }
        })
        setDataPost(reqGetPost.data)
        setLoadDataPost(true)
      } catch (e) {
        console.log(e)
        alert(e)
      }
    }
    if (isLoading) {
     getPost() 
    }
  },[isLoading])
  
  return (
    <>
      {
        isLoading  && loadDataPost ? 
        <div>
          <Header/>
          <CardPost
            postId={dataPost[0].id}
            imageUser={dataPost[0].userAuthor.image}
            name={dataPost[0].userAuthor.name}
            lastName={dataPost[0].userAuthor.lastName}
            title={dataPost[0].title}
            image={dataPost[0].image}
            date={dataPost[0].date}
            comments={dataPost[0].comments} 
            authorId={dataPost[0].userAuthor.id}
            showFullComments={true}
          />
        </div>
        :
        <Loading/>
      }
    </>
  )
}
