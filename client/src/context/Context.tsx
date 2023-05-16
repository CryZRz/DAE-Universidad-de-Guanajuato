import { useEffect, useState, createContext } from "react";
import jsCookie from "js-cookie"
import axios from "axios"
import { UserDataIn } from "../Interfaces/Users";

const dataUserEx : UserDataIn = {
    token: "",
    id: 0,
    email: "",
    name: "",
    lastName: "",
    role: "",
    image: "",
    teamName: "",
    semesterId: 0,
    description: "",
    social: [{
        name: "",
        link: ""
    }]
}

export const DataContextLogin = createContext<{
    dataUser: UserDataIn, isLoading: boolean, err : boolean, updateInfo : () => Promise<void>, setIsLoading: (p: boolean) => void}>
    ({dataUser : dataUserEx, isLoading: false, err : false, updateInfo : updateInfo, setIsLoading: () => {}})

export function VerifyLoginContext({children} : { children: React.ReactNode }){

    const [dataUser, setDataUser] = useState<UserDataIn>(dataUserEx)
    const [loadDataUser, setLoadDataUser] = useState(false)
    const [userDataErr, setUserDataErr] = useState(false)
    const getTokenUser = jsCookie.get("token")

    useEffect(() => {
        async function verifyToken(token : string){
            try {
                const reqVerifyToken = await axios.get("http://localhost:3000/verify",{
                    headers : {
                        token
                    }
                })
                setDataUser(reqVerifyToken.data)
                console.log(reqVerifyToken.data)
                setLoadDataUser(true)
            } catch (e) {
                setUserDataErr(true)
            }
        }

        if (getTokenUser != undefined) {
            verifyToken(getTokenUser)
        }else{
            setUserDataErr(true)
        }
        
    }, [])

    async function updateInfo(){
        if (getTokenUser != undefined) {
            try {
                setLoadDataUser(false)
                const reqUpdateInfo = await axios.get("http://localhost:3000/refreshinfo/user",{
                headers: {
                    token: getTokenUser
                }
                })
                setDataUser(reqUpdateInfo.data)
                setLoadDataUser(true)
                jsCookie.remove("token")
                jsCookie.set("token", reqUpdateInfo.data.token)
            } catch (e) {
              setUserDataErr(true)  
            }
        } else {
            setUserDataErr(true) 
        }
    }

    function changeIsLoading(state: boolean){
        setLoadDataUser(state)
    }

    return(
        <DataContextLogin.Provider value={{ dataUser, isLoading: loadDataUser, err : userDataErr, updateInfo, setIsLoading: changeIsLoading }}>
            {children}
        </DataContextLogin.Provider>
    )

}

function updateInfo(): Promise<void> {
    throw new Error("Function not implemented.");
}
