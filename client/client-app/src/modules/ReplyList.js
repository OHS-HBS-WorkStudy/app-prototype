import { useState } from "react";
import ThreadVote from "./ThreadVote.js";

import DOMPurify from "dompurify";

export default function ReplyList() {
    const [listActive, activateList] = useState(false);

    try{
        let test;

        function setList(json) {
            console.log(json);
            test = json;
            console.log(test);
            sessionStorage.setItem("replies", JSON.stringify(test));
            activateList(true);
        }
        
        function getList(id) {
            fetch(sessionStorage.getItem("server_address")+"/replyList", {
                method: "POST",
                body: JSON.stringify({
                    thread_id: id
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
              })
            .then((response) => response.json())
            .then((json) => setList(json))
            .catch((error) => {
                console.log(error);
            })
        }

        

        getList(JSON.parse(sessionStorage.getItem("thread"))[2]);

      

        const replyDescription = document.getElementsByClassName("contents");


        if(listActive === true) {
            let values = JSON.parse(sessionStorage.getItem("replies"));
            // Saved for Friday Tmr to make it safer 
            // const sanitizedRepliesDesc = DOMPurify.sanitize(sessionStorage.getItem("thread")).contents;
            // console.log(sanitizedRepliesDesc);
            return(
                <div>
                    <div className="reply-section">

                    <div className="reply-list">
                    <div className="thread">
                    <div className="threadpage">
                <div id="thread-content">

                

                    <div className="reply submitted-content-desc">
                    <div className="reply-container">
                    {values.map(value =>
                    <div> 
                    <div className="thread-top reply">
                    <div className="thread-top-stats">
                                <h2>{value.user}</h2>
                        </div>
                        </div>
    
                        <div className="content-container"> 
                            <div className="vote-box">
                                <ThreadVote />                
                            </div>
    
                            <div className="submitted-content-desc" dangerouslySetInnerHTML={{ __html: value.contents }}></div>
                        </div>

                          
                        
                        </div>
                    )} 
                    </div>
                    </div>
                
        
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            
            ) 
        }else {
            return(
                <div>
                    <h2>No current Replies</h2>
                </div>
            )
        }
    }catch(err) {
        return(
            <div>
                <h2>No current Replies</h2>
            </div>
        )
    }
}