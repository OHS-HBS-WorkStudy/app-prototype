import ReactQuill from "react-quill";
import { useState } from "react";

export default function ThreadReply() {
    const [questionDesc, setQuestionDesc] = useState('');


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

    const getPlainText = (htmlContent) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlContent;
        return tempDiv.innerText || tempDiv.textContent;
    };

    const handleQuillChange = (value) => {
        const maxLength = 500; 
        const plainText = getPlainText(value);
    
        if (plainText.length <= maxLength) {
            setQuestionDesc(value); 
        } else {
            const cutValue = value.slice(0, maxLength);
            setQuestionDesc(cutValue);
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
                    value={questionDesc}
                    onChange={handleQuillChange}
                    style={{ borderRadius: '8px', minHeight: '100px' }}
                    modules={modules}
                />
                    <button className="btn-send" onClick={ReplyButton}>
                        Send
                    </button>
                </div>
            </div>
    );
}