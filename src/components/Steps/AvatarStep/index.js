import Button from "../../Button";
import StepWrapper from "../../StepWrapper";
import styles from './avatarStep.module.scss'
import {useContext, useEffect, useRef, useState} from "react";
import {MainContext} from "../../../../pages";
import {Axios} from "../../../core/axios";

export default function AvatarStep() {
    const {onNextStep, setFieldStep} = useContext(MainContext)
    const InputAvatar = useRef();
    const [Avatar, setAvatar] = useState()

    const uploadFile = (file) => {
        const form = new FormData();
        form.append('photo', file);

        Axios.post('/upload', form, {
            headers: {"Content-Type": 'multipart/form-data'}
        }).then((res) => {
            setAvatar(res.data)
        })

    }
    const handleAvatar = (e) => {
        const imgFile = e.target.files[0]
        if (imgFile) {
            uploadFile(imgFile)
        }
    }
    const onClickNextStep = () => {
        Avatar ? setFieldStep('avatar', Avatar) : null
        onNextStep()
    }
    useEffect(() => {
        if (InputAvatar.current) {
            InputAvatar.current.addEventListener('change', handleAvatar)
        }
    }, [])

    return (
        <div className="h-100v f-center-col">
            <StepWrapper className="bg-white flex-column al-center">
                <h2>Please, choose your avatar</h2>
                <img className={styles.avataImg} height={80} width={80} src={Avatar ? Avatar : 'static/img/primaryAvatar.png'} alt=""/>
                <div>
                    <label htmlFor="chooseAvatar" className={styles.chooseAvatarLabel}>Choose photo</label>
                    <input hidden id="chooseAvatar" type="file" ref={InputAvatar}/>
                </div>
                <Button onClick={onClickNextStep}>
                    Next <img width={20} src="static/img/arrow.svg" alt=""/>
                </Button>
            </StepWrapper>
        </div>

    )
}