import { ReactNode, useEffect, useContext } from 'react'
import { DataContextLogin } from '../context/Context'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'

export default function ValidateLogin({children} : {children : ReactNode}) {

    const navigate = useNavigate()
    const {err, isLoading} = useContext(DataContextLogin)

    useEffect(() => {
        if (err) {
            navigate("/")
        }
    }, [err])

  return (
    <>
    {
        isLoading ?
        children
        :
        <Loading/>
    }
    </>
  )
}
