import "animate.css"
import "../assets/styles/loading.styles.css"

import logoEscudoUg from "../assets/images/escudo-baw.png"

export default function Loading() {
  return (
    <div className="page-loading-container">
        <div className="page-loading-logo-content">
            <img src={logoEscudoUg} alt="logo escudo ug"/>
            <h1>Loading...</h1>
        </div>
    </div>
  )
}
