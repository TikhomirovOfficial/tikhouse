import Button from "../../Button";
import StepWrapper from "../../StepWrapper";
import styles from './InputNameStep.module.scss'
import {useContext, useState} from "react";
import {MainContext} from "../../../../pages";

export default function InputNameStep () {
    const [nameValue, setNameValue] = useState('')
    const nextDisabled = nameValue || nameValue.length >= 1
    const {onNextStep, setFieldStep} = useContext(MainContext)

    const onClickNextStep = () => {
        setFieldStep('full_name', nameValue)
        onNextStep()
    }
    return (
        <div className="h-100v f-center-col">
            <StepWrapper className="bg-white flex-column al-center">
                <h2>Please, Enter your name</h2>

                <p>
                    Please use real names Clubhouse.
                </p>
                <input value={nameValue} onChange={e => setNameValue(e.target.value)} type="text" className={styles.inputName}/>
                <Button onClick={onClickNextStep} disabled={!nextDisabled}>
                    Next
                    <img width={20} src="static/img/arrow.svg" alt=""/>
                </Button>
            </StepWrapper>
        </div>

    )
}