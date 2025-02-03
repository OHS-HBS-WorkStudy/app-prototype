import { useState, useContext, useEffect } from "react";
import { ScreenStateContext } from "../App.js";
import CredScore from "./CredScore.js";
import DOMPurify from 'dompurify';


export default function ThreadList({value}) {
    const [listActive, activateList] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [threadHistory, setThreadHistory] = useState([]);

    const [search, searchWord] = useState("none");

    const [index, changeIndex] = useState(getIndex);

    const [list, giveList] = useState([]);

    function getIndex() {
        let val = Number(sessionStorage.getItem("current_index"));

        console.log(val);

        if(val === 0) {
            return 1;
        }else {
            return val;
        }
    }

    console.log(index)

    //let index = 1;
    let size = 2;

    const [currentPage, setCurrentPage] = useState(index);
    const itemsPerPage = 1; 
    const [inputPage, setInputPage] = useState(currentPage);

   

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

    const [tagInput, setTagInput] = useState("#");

    const tagInputChange = (e) => {
        const value = e.target.value;
        console.log(value)
        if (!value.startsWith("#")) {
            setTagInput("#");
        } else {
            setTagInput(value);
        }
      };

    const enterCheck = (e) => {
        if (e.key === "Enter") {
            if (tagInput.length > 1) {
                setTagInput("#");
                searchButton();
            } else {
              alert("Tag must be unique and not empty.");
            }
          }
    };

    function searchButton() {
        data = document.getElementById("customtag").value;
    
        sessionStorage.setItem("search_tag", data);
        searchWord(data);
        window.location.reload();
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
                    activateList(false);
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


        let values = JSON.parse(sessionStorage.getItem("threads"));


        


        const totalPages = Number(sessionStorage.getItem("index_max"));
        //const startIndex = index;
        //const currentItems = setCurrentPage(Number(sessionStorage.getItem("current_index")));
        const currentItems = values;

       
        const handlePreviousPage = () => {
          /*if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setInputPage(currentPage - 1);
          }*/
            sessionStorage.setItem("current_index", index - 1);

            window.location.reload()

            //changeIndex(index - 1);
        };
      
        const handleNextPage = () => {
          /*if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setInputPage(currentPage + 1);
          }*/

            sessionStorage.setItem("current_index", index + 1);

            window.location.reload()

            //changeIndex(index + 1);
        };
      
        const handleInputChange = (e) => {
          setInputPage(e.target.value);
        };
      
        const handleInputBlur = () => {
          const page = Math.max(1, Math.min(totalPages, parseInt(inputPage, 10) || 1));
          setCurrentPage(page);
          setInputPage(page);
          setIsEditing(false);
        };
      
        const handleInputKeyPress = (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleInputBlur();
          }
        };
      
        const saveData = [];
      
        console.log(saveData);
      
        const handleSpanClick = () => {
          setIsEditing(true);
        };

        //getList(isThereSearch);
        if(listActive === true) {
            return(
                <div className="layout-wrapper">
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
                                        {threadHistory.length > 0 ? (
                                threadHistory.map((value, history) => (
                                    <p
                                        key={history}
                                        className="history-item"
                                    >
                                        d
                                
                                    </p>
                                ))
                            ) : (
                                <p>No threads viewed yet</p>
                            )}
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
                                <div className="col-row bottom row1">
                                <div className="threadtrending">
                                        <h1>Credibility Score</h1>
                                        <div className="cred-content">


                                            <CredScore />
                                            </div>

                                    </div>

                                </div>
                                <div className="col-row bottom row2">
                                <div className="thread-sort">
                                        <h1>Sort</h1>
                                        

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

<div className="grid-header">
            <div className="title">Filter Options</div>
            <div className="dropdown">
              <label htmlFor="tagFilter" style={{ display: "none" }}>
                Category:

                
              </label>
              
            </div>
            <div className="dropdown">
              <label htmlFor="dateFilter" style={{ display: "none" }}>
                Date:
              </label>
              <select id="dateFilter" name="dateFilter">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <input 
                id="customtag" 
                className="tag-input-container" 
                value={tagInput}
                onChange={tagInputChange}
                onKeyDown={enterCheck}
                type="text" 
                placeholder="type in..."
                />
              
              <button onClick={searchButton}>search</button>
              

            <div className="thread-page">
      <button onClick={handlePreviousPage} disabled={index === 1}>
        &lt;
      </button>
      <span>
        Page{' '}
        {isEditing ? (
          <input
            type="number"
            value={inputPage}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyPress={handleInputKeyPress}
            style={{
              width: '40px',
              textAlign: 'center',
              border: 'none',
              borderBottom: '1px solid black',
              outline: 'none',
              fontSize: 'inherit',
              color: 'hsl(270, 20%, 22%)',
            }}
            min="1"
            max={totalPages}
            autoFocus
          />
        ) : (
          <span onClick={handleSpanClick} style={{ cursor: 'pointer', borderBottom: '1.5px ridge white', textAlign: 'center' }}>
            {index}
          </span>
        )}{' '}
        of {totalPages}
      </span>
      <button onClick={handleNextPage} disabled={index === totalPages}>
        &gt;
      </button>
    </div>
          </div>


                         <div className="grid-container">
                            {currentItems.map((value, question) => 
                         
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
                    </div>
            </div>

    )
}