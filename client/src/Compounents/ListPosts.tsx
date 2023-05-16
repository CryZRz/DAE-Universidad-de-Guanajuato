import axios from "axios"
import { useEffect, useState } from "react"
import { getCookie } from "../helpers/getCookie"
import { CardPostIn } from "../Interfaces/CardPostsIn"
import LoadingSection from "./LoadingSection"

import CardPost from "./CardPost"

export default function ListPosts() {

  const [listPost, setListPost] = useState<CardPostIn[]>([{
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
  const [loadListPost, setLoadListPost] = useState(false)
  const token = getCookie("token")

  useEffect(()=> {
    async function getAllPost(){
      try {
        const reqAllPost = await axios.get("http://localhost:3000/posts", {
          headers: {
            token
          }
        })
        setListPost(reqAllPost.data)
        setLoadListPost(true)
      } catch (e) {
        alert(e)
      }
    }

    getAllPost()
  }, [])

  async function reloadPost(postId : number){

    let newPosts = listPost
    let indexNewPost = 0
    for (let i = 0; i < listPost.length; i++) {
      if (listPost[i].id == postId) {
        indexNewPost = i
      }
    }

    try {
      //For some reason when you directly modified the state, the dom is not reflected, that's why this line
      setListPost([])
      const reqGetPost = await axios.get(`http://localhost:3000/post/${postId}`,{
          headers: {
            token
          }
        })
      newPosts[indexNewPost] = reqGetPost.data[0]
      setListPost(newPosts)
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div>
      {
        loadListPost ?
        listPost.map(p => {
          return <CardPost
            key={p.id}
            postId={p.id}
            title={p.title}
            imageUser={p.userAuthor.image}
            image={p.image}
            date={p.date}
            name={p.userAuthor.name}
            lastName={p.userAuthor.lastName}
            comments={p.comments}
            authorId={p.userAuthor.id}
            showFullComments={false}
            reloadPost={reloadPost}
          />
        })
        :
        <LoadingSection/>
      }
    </div>
  )
}
