import {useRouter} from "next/router";
import Button from "../../src/components/Button";
import Header from "../../src/components/Header";
import BackButton from "../../src/components/BackButton";

export default function Profile () {
    const router = useRouter()
    const {user} = router.query
    console.log(user)
    return (
        <>
            <Header/>
            <div className="wrapper">
                <div className="profileContent">
                   <BackButton title="Back" href="/rooms" />
                    <div className="topInfo flex-row-betw">
                        <div className="infoUser f-center-row gap-20">
                            <img width={90} height={90} src="http://placeimg.com/300/300/any" alt="" className="avatar"/>
                            <div className="textInfo f-center-row gap-20">
                                <div className="infoNames">
                                    <h2>Tikhomirov Artem</h2>
                                    <h3>@tikhomirov</h3>
                                </div>
                                <div className="d-f al-center gap-10">
                                    <Button className="cur-pointer">
                                        Follow
                                    </Button>
                                    <img className="cur-pointer" height={20} src="/static/img/dotsProfile.svg" alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="userState bg-white d-f gap-20">
                            <div className="stateItem txt-center">
                                <h1>10</h1>
                                <h3>Followers</h3>
                            </div>
                            <div className="stateItem txt-center">
                                <h1>5</h1>
                                <h3>Following</h3>
                            </div>
                        </div>
                    </div>
                    <p>The most important information about this profile</p>

                </div>
            </div>
        </>
    )
}