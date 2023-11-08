import { useState, useEffect } from "react";
import axios from 'axios'
export default function VenueDashboard() {

    const [searchResult, setSearchResult] = useState([]);
    const [key, setKey] = useState("");
    useEffect(() => {
        const search = async () => {
            try {
                if (!key.trim()) {
                    setSearchResult([])
                    return
                }
                const res = await axios.get('https://new-server-cvbw.onrender.com/VenueDashboard', {params: {key: key, limit: 5}})
                setSearchResult(res.data.data)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }
        search()
    }, [key])

    return (
        hello
);

};


