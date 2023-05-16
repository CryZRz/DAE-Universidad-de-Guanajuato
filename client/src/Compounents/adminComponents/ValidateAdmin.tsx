import { ReactNode, useEffect, useContext } from 'react'
import { DataContextLogin } from '../../context/Context'
import { useNavigate } from 'react-router-dom'

export default function ValidateAdmin({children} : {children : ReactNode}) {

    const navigate = useNavigate()
    const {dataUser} = useContext(DataContextLogin)

    useEffect(() => {
        if (dataUser.role != "admin") {
          navigate("/inicio")
        }
    }, [])

  return (
    <>
    {children}
    </>
  )
}