import React, { useState, useRef, useContext } from "react";
import { ScreenStateContext } from "../App.js";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from 'dompurify';

import AddTags from "./AddTags.js";
import TagList from "./TagList.js";

export default function NewThreadInput({value}) {
    const[ThreadTitle, setThreadTitle] = useState("");
    const [ThreadContents, setThreadContents] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const switchScreen = useContext(ScreenStateContext);

    const maxTitleLength = 200;
    const maxDescLength = 10000;

    const quillRef = useRef(null);
    
    const submitThread = (e) => {
        e.preventDefault();
    
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

            console.log(data);


            postThread(data);

            setIsLoading(false);
        }, 3000);
    };
    

    function postThread(val) {
        fetch(sessionStorage.getItem("server_address")+"/createThread", {
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
          tagData.push(tags[i].innerText);
          console.log(tagData);
        }

        let data = {
          tag: tagData,
          thread_id: json.thread_id
        };

        postTags(data);
      }else {
        getThreadData(json.thread_id);
      }
    }

    function postTags(data) {
      fetch(sessionStorage.getItem("server_address")+"/addTags", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => getThreadData(data.thread_id));
    }

    function getThreadData(value) {
      fetch(sessionStorage.getItem("server_address")+"/retrieveThread", {
          method: "POST",
          body: JSON.stringify({id:value}),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
              "ngrok-skip-browser-warning": "69420"
          }
      })
      .then((response) => response.json())
      .then((json) => toThreadPage(json));
      }

      function toThreadPage(json) {
        console.log(json);
        sessionStorage.setItem("thread", JSON.stringify(json));

        switchScreen(3);
    }
        
    const getPlainText = (htmlContent) => {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      return tempDiv.innerText || tempDiv.textContent;
    };
    
    const handleQuillChange = (value, setValue, maxLength, quillRef) => {
      const plainText = getPlainText(value);
    
      if (plainText.length <= maxLength) {
      setValue(value);
      } else {  
      const quillText = quillRef.current.getEditor().getContents();
      const cutQuillText = quillText.slice(0, maxLength);
      setValue(cutQuillText);
    
      const editor = quillRef.current.getEditor();
      editor.setContents(cutQuillText); 
      editor.setSelection(maxLength); 
      }
    };
    
    const handleChange = (value, setValue, maxLength) => {
      const plainText = getPlainText(value);
      if (plainText.length <= maxLength) {
      setValue(value); 
      } else {
      setValue(value.substring(0, maxLength)); 
      }
    };

      const editorStyle = {
        width: "100%",
        minHeight: "160px",
        overflowY: "auto",
        border: "black",
      };



  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" },],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
      [{ indent: "-1" }, { indent: "+1" }, { background: [] }],
      ["clean"], 
    ]
  };

  return (
    <div>

      
      <div className="NewThread">
        <div className="center">
<div className="fill">
        <label htmlFor="questionTitle" className="threadDir"><h1>Question Title</h1></label>
        </div>
          <div className="input-container text-box ql-container">
         
            <input
              id="questionTitle"
              className="input-container"
              placeholder="Enter Question Title"
              value={ThreadTitle}
              onChange={(e) =>
                handleChange(e.target.value, setThreadTitle, maxTitleLength)
              }
            />
            <div className="charCounter">{getPlainText(ThreadTitle).length}/{maxTitleLength} characters</div>
          </div>

          <div className="fill">
          <label htmlFor="questionDesc" className="threadDir"><h1>Question Description</h1></label>
            </div>
          <div className="input-container text-box ql-container">
          
            <ReactQuill
              id="questionDesc"
              ref={quillRef}
              style={editorStyle}
              value={ThreadContents}
              onChange={(value) =>
                handleQuillChange(value, setThreadContents, maxDescLength, quillRef)
              }
              modules={modules}
            />
            <div className="charCounter">{getPlainText(ThreadContents).length}/{maxDescLength} characters</div>
          </div>

          <AddTags />
          <div className="loadButton container">
          <div className={`loadButton ${isLoading ? "loading" : ""}`}>
            <button onClick={submitThread} disabled={isLoading} >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
