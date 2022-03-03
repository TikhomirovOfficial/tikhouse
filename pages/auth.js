import {useState} from "react";
import axios from "../src/core/axios";
import StepWrapper from "../src/components/StepWrapper";
import styles from "../src/components/Steps/PhoneStep/phoneStep.module.scss";
import NumberFormat from "react-number-format";
import Button from "../src/components/Button";

export default function Auth() {
    const [phoneValue, setPhoneValue] = useState("")
    const [password, setPassword] = useState("")

    console.log(password)
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
                <Button>Login</Button>

            </StepWrapper>
        </div>

    )
}
