import {useState} from "react";
import StepWrapper from "../src/components/StepWrapper";
import styles from "../src/components/Steps/PhoneStep/phoneStep.module.scss";
import NumberFormat from "react-number-format";
import Button from "../src/components/Button";
import Api from "../src/http/requests";
import Cookies from 'nookies'
import {useRouter} from "next/router";
import { CheckAuth } from "../src/utils/checkAuth";

export default function Auth() {
    const router = useRouter()
    const [phoneValue, setPhoneValue] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const Login = () => {
        Api.login({
            phone: phoneValue.value,
            password: password
        })
        .then(() => {
            location.href = '/rooms'
        })
        .catch((e) => {
            setError(e.message)
        })
    }
    
    return (
        <div className="h-100v f-center-col">
            <StepWrapper className="bg-white flex-column al-center">
                <h2>Login to Clubhouse</h2>
                <div className="flex-column gap-15">
                    <NumberFormat
                        value={phoneValue.value}
                        className="login__field"
                        onValueChange={values => {
                            setPhoneValue(values)
                        }}
                        format="+# (###) ###-####"
                        placeholder="+7 (___) ___-____"
                        mask="_"
                    />
                    <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="Password" className="login__field"/>
                </div>
                <Button onClick={Login}>Login</Button>
            </StepWrapper>
            {
                error && <p style={{marginTop: 10, fontSize: 14, color: "red"}} className="txt-center">{error}</p>
            }
        </div>

    )
}
export const getServerSideProps = async (ctx) => {
    const userLogged = await CheckAuth(ctx)
    
    if (userLogged) {
        return {
            redirect: {
                destination: '/rooms'
            },
        }
    }
    return {
        props: {}
    }
}