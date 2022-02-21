import Button from "../../Button";
import StepWrapper from "../../StepWrapper";
import styles from './phoneStep.module.scss'
import NumberFormat from "react-number-format";
import {useContext, useState} from "react";
import {MainContext} from "../../../../pages";

export default function PhoneStep() {
    const {onNextStep, setFieldStep} = useContext(MainContext)
    const [phoneValue, setPhoneValue] = useState({})
    const nextDisabled = phoneValue.formattedValue && !phoneValue.formattedValue.includes('_')

    const onClickNextStep = () => {
        setFieldStep('phone', phoneValue.value)
        onNextStep()
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
                    Next
                    <img width={20} src="static/img/arrow.svg" alt=""/>
                </Button>
            </StepWrapper>
        </div>

    )
}