import { useState, useContext, useEffect } from 'react';

import Navigator from "./modules/Navigator.js";
import ThreadReply from "./modules/ThreadReply.js";
import ReplyList from "./modules/ReplyList.js";
import ThreadVote from "./modules/ThreadVote.js";

import profilePicture from './img/rriddler.png';

import DOMPurify from "dompurify";

import { LoggedinState } from './App.js';

export default function ThreadPage() {

    const [score, findScore] = useState(0);
    const loggedin = useContext(LoggedinState);

    const [relies, getReliesCount] = useState(0);

    let data = JSON.parse(sessionStorage.getItem("thread"));

    console.log(data);

    const sanitizedTitle = DOMPurify.sanitize(data[0]);
    const sanitizedDesc = DOMPurify.sanitize(data[1]);

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' at ' + hour + ':' + min + ':' + sec ;
        return time;
      }

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

    function nowViewing() {
        let data = {
            thread_id: JSON.parse(sessionStorage.getItem("thread"))[2],
            user_id: JSON.parse(sessionStorage.getItem("user")).uuid
        }

        fetch(sessionStorage.getItem("server_address")+"/createView", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
    }

    if(loggedin === true) {
        nowViewing();
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


     const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => { 
        setHasLoaded(true); 
        console.log("loaded");

        
    }, []);


    return(
        <div>
            <Navigator />
            <div>
            <div className="threadnav-space"></div>
            <div className={`thread ${hasLoaded ? "" : "play"}`}>
                <div className="threadpage">
                <div id="thread-content">

                <div className="thread-top">
                        <div className="submitted-content-title" dangerouslySetInnerHTML={{ __html: sanitizedTitle }} />
                        <div className="thread-top-stats">
                            <p>Created By: {data[4]}</p>
                            <p>Creation Date: {timeConverter(data[3])}</p>
                            <p>Viewed: {data[5]}</p>
                        </div>
                    </div>
                    
                <div className="content-container">

                <div className="vote-box">
                                <ThreadVote />
                            
                            </div>

                    
                    <div className="submitted-content-desc" dangerouslySetInnerHTML={{ __html: sanitizedDesc }} />
                </div>

                <ThreadReply />

                <div className="Replylist">
                    <div className="ReplylistTop">
                        <h1 id="reply-counter">Replies: {relies}</h1>
                    </div>

                    <ReplyList getCount={getReliesCount}/>

                </div>
                
                </div>
            </div>
        </div>
        </div>
        </div>
 
        );
}

