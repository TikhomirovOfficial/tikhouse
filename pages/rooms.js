import Header from "../src/components/Header";
import ConversationCard from "../src/components/ConversationCard";
import {useEffect, useState} from "react";
import axios from "../src/core/axios";
import Link from "next/link";

export default function Rooms({rooms = []}) {
    return (
        <>
            <Header/>
            <div className="wrapper">
                <div className="contentTop flex-row-betw">
                    <h1>All conversations</h1>
                    <div className="createRoom c-white fw-5 cur-pointer">
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
                                        messagesCount={item.messagesCount}
                                        usersCount={item.usersCount}
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

export const getServerSideProps = async () => {
    try {
        const {data} = await axios.get('/rooms')
        console.log('Worked')
        return {
            props: {
                rooms: data
            }
        }
    } catch (e) {
        return {
            props: []
        }
    }
}