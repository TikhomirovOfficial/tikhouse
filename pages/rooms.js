import Header from "../src/components/Header";
import ConversationCard from "../src/components/ConversationCard";
import {useEffect, useState} from "react";
import Link from "next/link";
import {Router} from "next/router";
import { AuthInstance } from "../src/http/authInstance";
import { CheckAuth } from "../src/utils/checkAuth";
import Api from "../src/http/requests";
import Cookies from "nookies"
import { cookieNext } from "../src/utils/cookieNext";
import CreateRoomModal from "../src/components/CreateRoomModal";


export default function Rooms({user, rooms}) {
    console.log(rooms)
    const [createRoomModalIsOpened, setCreateRoomModalIsOpened] = useState(false)
    const handleCreateRoomModalIsOpened = () => setCreateRoomModalIsOpened(!createRoomModalIsOpened)
    return (
        <>
            <Header fullname={user.fullname}/>
            {
                createRoomModalIsOpened && <CreateRoomModal handleModal={handleCreateRoomModalIsOpened}/>
            }
            <div className="wrapper">
                <div className="contentTop flex-row-betw">
                    <h1>All conversations</h1>
                    <div onClick={handleCreateRoomModalIsOpened} className="createRoom c-white fw-5 cur-pointer">
                        + Start room
                    </div>
                </div>
                <div className="rooms flex-wrap d-f gap-30">
                    {
                        rooms.map((item, i) => (
                            <Link key={i} href={`/rooms/${item.id}`} >
                                <a className="d-f">
                                    <ConversationCard
                                        title={item.title}
                                        avatars={item.avatars}
                                        users={item.users}
                                        messagesCount={item.speakers.length}
                                        usersCount={item.listeners_count}
                                    />
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
    
    const userLogged = await CheckAuth(ctx)
    const {data} = await Api.getRooms(ctx)
    if (!userLogged) {
        return {
            redirect: {
                destination: '/auth'
            },
        }
    }
    return {
        props: {
            user: userLogged.data,
            rooms: data,

        }
    }
}