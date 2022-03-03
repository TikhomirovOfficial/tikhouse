import Button from "../../Button";
import StepWrapper from "../../StepWrapper";
import styles from './acceptCode.module.scss'
import {useState} from "react";
import clsx from "clsx";
import {PreloaderProcess} from "../../PreloaderProcess";
import {useRouter} from "next/router";

export default function AcceptCodeStep() {
    const [codes, setCodes] = useState(['', '', '', ''])
    const nextDisabled = codes.some(value => !value)
    const router = useRouter();

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

    const submit = () => {
        setIsLoading(true)
    }
    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="h-100v f-center-col">
            {
                isLoading ?
                    <PreloaderProcess textLoading='Please wait, verifying your phone...'/>
                    :
                    <StepWrapper className="bg-white flex-column al-center">

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
                        <Button onClick={submit} disabled={nextDisabled}>
                          Accept <img width={20} src="static/img/arrow.svg" alt=""/>
                        </Button>
                    </StepWrapper>
            }
        </div>
    )
}