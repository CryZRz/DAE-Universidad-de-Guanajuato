import ListSubjectsAdmin from '../../Compounents/adminComponents/ListSubjectsAdmin'
import ValidateAdmin from '../../Compounents/adminComponents/ValidateAdmin'
import Footer from '../../Compounents/Footer'
import Header from '../../Compounents/Header'
import HeaderImage from '../../Compounents/HeaderImage'
import ValidateLogin from '../../Compounents/ValidateLogin'

export default function Subjects() {
  return (
    <ValidateLogin>
        <ValidateAdmin>
            <Header/>
            <HeaderImage/>
            <ListSubjectsAdmin/>
            <Footer/>
        </ValidateAdmin>
    </ValidateLogin>
  )
}
