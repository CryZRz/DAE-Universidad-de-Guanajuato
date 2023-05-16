import Footer from '../Compounents/Footer'
import Header from '../Compounents/Header'
import HeaderImage from '../Compounents/HeaderImage'
import NavegationMenu from '../Compounents/NavegationMenu'
import ValidateLogin from '../Compounents/ValidateLogin'

export default function Menu() {
  return (
    <ValidateLogin>
        <Header/>
        <HeaderImage/>
        <NavegationMenu/>
        <Footer/>
    </ValidateLogin>
  )
}
