import React, { useState } from "react"
import { useNavigate } from "react-router";

// React bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function Post () {
    const navigate = useNavigate()
    const [postContent, setPostContent] = useState("")
    const [postTitle, setPostTitle] = useState("")
    const [postPicture, setPostPicture] = useState()

    const handlePost = async (e) => {
        e.preventDefault();
        if (!postTitle || !postContent) {
            alert("Please fill all the field")
        }
        try {
            const formData = new FormData();
            formData.append("title", postTitle);
            formData.append("content", postContent);
            formData.append("postPicture", postPicture);

            const response = await fetch(`http://localhost:3001/post`, {

                method: "POST",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: formData,
                credentials: "include"

            });
            if (response.ok) {
                if (response.status === 200) {
                    navigate("/secrets/showPost")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="container d-flex justify-content-start">
            <form action="#" method="post" className="container w-50 d-flex justify-content-start flex-column" onSubmit={(e) => handlePost(e)}>
                <div class="mb-3">
                    <label class="label">Title</label>
                    <input type="text" name="title" placeholder="write a title" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Post content</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="postText" placeholder="write your post" value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">add a picture</label>
                    <input type="file" name="postPicture" placeholder="upload a picture" onChange={(e) => { if (e.target.files.length > 0) setPostPicture(e.target.files[0]) }} />
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
            </form>
        </div>


    )
}