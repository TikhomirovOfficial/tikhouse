import React, {useState} from 'react';
import PopupWrapper from "../PopupWrapper";
import styles from './createRoomModal.module.scss'
import Button from "../Button";
import Api from "../../http/requests";
import {useRouter} from "next/router";

const CreateRoomModal = ({handleModal}) => {
    const [roomTitle, setRoomTitle] = useState('')
    const router = useRouter()

    const createRoomModalReq = async () => {
        const {data} = await Api.createRoom(roomTitle)
        router.push(`/rooms/${data.id}`)
    }
    return (
        <PopupWrapper closePopup={handleModal}>
            <div onClick={e => e.stopPropagation()} className={`${styles.createRoomBlock} bg-white flex-column gap-15`}>

                <div className="flex-row-betw">
                    <h1>Create room</h1>
                    <img className="cur-pointer" width={20} onClick={handleModal} src="/static/img/close.svg" alt=""/>
                </div>
                <div className="flex-column gap-5">
                    <p>Enter the title of room</p>
                    <input value={roomTitle} onChange={e => setRoomTitle(e.target.value)} type="text" className={styles.createRoomInput}/>
                </div>
                <Button onClick={createRoomModalReq} className={`cur-pointer ${styles.createRoomButton}`}>Create</Button>

            </div>
        </PopupWrapper>
    );
};

export default CreateRoomModal;