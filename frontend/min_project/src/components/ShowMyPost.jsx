import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function ShowMyPost () {
    const [data, setData] = useState([])
    const [hosam, setHosam] = useState(null)

    const navigation = useNavigate()
    // FETCH DATA FUNCTION

    const url = "http://localhost:3001/post/me"
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${token}`
                    },
                    credentials: 'include'
                })
                const data = await result.json()
                setData(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [url])
    console.log(data)
    if (data.length === 1) {
        return <div key={data._id} className="card m-2" style={{ width: "18rem", minHeight: "300px" }}>
            <img src={data.postPicture} className="card-img-top h-75" alt="..." />
            <div className="card-body">
                <h5 className="card-title text-black">{data.title}</h5>
                <p className="card-text text-black">{data.content}</p>
                <p className='card-text text-black' >{data.postId}</p>
            </div>
        </div>
    }
    return (
        <main className='m-5 d-flex flex-wrap'>
            <section className=' d-flex flex-wrap'>
                {data.map(post => (
                    <div key={post._id} className="card m-2" style={{ width: "18rem", minHeight: "300px" }}>
                        <img src={post.postPicture} className="card-img-top h-75" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-black">{post.title}</h5>
                            <p className="card-text text-black">{post.content}</p>
                            <p className='card-text text-black' >{post.postId}</p>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
}
