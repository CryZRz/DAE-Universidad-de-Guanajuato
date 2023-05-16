import React from 'react'
import ListCourses from '../../Compounents/adminComponents/ListCourses'
import ValidateAdmin from '../../Compounents/adminComponents/ValidateAdmin'
import Footer from '../../Compounents/Footer'
import Header from '../../Compounents/Header'
import HeaderImage from '../../Compounents/HeaderImage'
import ValidateLogin from '../../Compounents/ValidateLogin'

export default function Courses() {
  return (
    <ValidateLogin>
        <ValidateAdmin>
            <Header/>
            <HeaderImage/>
            <ListCourses/>
            <Footer/>
        </ValidateAdmin>
    </ValidateLogin>
  )
}
