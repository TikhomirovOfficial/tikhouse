import Button from "../../Button";
import StepWrapper from "../../StepWrapper";
import styles from './welcome.module.scss'
import {useContext} from "react";
import {MainContext} from "../../../../pages";


export default function WelcomeStep () {
    const {onNextStep} = useContext(MainContext)
    return (
        <div className="h-100v f-center-col">
            <StepWrapper className="bg-white flex-column al-center">
                <div className='gap-10 f-center-row'>
                    <div className={styles.palmAnim}>👋</div>
                    <h2>Welcome to Clubhouse</h2>
                </div>
                <p>
                    Hello, It is my clone app Clubhouse with React.js and Next.js, please click the button in bottom:)
                </p>
                <Button onClick={onNextStep}>
                    Get your username
                    <img width={20} src="static/img/arrow.svg" alt=""/>
                </Button>
                <div className="link__sign">
                    If you have the the congration, sing in.
                </div>
            </StepWrapper>
        </div>
    )
}