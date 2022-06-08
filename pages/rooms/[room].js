import {useRouter} from "next/router";
import Header from "../../src/components/Header";
import Room from "../../src/components/Room";
import axios from "../../src/http/axios";
import Api from "../../src/http/requests";
import {CheckAuth} from "../../src/utils/checkAuth";
import {useState} from "react";
import CreateRoomModal from "../../src/components/CreateRoomModal";

export default function RoomPage({user, room}) {
    const [createRoomModalIsOpened, setCreateRoomModalIsOpened] = useState(false)
    const handleCreateRoomModalIsOpened = () => setCreateRoomModalIsOpened(!createRoomModalIsOpened)

    return (
        <>
            <Header fullname={user.fullname}/>
            {
                !createRoomModalIsOpened && <CreateRoomModal/>
            }
            <Room title={room.title}/>
        </>
    )
}
export const getServerSideProps = async (ctx) => {
    const userLogged = await CheckAuth(ctx)
    if (!userLogged) {
        return {
            redirect: {
                destination: '/auth'
            },
        }
    }

    const room_id = ctx.params.room
    const {data} = await Api.getRoom(room_id, ctx)

    return {
        props: {
            user: userLogged.data,
            room: data,

        }
    }
}
