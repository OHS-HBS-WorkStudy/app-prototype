import { useState, useContext, useEffect } from "react";
import { ScreenStateContext } from "../App.js";
import DOMPurify from 'dompurify';

export default function ThreadList({value}) {
    const [listActive, activateList] = useState(false);
    let index = 1;
    let size = 10

    let data = sessionStorage.getItem("size");
    console.log(data);

    if(data !== null) {
        console.log("oh no");
        size = data;
    }

    function getQuery() {
        let item = sessionStorage.getItem("query");

        if(item === null) {
            return ""
        }else {
            return item;
        }
    }

    try{
        let isThereSearch = sessionStorage.getItem("search_tag");

        if(isThereSearch === "" || isThereSearch === null || isThereSearch === undefined) {
            getListNone();
        }else {
            getListOne(isThereSearch);
        }

        let test;
    

        {/* JSON LIST*/}
        function setList(json) {
            console.log(json);
            test = json;
            console.log(test);
            sessionStorage.setItem("threads", JSON.stringify(test));
            activateList(true);
        }

        function getListNone() {
            fetch(sessionStorage.getItem("server_address")+"/threadList",{
                method: "POST",
                body: JSON.stringify({
                    index: index,
                    size: size,
                    query: getQuery()
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
        
        function getListOne(val) {
            fetch(sessionStorage.getItem("server_address")+"/searchTag", {
                method: "POST",
                body: JSON.stringify({
                    tag: val
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


        function count() {
            sessionStorage.setItem("size", 1);
            window.location.reload()
        }
    

        //getList(isThereSearch);
        if(listActive === true) {
            let values = JSON.parse(sessionStorage.getItem("threads"));
            return(
                <div>
                <div className="nav-space"></div>
                <div className="sidebar-space"></div>
                    <div className="Home">

                    <div className="container1">
                        <div className="bento-box">
                            <div className="col-left">
                                <div className="col-row row1">
                                    <div className="threadvisted">
                                        <h1>Thread History</h1>

                                        <div className="threadvisted-content">
                                            <p>No threads viewed yet</p>
                                        </div> 
                                    </div>
                                </div>

                                <div className="col-row row2">
                                    <div className="threadcreated">
                                        <h1>Your Threads</h1>

                                        <div className="threadcreated-content">
                                            <p>No threads created yet</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>

                            <div className="col-right">
                                <div className="col-row top">
                                    <div className="threadtrending">
                                        <h1 className="fire">Trending</h1>

                                        <div className="threadtrending-content">
                                            <p>No trends</p>
                                        </div>  
                                    </div>
                                </div>

                                <div className="col-row bottom">
                                    <div className="threadtrending">
                                        <h1>Credibility Score</h1>

                                        <div className="threadtrending-content">
                                            <p>No data yet</p>
                                        </div>  
                                    </div>
                                </div>
                            </div>
                        </div>
                            
{/* 
                        <div className="leftextra">
                            <h1>Thread Created</h1>
                            <div className="leftextracontent">
                                    <p>No threads viewed yet</p>
                            </div>
                        </div> */}


                         <div className="grid-container">
                            {values.map(value => 
                                <ThreadButton value={value} />
                            )}

                            <button onClick={count}>press Me</button>
                        </div>
                    </div>
                </div>
            </div>
                
            ) 
        }else {
            return(
                <div>
                     <div className="nav-space"></div>
                    <h2>No current Threads</h2>
                </div>
            )
        }
    }catch(err){
        console.log("err");
        return(
            <div>
                 <div className="nav-space"></div>
                <h2>No current Threads</h2>
            </div>
        )
    }
}

function ThreadButton({value}) {
    const switchScreen = useContext(ScreenStateContext);

    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      }

    function toThreadPage(json, data) {
        console.log(json);
        sessionStorage.setItem("thread", JSON.stringify(json));
        console.log(data);
        sessionStorage.setItem("thread_score", data.score);



        switchScreen(3);

    }
    function getThreadData() {
        fetch("http://127.0.0.1:8000/retrieveThread", {
            method: "POST",
            body: JSON.stringify(value),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "ngrok-skip-browser-warning": "69420"
            }
        })
        .then((response) => response.json())
        .then((json) => toThreadPage(json, value));
    }

    const stripHTML = (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
      };

    const sanitizedName = DOMPurify.sanitize(value.name);
    const sanitizedContents = DOMPurify.sanitize(value.content);
    const date = timeConverter(value.timestamp);
    console.log(date);
    return(

    
            <div className="grid-item" onClick={getThreadData} >
                <div className="vote-counter"><p>{value.score}</p></div>
                    <div className="grid-item-content"> 
                        <div className="grid-item-title">
                            {stripHTML(sanitizedName)}
                        </div>
                        <div className="grid-item-desc">
                            {stripHTML(sanitizedContents)}
                        </div>
                    </div>
                    <p>{date}</p>
            </div>

    )
}