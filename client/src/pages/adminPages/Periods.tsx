import PeriodsComp from '../../Compounents/adminComponents/PeriodsComp'
import ValidateAdmin from '../../Compounents/adminComponents/ValidateAdmin'
import Footer from '../../Compounents/Footer'
import Header from '../../Compounents/Header'
import HeaderImage from '../../Compounents/HeaderImage'
import ValidateLogin from '../../Compounents/ValidateLogin'

export default function Periods() {
  return (
    <>
        <ValidateLogin>
            <ValidateAdmin>
                <Header/>
                <HeaderImage/>
                <PeriodsComp/>
                <Footer/>
            </ValidateAdmin>
        </ValidateLogin>
    </>
  )
}
