import "../assets/styles/userCredential.styles.css"
import {QRCodeSVG} from 'qrcode.react';
import imageLogoSmall from "../assets/images/escudo-ug-small-gold.png" 

export default function UserCredential({image, name, lastName, id} : {image : string, name : string, lastName : string, id : number}) {
    return (
    <div className="user-credential-container">
        <div className="user-credential-background-top"></div>
        <div className="user-credential-sections">
            <div className="user-credential-section-image-content">
                <img src={`http://localhost:3000/static/images/profiles/${image}`} alt={`image profile ${name}`} />
            </div>
            <div className="user-credential-section-name">
                <h3>Nombre: {name} {lastName}</h3>
                <h3>ID: {id}</h3>
            </div>
            <div className="user-credential-section-qr-content">
                <QRCodeSVG value='https://www.facebook.com/zaida.jasso.7' size={180}/>
            </div>
            <div className="user-credential-section-logo-small">
                <img src={imageLogoSmall} alt="logo ug dorado" />
            </div>
        </div>
    </div>
  )
}
