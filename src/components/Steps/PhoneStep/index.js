import Button from "../../Button";
import StepWrapper from "../../StepWrapper";
import styles from './phoneStep.module.scss'
import NumberFormat from "react-number-format";
import {useContext, useEffect, useState} from "react";
import {MainContext} from "../../../../pages";
import {useFetch} from "../../../hooks/useFetch";
import Api from "../../../http/requests";

export default function PhoneStep() {
    const {onNextStep, userData} = useContext(MainContext)
    const [phoneValue, setPhoneValue] = useState({})
    const nextDisabled = phoneValue.formattedValue && !phoneValue.formattedValue.includes('_')
    const [error, setError] = useState("")


    const onClickNextStep = async () => {
        await Api.registration({...userData, phone: phoneValue.value})
            .then((res) => {
                if (res.data) {
                    localStorage.setItem('phone', phoneValue.value)
                    onNextStep()
                }
            }).catch((e) => {
                setError(e.message)
            })
    }
    return (
        <div className="h-100v f-center-col">
            <StepWrapper className="bg-white flex-column al-center">
                <h2>Enter your phone number</h2>
                <NumberFormat
                    value={phoneValue.value}
                    className={styles.phoneNumber}
                    onValueChange={values => {
                        setPhoneValue(values)
                    }}
                    format="+# (###) ###-####"
                    placeholder="+7 (___) ___-____"
                    mask="_"
                />
                <Button onClick={onClickNextStep} disabled={!nextDisabled}>
                    Get code
                    <img width={20} src="static/img/arrow.svg" alt=""/>
                </Button>
            </StepWrapper>
            {
                error ? <p style={{marginTop: 10, fontSize: 14, color: "red"}} className="txt-center">{error}</p> : null
            }
        </div>

    )
}