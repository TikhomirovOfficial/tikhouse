import {useRouter} from "next/router";
import Header from "../../src/components/Header";
import Room from "../../src/components/Room";
import axios from "../../src/http/axios";

export default function RoomPage({room}) {
    return (
        <>
            <Header/>
            <Room title={room.title}/>
        </>
    )
}
export const getServerSideProps = async ({query}) => {
    try {
        const {data} = await axios.get(`/rooms/${query.room}`)
        console.log(data)
        return {
            props: {
                room: data
            }
        }
    } catch (e) {
        return {
            props: []
        }
    }
}
