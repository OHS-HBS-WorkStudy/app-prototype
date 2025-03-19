import { useState, useRef } from "react";
import ReactQuill from "react-quill";


import "react-quill/dist/quill.snow.css";

export default function ThreadReply() {
    const [questionDesc, setQuestionDesc] = useState('');

    const quillRef = useRef(null);


    function ReplyButton() {
        let data = {
            contents: questionDesc,
            thread_id: JSON.parse(sessionStorage.getItem("thread"))[2],
            uuid: JSON.parse(sessionStorage.getItem("user")).uuid
        }

        console.log(data);

        PostReply(data);
    }

    function PostReply(data) {
        fetch(sessionStorage.getItem("server_address")+"/createReply", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then((response) => response.json())
            .then((json) => window.location.reload());
    }



    const maxReplyLength = 10000;

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


    return(
        <div className="reply-section">
                <div className="reply-header">
                    <h2>Reply to Thread</h2>
                </div>
                <div className="reply-container">
                <ReactQuill
                    id="questionDesc"
                    ref={quillRef}
                    value={questionDesc}
                    style={{ borderRadius: '8px', minHeight: '100px' }}
                    modules={modules}
                    onChange={(value) =>
                        handleQuillChange(value, setQuestionDesc, maxReplyLength, quillRef)
                      }
                />

<div className="charCounter">{getPlainText(questionDesc).length}/{maxReplyLength} characters</div>
                    <button className="btn-send" onClick={ReplyButton}>
                        Send
                    </button>
                </div>
            </div>
    );
}