import Button from "../../Button";
import StepWrapper from "../../StepWrapper";
import styles from './passwordStep.module.scss'
import {useContext, useState} from "react";
import {MainContext} from "../../../../pages";

export default function InputNameStep () {
    const [passwordValue, setPasswordValue] = useState('')
    const {onNextStep, setFieldStep} = useContext(MainContext)

    const specialSymbolsExist = passwordValue.search(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g) !== -1
    const nextDisabled = specialSymbolsExist


    const onClickNextStep = () => {
        setFieldStep('password', passwordValue)
        onNextStep()
    }
    return (
        <div className="h-100v f-center-col">
            <StepWrapper className="bg-white flex-column al-center">
                <h2>Please, Enter password</h2>

                <p>
                    Use special symbols, uppercase, digits
                </p>
                <input value={passwordValue} onChange={e => setPasswordValue(e.target.value)} type="password" className={styles.inputName}/>
                <Button onClick={onClickNextStep} disabled={!nextDisabled}>
                    Next
                    <img width={20} src="static/img/arrow.svg" alt=""/>
                </Button>
            </StepWrapper>
        </div>

    )
}