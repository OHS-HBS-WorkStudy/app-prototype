import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';


export default function NewThreadInput() {
    const [ThreadTitle, setThreadTitle] = useState("");
    const [ThreadContents, setThreadContents] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    const submitThread = (e) => {
        e.preventDefault();

        if (!ThreadTitle.trim() || !ThreadContents.trim()) {
            alert("Please fill out both forms before submitting.");
            return;
        }
    
        setIsLoading(true);

        setTimeout(() => {

            const sanitizedTitle = DOMPurify.sanitize(ThreadTitle);
            const sanitizedContents = DOMPurify.sanitize(ThreadContents);

            let user = JSON.parse(sessionStorage.getItem("user"));
            let data = {
                thread_name: sanitizedTitle,
                thread_contents: sanitizedContents,
                uuid: user.uuid
            }

            postThread(data);
            setIsLoading(false);
        }, 3000);
    };
    

    function postThread(val) {
        fetch("http://127.0.0.1:8000/createThread", {
            method: "POST",
            body: JSON.stringify(val),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then((response) => response.json())
            .then((json) => toHome(json));
    }

    function toHome(json) {
        console.log(json);
        //changeScreen(0);
      }

    return(
        <div>
      <div className="NewThread">
        <div className="center">
          <div className="input-container">
            <label htmlFor="text-box">Question Title</label>
            <div className="text-box">
              <ReactQuill theme="snow" value={ThreadTitle} onChange={setThreadTitle} placeholder="Enter Title" />
            </div>

            <label htmlFor="text-box">Question Description</label>
            <div className="text-box">
              <ReactQuill theme="snow"  value={ThreadContents} onChange={setThreadContents} placeholder="Enter Desc" />
            </div>

            <div className="btn-container">
                <button id="loadButton" className={`btn ${isLoading ? 'loading' : ''}`} onClick={submitThread} disabled={isLoading}>
                  Submit
                  {isLoading && <div className="loader" id="loader"></div>}
                </button>
            </div>
       
      </div>
      </div>
    </div>
    </div>
    );
}