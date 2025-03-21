import { useState, useRef, useEffect } from "react";


export default function ThreadFilter({data, searchButton, totalPages, index}) {
    const [isEditing, setIsEditing] = useState(false);
    const [search, searchWord] = useState("none");

    const [filterOpen, setFilterOpen] = useState(false); 
    const filterButtonRef = useRef(null); 
    const dropdownRef = useRef(null);




    const [list, giveList] = useState([]);

    
    function setMath() {
      sessionStorage.setItem("search_tag", "#math");
      window.location.reload();
    }

    function setEnglish() {
      sessionStorage.setItem("search_tag", "#english");
      window.location.reload();
    }

    function setScience() {
      sessionStorage.setItem("search_tag", "#science");
      window.location.reload();
    }

    function setSocialStudies() {
      sessionStorage.setItem("search_tag", "#socialstudies");
      window.location.reload();
    }

    function setNewest() {
      sessionStorage.setItem("ageType", "newest");
      window.location.reload();
    }

    function setOldest() {
      sessionStorage.setItem("ageType", "oldest");
      window.location.reload();
    }

    function setTen() {
      sessionStorage.setItem("size", 10);
      window.location.reload();
    }

    function setTwentyFive() {
      sessionStorage.setItem("size", 25);
      window.location.reload();
    }

    function setFifty() {
      sessionStorage.setItem("size", 50);
      window.location.reload();
    }

    function setHundred() {
      sessionStorage.setItem("size", 100);
      window.location.reload();
    }

    function setMost() {
      sessionStorage.setItem("contentType", "likes");
      window.location.reload();
    }

    function setViewed() {
      sessionStorage.setItem("contentType", "views");
      window.location.reload();
    }

    function setReplies() {
      sessionStorage.setItem("contentType", "replies");
      window.location.reload();
    }

    function setPinned() {
      if(filterOpen === true) {
        let data = sessionStorage.getItem("contentType"); 

        if(data === "likes") {
          document.getElementById("sortLikes").checked = true;
          //document.getElementsByName("sortBy")[3].checked = true;
        }else if(data === "views") {
          document.getElementById("sortViews").checked = true;
          //document.getElementsByName("sortBy")[1].checked = true;
        }else if(data === "replies") {
          document.getElementById("sortComments").checked = true;
          //document.getElementsByName("sortBy")[2].checked = true;
        }
      }
    }

    function setSizePinned() {
      if(filterOpen === true) {
        let data = sessionStorage.getItem("size"); 

        if(data === "10") {
          document.getElementById("thread10").checked = true;
          //document.getElementsByName("sortBy")[3].checked = true;
        }else if(data === "25") {
          document.getElementById("thread25").checked = true;
          //document.getElementsByName("sortBy")[1].checked = true;
        }else if(data === "50") {
          document.getElementById("thread50").checked = true;
          //document.getElementsByName("sortBy")[2].checked = true;
        }else if(data === "100") {
          document.getElementById("thread100").checked = true;
          //document.getElementsByName("sortBy")[2].checked = true;
        }
      }
    }

    function setAgePinned() {
      if(filterOpen === true) {
        let data = sessionStorage.getItem("ageType"); 

        if(data === "newest") {
          document.getElementById("newest").checked = true;
          //document.getElementsByName("sortBy")[3].checked = true;
        }else if(data === "oldest") {
          document.getElementById("oldest").checked = true;
          //document.getElementsByName("sortBy")[1].checked = true;
        }
      }
    }

    function setSubjectPinned() {
      if(filterOpen === true) {
        let data = sessionStorage.getItem("search_tag"); 

        if(data === "#math") {
          document.getElementById("math").checked = true;
          //document.getElementsByName("sortBy")[3].checked = true;
        }else if(data === "#english") {
          document.getElementById("english").checked = true;
          //document.getElementsByName("sortBy")[1].checked = true;
        }else if(data === "#science") {
          document.getElementById("science").checked = true;
          //document.getElementsByName("sortBy")[2].checked = true;
        }else if(data === "#socialstudies") {
          document.getElementById("socialstudies").checked = true;
          //document.getElementsByName("sortBy")[2].checked = true;
        }
      }
    }


    const [currentPage, setCurrentPage] = useState(index);
    const itemsPerPage = 1; 
    const [inputPage, setInputPage] = useState(currentPage);


    function searchButton() {
        data = document.getElementById("customtag").value;
    
        sessionStorage.setItem("search_tag", data);
        searchWord(data);
        window.location.reload();
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

        const handleSpanClick = () => {
            setIsEditing(true);
          };


  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterButtonRef.current && !filterButtonRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)
      ) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const radioButtons = document.querySelectorAll('.dropdown input[type="radio"]');


let lastSelectedButton = null;

radioButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const clickedButton = event.target;

    if (lastSelectedButton === clickedButton) {
      clickedButton.checked = false;
      lastSelectedButton = null; 
    } else {
      lastSelectedButton = clickedButton; 
    }
  });
});


    return(
      <div>
        <div className={`grid-header ${filterOpen ? "open" : ""}`}>
        <div className="title">Manager</div>
            <div className="dropdown">
              <label htmlFor="tagFilter" style={{ display: "none" }}>
                Category:

                
              </label>
              
            </div>


              <button
                ref={filterButtonRef}
                onClick={toggleFilter}
                aria-expanded={filterOpen ? "true" : "false"}
                className="filter-button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/></svg>
                Filter
              </button>
              

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

        <div
                ref={dropdownRef}
                className={`dropdown-content ${filterOpen ? "open" : ""}`}
              >
                <div className="dropdown col1">
                  <label htmlFor="categoryFilter" style={{ display: "none" }}>
                    Category:
                  </label>

                  <div className="left">
                  <h3>Tag Filter</h3>
                    <input type="radio" id="math" name="category" value="math" onClick={setMath} />
                    <label htmlFor="math">#Math</label>

                    <input type="radio" id="english" name="category" value="english" onClick={setEnglish}/>
                    <label htmlFor="english">#English</label>

                    <input type="radio" id="science" name="category" value="science" onClick={setScience}/>
                    <label htmlFor="science">#Science</label>

                    <input type="radio" id="socialstudies" name="category" value="socialstudies" onClick={setSocialStudies}/>
                    <label htmlFor="socialstudies">#Social Studies</label>

                    {setSubjectPinned()}

                    <label htmlFor="tagsInput" style={{ display: "none" }}>
                    Tags:
                  </label>
            


                  </div>

                   <div className="right">
                   <div>
                   <input 
                id="customtag" 
                className="tag-input-container" 
                value={tagInput}
                onChange={tagInputChange}
                onKeyDown={enterCheck}
                type="text" 
                placeholder="type in..."
                />
                  </div>
                   </div>
                </div>

                <div class="dropdown col2">
                  <div className="left">
                  <h3>Date Filter</h3>
                  <label htmlFor="dateFilter" style={{ display: "none" }}>
                    Date:
                  </label>
                  <div>
                    <input type="radio" id="newest" name="date" value="newest" onClick={setNewest} />
                    <label htmlFor="newest">Newest</label>

                    <input type="radio" id="oldest" name="date" value="oldest" onClick={setOldest} />
                    <label htmlFor="oldest">Oldest</label>

                    {setAgePinned()}

                    <input type="radio" id="trending" name="date" value="trending" />
                    <label htmlFor="trending">Trending</label>

                  <input type="date" id="startDate" name="startDate" />
                  </div>

                  </div>
                  
                  <div className="right">
                  <h3>List Size</h3>
                  <label htmlFor="listFilter" style={{ display: "none" }}>
                    listSize:
                  </label>
                
                  <div>
                    <input type="radio" id="thread10" name="listSize" value="10" onClick={setTen}/>
                    <label htmlFor="thread10">10</label>

                    <input type="radio" id="thread25" name="listSize" value="25" onClick={setTwentyFive}/>
                    <label htmlFor="thread25">25</label>

                    <input type="radio" id="thread50" name="listSize" value="50" onClick={setFifty}/>
                    <label htmlFor="thread50">50</label>

                    <input type="radio" id="thread100" name="listSize" value="100" onClick={setHundred}/>
                    <label htmlFor="thread100">100</label>

                    {setSizePinned()}
                  </div>

                  </div>
                </div>

                <div className="dropdown col3">
                
                  <div className="left">
                  <h3>Thread Status</h3>
                  <label htmlFor="statusFilter" style={{ display: "none" }}>
                    Thread Status:
                  </label>
                  <div>
                    <input type="radio" id="open" name="status" value="open" />
                    <label htmlFor="open">Open</label>

                    <input type="radio" id="closed" name="status" value="closed" />
                    <label htmlFor="closed">Closed</label>

                    <input type="radio" id="pinned" name="status" value="pinned" />
                    <label htmlFor="pinned">Pinned</label>
                  </div>
                  </div>

                  <div className="right">
                    <h3>Sort</h3>
                  <label htmlFor="sortFilter" style={{ display: "none" }}>
                    Sort By:
                  </label>
                  <div>
                    <input type="radio" id="sortAnswered" name="sortBy" value="answered" />
                    <label htmlFor="sortAnswered">Answered</label>

                    <input type="radio" id="sortViews" name="sortBy" value="views" onClick={setViewed}/>
                    <label htmlFor="sortViews">Most Views</label>

                    <input type="radio" id="sortComments" name="sortBy" value="comments" onClick={setReplies}/>
                    <label htmlFor="sortComments">Most Comments</label>

                    <input type="radio" id="sortLikes" name="sortBy" value="likes" onClick={setMost}/>
                    <label htmlFor="sortLikes">Most Likes</label>

                    {setPinned()}
                    </div>
                  </div>
                  </div>
                </div>
              </div>



    );
}