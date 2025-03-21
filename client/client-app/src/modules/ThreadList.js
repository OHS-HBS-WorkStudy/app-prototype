import { useState, useContext } from "react";
import { ScreenStateContext } from "../App.js";
import DOMPurify from 'dompurify';
import BentoBox from "./BentoBox.js";
import ThreadFilter from "./ThreadFilter.js";
import Loader from './loadCheck.js';


export default function ThreadList() {
    const [listActive, activateList] = useState(false);




    const [index, changeIndex] = useState(getIndex);

    const [size, setSize] = useState(getSize());

    function getSize() {
        let val = Number(sessionStorage.getItem("size"));

        if(val === 0) {
            return 10;
        }else {
            return Number(val);
        }
    }


    function getIndex() {
        let val = Number(sessionStorage.getItem("current_index"));

        console.log(val);

        if(val === 0) {
            return 1;
        }else {
            return val;
        }
    }

    function getQuery() {
        let item = sessionStorage.getItem("query");

        if(item === null) {
            return ""
        }else {
            return item;
        }
    }

    let values = JSON.parse(sessionStorage.getItem("threads"));

    const totalPages = Number(sessionStorage.getItem("index_max"));
    //const startIndex = index;
    //const currentItems = setCurrentPage(Number(sessionStorage.getItem("current_index")));
    const currentItems = values;

    function count() {
        sessionStorage.setItem("size", 1);
        window.location.reload()
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
            test = json.list;
            console.log(test);
            sessionStorage.setItem("index_max", json.totalPages);
            sessionStorage.setItem("threads", JSON.stringify(test));
            activateList(true);
        }

        function getAgeType() {
            let data = sessionStorage.getItem("ageType");

            if(data === null) {
                return "newest";
            }else {
                return data;
            }
        
        }

        function getContentType() {
            let data = sessionStorage.getItem("contentType");

            if(data === undefined || data === null) {
                return "none";
            }else {
                return data;
            }
        }

        function getListNone() {
            let data = {
                index: index,
                size: size,
                query: getQuery(),
                ageType: getAgeType(),
                contentType: getContentType()
            }

            console.log(data);

            fetch(sessionStorage.getItem("server_address")+"/threadList",{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => response.json())
                .then((json) => setList(json))
                .catch((error) => {
                    console.log(error);
                    activateList(false)
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

      
        const saveData = [];
      
        console.log(saveData);
      

        //getList(isThereSearch);
        if(listActive === true) {
            return(
                <>
                 <Loader />
                    <div className="layout-wrapper">
                        <div className="nav-space"></div>
                        <div className="sidebar-space"></div>
                        <div className="layout-content">
                            <div className="Home">

                            <div className="container1">
                                <BentoBox />

                                <ThreadFilter index={index} totalPages={totalPages}/>


                                <div className="container2">
                                    <div className="grid-container">
                                        {currentItems.map((value, question) => 

                                            <ThreadButton value={value} />
                                            
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
                
            ) 
        }else {
            return(
                <div>
                     <div className="nav-space"></div>
                     <Loader />
                    <h2>No current Threads</h2>
                </div>
            )
        }
    }catch(err){
        console.log("err");
        return(
            <div>
                 <div className="nav-space"></div>
                 <Loader />
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
        fetch(sessionStorage.getItem("server_address")+"/retrieveThread", {
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

    try {
        const item = JSON.parse(sessionStorage.getItem(value));
        const getTag = item ? item.tags : "#No Tags";
        console.log(getTag);
    } catch(err) {
        console.log("err");
    }

    function threadGetTag() {
        const threadTag = value.tags;
        return threadTag.map((element) => {
            return(
                <div key={element}  className="grid-item-tags">
                    <p>{element}</p>
                </div>
            );
        });
    }

    return(
        <div className="grid-item" onClick={getThreadData} >
            <div className="left-info">
                <div className="vote-counter"><p>{value.score}</p></div>
                <div className="date-display"><p>{date}</p></div>
            </div>
            <div className="grid-item-content"> 
                <div className="grid-item-title">
                    {stripHTML(sanitizedName)}
                </div>
                <div className="grid-item-desc">
                    {stripHTML(sanitizedContents)}
                </div>
                <div className="grid-item-tags-container">

                        {threadGetTag()}
                </div>
            </div>
        </div>
    );
}