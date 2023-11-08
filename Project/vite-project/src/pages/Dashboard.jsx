import { useState, useEffect } from "react";
import axios from 'axios'
import Header from "./components/Header";

export default function Dashboard() {

    const [searchResult, setSearchResult] = useState([]);
    const [key, setKey] = useState("");
    useEffect(() => {
        const search = async () => {
            try {
                if (!key.trim()) {
                    setSearchResult([])
                    return
                }
                const res = await axios.get('https://new-server-cvbw.onrender.com/Dashboard', {params: {key: key, limit: 5}})
                setSearchResult(res.data.data)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        search()
    }, [key])

    return (
        <div>
            <Header />
        <div className="padding">
    <div className="col-md-8">
        <div className="card"> <img className="card-img-top" src="./images/background.jpg" alt="Card image cap"/>
            <div className="card-body little-profile text-center">
                <div className="pro-img"><img src="./images/user.jpg" alt="user"/></div>
                <h3 className="m-b-0">Blank User</h3>
                <p>Artist</p> <button className="button main-btn">Follow</button>
                <div className="row text-center m-t-20">
                </div>
            </div>
        </div>
    </div>
</div>
</div>
);

};


