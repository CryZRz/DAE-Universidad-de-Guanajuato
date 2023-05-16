import { CardProfileIn } from "../Interfaces/CardProfile";
import { Facebook, Instagram, Twitter, EditPencil } from "iconoir-react";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import axios from "axios";

import "../assets/styles/profile.styles.css";
import "animate.css";
import { validateEmail } from "../helpers/validates";
import { getCookie } from "../helpers/getCookie";

export default function CardEditProfile({
  userId,
  image,
  name,
  lastName,
  email,
  description,
  btnEditProfile,
  linkFacebook,
  linkInstagram,
  linkTwitter,
  updateInfo
}: CardProfileIn) {
  const [dataUserUpdate, setDataUserUpdate] = useState({
    userId,
    name: name != "" ? name : "",
    lastName: lastName != "" ? lastName : "",
    email: email != "" ? email : "",
    description: description != "" ? description : "",
    linkFacebook: linkFacebook != "" ? linkFacebook : "",
    linkInstagram: linkInstagram != "" ? linkInstagram : "",
    linkTwitter: linkTwitter != "" ? linkTwitter : "",
  });
  const [showEditImage, setShowEditImage] = useState(false);
  const [saveImageUser, setSaveImageUser] = useState<File | null>()
  const [saveValueImage, setSaveValueImage] = useState("")
  const token = getCookie("token");

  function handleChange({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (name == "description" && value.length > 50) {
      return alert("La descripcion no puedes ser mayor a 100 caracteres");
    }
    setDataUserUpdate({ ...dataUserUpdate, [name]: value });
  }

  function handleSaveImage({target : {files, value}} : ChangeEvent<HTMLInputElement>){
    const fileImage = files[0]
    if (fileImage.type != "image/jpeg" || fileImage.size > 20 * 1000000) {
      return alert("Solo puedes subir archivos de tipo imagen y menor a 20mb")
    }else{
      console.log(files)
      setSaveValueImage(value)
      setSaveImageUser(fileImage)
      alert("Esto solo es una previsualizacion de la imagen debes dar en actualizar para guardarlo")
    }
  }

  async function sendDataImage(){
    const formData = new FormData();
    formData.append("image", saveImageUser)
    try {
        await axios.put(
        "http://localhost:3000/update/image/user",
        formData,
        {
          headers: {
            token,
          },
        }
      );
      if (updateInfo != undefined) {
        updateInfo()
      }
      alert(":)")
    } catch (e) {
      console.log(e)
      return alert(e)
    }
  }

  function verifyDataImage(e : FormEvent<HTMLFormElement>){
    e.preventDefault()
    if (saveImageUser != null && saveImageUser.type != "image/jpeg" && saveImageUser.type != "image/png" && saveImageUser.size > 20 * 1000000) {
      return alert("Solo puedes subir archivos de tipo imagen y menor a 20mb")
    }else{
      return sendDataImage()
    }
  }

  async function sendDataUpdate() {
    try {
      await axios.put(
        "http://localhost:3000/update/info/user",
        dataUserUpdate,
        {
          headers: {
            token,
          },
        }
      );
      if (updateInfo != undefined) {
        updateInfo()
      }
    } catch (e) {
      return alert(e);
    }
  }

  function validateInfoUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      dataUserUpdate.name == "" ||
      dataUserUpdate.lastName == "" ||
      dataUserUpdate.email == "" ||
      dataUserUpdate.description == ""
    ) {
      return alert("Solos los campos de redes sociales pueden estar vacios");
    } else if (!validateEmail(dataUserUpdate.email)) {
      return alert("Introduce un correo valido");
    } else if (dataUserUpdate.description.length > 50) {
      return alert("La descripcion no puede ser mayor a 100 caracteres");
    } else if (
      dataUserUpdate.name.length < 3 ||
      dataUserUpdate.lastName.length < 3
    ) {
      return "Tu nombre o apellidos no pueden ser menores a 3";
    } else {
      return sendDataUpdate();
    }
  }

  return (
    <div
      className="card-edit-profile-container"
      style={{ animation: "fadeIn 1s" }}
    >
      <div className="card-edit-profile-filter">
        {showEditImage ? (
          <div className="card-edit-image-sections">
            <div className="card-edit-image-section-image">
              <img
                  src={saveImageUser != null ? URL.createObjectURL(saveImageUser) : `http://localhost:3000/static/images/profiles/${image}`}
                  alt={`image user ${name}`}
                />
            </div>
            <form onSubmit={verifyDataImage}>
              <div className="card-edit-image-section-get-image">
                <input type="file" onChange={handleSaveImage} value={saveValueImage}/>
              </div>
              <div className="card-edit-image-section-btns">
                <button onClick={e => {setShowEditImage(false)}}>Cancelar</button>
                <button>Actualizar</button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="card-edit-profile-image-content">
              <div className="card-edit-profile-image">
                <img
                  src={`http://localhost:3000/static/images/profiles/${image}`}
                  alt={`image user ${name}`}
                />
                <button
                  className="btn-edit-image-user"
                  onClick={(e) => {
                    setShowEditImage(true);
                  }}
                >
                  <EditPencil width={25} height={25} />
                </button>
              </div>
            </div>
            <div className="card-edit-profile-info-sections">
              <form
                className="card-edit-profile-info-section-form"
                onSubmit={validateInfoUser}
              >
                <div>
                  <input
                    type="text"
                    className="get-edit-name"
                    name="name"
                    placeholder="Nombre:"
                    defaultValue={name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="get-edit-lastname"
                    name="lastName"
                    placeholder="Apellidos:"
                    defaultValue={lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    className="get-edit-email"
                    name="email"
                    placeholder="Email:"
                    defaultValue={email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <textarea
                    className="get-edit-description"
                    name="description"
                    placeholder="Descripcion:"
                    value={dataUserUpdate.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="card-edit-profile-info-social-sections">
                  <div>
                    <label htmlFor="linkFacebook">
                      <Facebook width={30} height={30} />
                    </label>
                    <input
                      type="text"
                      name="linkFacebook"
                      className="get-edit-facebook"
                      placeholder="link facebook:"
                      defaultValue={linkFacebook != "" ? linkFacebook : ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="linkInstagram">
                      <Instagram width={30} height={30} />
                    </label>
                    <input
                      type="text"
                      name="linkInstagram"
                      className="get-edit-instagram"
                      placeholder="link instagram:"
                      defaultValue={linkInstagram != "" ? linkInstagram : ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="linkTwitter">
                      <Twitter width={30} height={30} />
                    </label>
                    <input
                      type="text"
                      name="linkTwitter"
                      className="get-edit-twitter"
                      placeholder="link twitter:"
                      defaultValue={linkTwitter != "" ? linkTwitter : ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button
                      onClick={(e) => {
                        btnEditProfile(false);
                      }}
                    >
                      Cancelar
                    </button>
                    <button>Guardar</button>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
