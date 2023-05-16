import UserComp from '../../Compounents/adminComponents/UserComp'
import ValidateAdmin from '../../Compounents/adminComponents/ValidateAdmin'
import Header from '../../Compounents/Header'
import HeaderImage from '../../Compounents/HeaderImage'
import ValidateLogin from '../../Compounents/ValidateLogin'

export default function User() {

  return (
    <ValidateLogin>
        <ValidateAdmin>
            <Header/>
            <HeaderImage/>
            <UserComp/>
        </ValidateAdmin>
    </ValidateLogin>
  )
}
