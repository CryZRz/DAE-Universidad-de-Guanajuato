import { CardProfileIn } from "../Interfaces/CardProfile";
import { Facebook, Instagram, Twitter, EditPencil } from "iconoir-react";
import "../assets/styles/profile.styles.css";

export default function CardProfile({
  userId,
  profileId,
  image,
  name,
  lastName,
  role,
  team,
  email,
  description,
  btnEditProfile,
  linkFacebook,
  linkInstagram,
  linkTwitter
}: CardProfileIn) {
  return (
    <div className="profile-user-card-sections" style={{animation: "fadeIn 1s"}}>
      <div className="profile-user-card-background">
        {
          userId == profileId ?
          <button className="btn-edit-profile" onClick={ e => {btnEditProfile(true)}}>
            <EditPencil height={25} width={25} />
          </button>
          :
          <></>
        }
      </div>
      <div className="profile-usaer-card-info">
        <div className="card-profile-container">
          <div className="card-profile-sections">
            <div className="card-profile-section-image">
              <div className="card-profile-image-content">
                <img
                  className="card-profile-image"
                  src={`http://localhost:3000/static/images/profiles/${image}`}
                  alt={`image profile ${name}`}
                />
              </div>
            </div>
            <div className="card-profile-section-info-student">
              <div className="card-profile-info-student-name">
                <h3 className="text-3xl font-bold">{name} {lastName}</h3>
              </div>
              <div className="card-profile-info-student-role">
                <span>Rol: {role}</span>
              </div>
              <div className="card-profile-info-student-email">
                <span>Email: {email}</span>
              </div>
              <div className="card-profile-info-student-team">
                <span>Grupo: {team}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-user-card-more-info">
        <div className="profile-user-card-description">
          <h3>Descripcion: {description}</h3>
        </div>
        <div className="profile-user-card-social">
          <div>
            <a href={linkFacebook != "" ? linkFacebook : ""} target="_blank">
              <Facebook height={35} width={35} />
            </a>
          </div>
          <div>
            <a href={linkInstagram != "" ? linkInstagram : ""} target="_blank">
              <Instagram height={35} width={35} />
              </a>
          </div>
          <div>
            <a href={linkTwitter != "" ? linkInstagram : ""} target="_blank">
              <Twitter height={35} width={35} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
