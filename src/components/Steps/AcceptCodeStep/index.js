import Button from "../../Button";
import StepWrapper from "../../StepWrapper";
import styles from './acceptCode.module.scss'
import {useState} from "react";
import clsx from "clsx";
import {PreloaderProcess} from "../../PreloaderProcess";
import {useRouter} from "next/router";
import {useFetch} from "../../../hooks/useFetch";;
import Api from "../../../http/requests";


export default function AcceptCodeStep() {
    const [codes, setCodes] = useState(['', '', '', ''])

    const router = useRouter()
    const nextDisabled = codes.some(value => !value)
    const userPhone = JSON.parse(localStorage.getItem('phone'))

    const [sendCode, isLoading, error] = useFetch(async() => {
        await Api.activateUser(userPhone, Number(codes.join('')))
            .then(res => {
                if(res.data) {
                    localStorage.clear()
                    router.push('/auth')
                }
            })
        
    })
    
    const handleChangeCodes = e => {
        const index = Number(e.target.getAttribute('id')) - 1;
        let value = e.target.value;
        if(value.length < 2) {
            setCodes(prev => {
                const newArr = [...prev]
                newArr[index] = value
                return newArr
            })
            if (e.target.nextSibling) {
                e.target.nextSibling.focus()
            }
        }
        else {
            e.target.value = codes[index]
        }

    }

    return (
        <div className="h-100v f-center-col">
            {
                isLoading ?
                    <PreloaderProcess textLoading='Please wait, verifying your phone...'/>
                    :
                <>
                    <StepWrapper className="bg-white flex-column al-center">
                        <h3>Please enter code your phone</h3>
                        <div className="gap-10 f-center-row">
                            {
                                [1, 2, 3, 4].map((index) => (
                                    <input
                                        className={clsx('txt-center', styles.codeInput)}
                                        key={index}
                                        placeholder='X'
                                        onChange={event => handleChangeCodes(event)}
                                        type="number"
                                        id={index}
                                    />
                                ))
                            }
                        </div>
                        <Button onClick={sendCode} disabled={nextDisabled}>
                            Accept <img width={20} src="static/img/arrow.svg" alt=""/>
                        </Button>
                    </StepWrapper>
                    {
                        error ? <p style={{marginTop: 10, fontSize: 14, color: "red"}} className="txt-center">{error}</p> : null
                    }
                </>
                
            }
        </div>
    )
}