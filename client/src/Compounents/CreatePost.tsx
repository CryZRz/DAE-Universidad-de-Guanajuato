import axios from "axios"
import { ChangeEvent, FormEvent, useState } from "react"
import { getCookie } from "../helpers/getCookie"

import "../assets/styles/cardPost.styles.css"

export default function CreatePost() {

    const [saveImagePost, setSaveImagePost] = useState<File | null>(null)
    const [saveNameImage, setSaveNameImage] = useState("")
    const [saveTitlePost, setSaveTitlePost] = useState("")
    const token = getCookie("token")

    function handleChangeImagePost({target : {files, value}} : ChangeEvent<HTMLInputElement>) {
        const fileImage = files[0]
        if (fileImage.type != "image/jpeg" || fileImage.size > 20 * 1000000) {
          return alert("Solo puedes subir archivos de tipo imagen y menor a 20mb")
        }else{
          setSaveNameImage(value)
          setSaveImagePost(fileImage)
          alert("Esto solo es una previsualizacion de la imagen debes dar en actualizar para guardarlo")
        }
    }

    function saveTextComment({target: {value}} : ChangeEvent<HTMLTextAreaElement>){
        setSaveTitlePost(value)
    }

    async function sendDataPosts(e : FormEvent<HTMLFormElement>){
        e.preventDefault()
        if (saveTitlePost == "" || saveImagePost == null) {
            return alert("No puedes hacer publicaciones sin titulo")
        }else{
            try {
                const formData = new FormData()
                formData.append("image", saveImagePost)
                formData.append("title", saveTitlePost)
                await axios.post("http://localhost:3000/post/save",
                    formData,{
                    headers: {
                        token
                    }
                })
                alert("Publicacion hecha correctamente")
            } catch (e) {
                alert(e)
            }
        }
    } 

  return (
    <div className="create-post-card-container">
        <div className="create-post-card-sections">
            <form className="create-post-card-form" onSubmit={sendDataPosts}>
                <h3>Crea una publicacion</h3>
                <div className="create-post-card-section-title">
                    <textarea placeholder="Escribe un titulo" onChange={saveTextComment}></textarea>
                </div>
                {
                    saveImagePost  != null ?
                    <div className="create-post-image-temp-content">
                        <img src={URL.createObjectURL(saveImagePost)} alt="" />
                    </div>
                    :
                    <></>
                }
                <div className="create-post-card-section-image">
                    <input type="file"  onChange={handleChangeImagePost} value={saveNameImage}/>
                </div>
                <div className="create-post-card-section-btn-send">
                    <button>Send</button>
                </div>
            </form>
        </div>
    </div>
  )
}
