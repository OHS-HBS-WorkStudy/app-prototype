import { useState, useRef, useEffect } from "react";


export default function ThreadFilter({data, searchButton, totalPages, index}) {
    const [isEditing, setIsEditing] = useState(false);
    const [search, searchWord] = useState("none");

    const [filterOpen, setFilterOpen] = useState(false); 
    const filterButtonRef = useRef(null); 
    const dropdownRef = useRef(null);




    const [list, giveList] = useState([]);





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

    return(
      <div>
        <div className={`grid-header ${filterOpen ? "open" : ""}`}>
        <div className="title">Thread Controller</div>
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
                <div className="dropdown">
                  <label htmlFor="tagFilter" style={{ display: "none" }}>
                    Category:
                  </label>
                  <select id="tagFilter" name="tagFilter">
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="technology">Technology</option>
                  </select>

                  <h1>Hello</h1>
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

                  <h1>Hello2</h1>
                </div>
                <div className="dropdown">
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
                </div>
              </div>
              </div>


    );
}