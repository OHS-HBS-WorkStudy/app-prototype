import { useState } from "react";


export default function ThreadFilter({data, searchButton, totalPages, index}) {
    const [isEditing, setIsEditing] = useState(false);
    const [search, searchWord] = useState("none");




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

    return(
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

              <button>Filter</button>
              

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
    );
}