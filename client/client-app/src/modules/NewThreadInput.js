import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';

import AddTags from "./AddTags.js";






export default function NewThreadInput({value}) {
    const [ThreadTitle, setThreadTitle] = useState("");
    const [ThreadContents, setThreadContents] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const maxTitleLength = 200;
    const maxDescLength = 500;
    
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
            .then((json) => getTags(json));
    }

    function getTags(json) {
      let tags = document.getElementsByClassName("tag");

      if(tags.length > 0) {
        let tagData = [];

        for(let i = 0; i < tags.length; i++) {
          tagData.push(tags[i].value);
        }

        let data = {
          tag: tagData,
          thread_id: json.thread_id
        };

        postTags(data);
      }else {
        toHome();
      }
    }

    function postTags(data) {
      fetch("http://127.0.0.1:8000/addTags", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => toHome());
    }

    function toHome() {
        //changeScreen(0);
      }



  const getPlainText = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    return tempDiv.innerText || tempDiv.textContent;
  };

  const handleChange = (value, setValue, maxLength) => {
    const plainText = getPlainText(value);

    if (plainText.length <= maxLength) {
      setValue(value);
    }
  };

  const editorStyle = {
    width: "100%",
    minHeight: "160px",
    overflowY: "auto",
    backgroundColor: "white",
  };

  const editorStyle1 = {
    width: "100%",
    minHeight: "240px",
    overflowY: "auto",
    backgroundColor: "white",
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'size': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'align': [] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link', 'blockquote', 'code-block'],
      ['clean'],
    ],
  };

  return (
    <div>
      <div className="nav-space"></div>
      <div className="NewThread">
        <div className="center">
          <label htmlFor="text-box ql-container  ql-editor">Question Title</label>
          <div className="text-box ql-container ql-editor">
            <ReactQuill
              theme="snow"
              modules={modules}
              style={editorStyle}
              value={ThreadTitle}
              onChange={(value) => handleChange(value, setThreadTitle, maxTitleLength)}
              placeholder="Enter Question"
            />
            <div>{getPlainText(ThreadTitle).length}/{maxTitleLength} characters</div>
          </div>

          <label htmlFor="text-box ql-container  ql-editor">Question Description</label>
          <div className="text-box ql-container  ql-editor">
            <ReactQuill
              theme="snow"
              style={editorStyle1}
              modules={modules}
              value={ThreadContents}
              onChange={(value) => handleChange(value, setThreadContents, maxTitleLength)}
              placeholder="Enter Desc"
            />
            <div>{getPlainText(ThreadContents).length}/{maxDescLength} characters</div>
          </div>

          <AddTags />

          <button
            id="loadButton"
            className={`btn ${isLoading ? 'loading' : ''}`}
            onClick={submitThread}
            disabled={isLoading}
          >
            Submit
            {isLoading && <div className="loader" id="loader"></div>}
          </button>
        </div>
      </div>
    </div>
  );
}
