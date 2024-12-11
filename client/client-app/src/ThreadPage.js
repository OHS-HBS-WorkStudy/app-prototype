import { useState } from 'react';

import Navigator from "./modules/Navigator.js";
import ThreadReply from "./modules/ThreadReply.js";
import ReplyList from "./modules/ReplyList.js";
import ThreadVote from "./modules/ThreadVote.js";

import profilePicture from './img/rriddler.png';

import DOMPurify from "dompurify";

export default function ThreadPage() {

    const [score, findScore] = useState(0);

    let data = JSON.parse(sessionStorage.getItem("thread"));

    console.log(data);

    const sanitizedTitle = DOMPurify.sanitize(data[0]);
    const sanitizedDesc = DOMPurify.sanitize(data[1]);

    function getCurrentVote(val) {
        fetch(sessionStorage.getItem("server_address")+"/scoreVotes", {
            method: "POST",
            body: JSON.stringify({thread_id:val}),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then((response) => response.json())
            .then((json) => giveVal(json));
    }

    function giveVal(val) {
        console.log(val);
        sessionStorage.setItem("thread_score", val);
    }

    getCurrentVote(data[2]);


     let user = JSON.parse(sessionStorage.getItem("user"))


     const [isReplyVisible, setIsReplyVisible] = useState(false);

     const toggleReplyForm = () => {
         setIsReplyVisible((prev) => !prev);
     };




    return(
        <div>
            <Navigator />
        <div className="threadnav-space"></div>
        <div className="thread">
            <div id="thread-content">
                <div className="left-section">
                    <div className="profile-container" draggable="false">
                        <img className="profile-picture" src={profilePicture} alt="Profile Picture" draggable="false" />
                        <h1>username</h1>
                    </div>

                    <div className="vote-box">
                                <ThreadVote />
                            
                            </div>
                    </div>
            

                <div className="content-container">
                    <div className="submitted-content-title" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
                    <div className="submitted-content-desc" dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
                </div>
                <button onClick={toggleReplyForm}>reply</button>
                </div>
                {isReplyVisible && (
                    <ThreadReply />
                )}
            </div>

            


        <ReplyList />
        </div>
        );
}

