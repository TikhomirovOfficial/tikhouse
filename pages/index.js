import {useState, createContext, useEffect} from "react";

import WelcomeStep from "../src/components/Steps/WelcomeStep";
import InputNameStep from "../src/components/Steps/InputNameStep";
import AvatarStep from "../src/components/Steps/AvatarStep";
import PhoneStep from "../src/components/Steps/PhoneStep";
import AcceptCodeStep from "../src/components/Steps/AcceptCodeStep";
import PasswordStep from "../src/components/Steps/PasswordStep";



export const MainContext = createContext({});

export default function Welcome() {

    const localstorageExist = typeof localStorage !== 'undefined';
    const [userData, setUserData] = useState(localstorageExist ? JSON.parse(localStorage.getItem("signData")) || {} : {})
    const [step, setStep] = useState(0);


    const onNextStep = () => {
      setStep(prev => prev += 1)
    }
    const setFieldStep = (field, value) => {
       setUserData(prev => ({
           ...prev,
           [field]: value
       }))
    }
    useEffect(()=> {
        if(Object.keys(userData).length) {
            localStorage.setItem("signData", JSON.stringify(userData))
        }
    }, [userData])
    useEffect(() => {
        //const lenData = Object.keys(userData).length
      setStep(()=> {
          if(userData.phone || userData.password) {
              return 4
          }
          if(userData.full_name) {
              return 2
          }
      })
    }, [])

    const steps = {
        0: WelcomeStep,
        1: InputNameStep,
        2: AvatarStep,
        3: PasswordStep,
        4: PhoneStep,
        5: AcceptCodeStep
    };

    const Step = steps[step];

    return (
        <MainContext.Provider value={{onNextStep, userData, setUserData, setFieldStep}}>
           <Step/>
        </MainContext.Provider>
    )
}
