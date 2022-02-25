import WelcomeStep from "../src/components/Steps/WelcomeStep";
import InputNameStep from "../src/components/Steps/InputNameStep";
import AvatarStep from "../src/components/Steps/AvatarStep";

import {useState, createContext} from "react";
import PhoneStep from "../src/components/Steps/PhoneStep";
import AcceptCodeStep from "../src/components/Steps/AcceptCodeStep";


export const MainContext = createContext({});

export default function Welcome() {
    const [step, setStep] = useState(4);
    const [userData, setUserData] = useState({})

    const onNextStep = () => {
      setStep(prev => prev += 1)
    }
    const setFieldStep = (field, value) => {
       setUserData(prev => ({
           ...prev,
           [field]: value
       }))
    }

    const steps = {
        0: WelcomeStep,
        1: InputNameStep,
        2: AvatarStep,
        3: PhoneStep,
        4: AcceptCodeStep
    };
    const Step = steps[step];
    console.log(userData)
    return (
        <MainContext.Provider value={{onNextStep, userData, setUserData, setFieldStep}}>
           <Step/>
        </MainContext.Provider>
    )
}
