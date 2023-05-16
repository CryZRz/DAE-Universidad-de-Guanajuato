import React from 'react'
import ListUsers from '../../Compounents/adminComponents/ListUsers'
import ValidateAdmin from '../../Compounents/adminComponents/ValidateAdmin'
import Footer from '../../Compounents/Footer'
import Header from '../../Compounents/Header'
import HeaderImage from '../../Compounents/HeaderImage'
import ValidateLogin from '../../Compounents/ValidateLogin'

export default function Users() {
  return (
    <>
        <ValidateLogin>
            <ValidateAdmin>
                <Header/>
                <HeaderImage/>
                <ListUsers/>
                <Footer/>
            </ValidateAdmin>
        </ValidateLogin>
    </>
  )
}
