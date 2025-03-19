import { useState, useEffect } from 'react';

import TagList from './TagList.js';

export default function AddTags({tagContent}) {
    const [tagCount, newTag] = useState(0);
    const [values, setValues] = useState([])

    function addTag() {
        newTag(tagCount+1);
        console.log(tagCount+1);
        values.length = tagCount+1;
        console.log(values.length);
        values[tagCount] = 0;
    }

    const [tags, setTags] = useState([]); 
    const [inputValue, setInputValue] = useState("#"); 
    const [tagRemoving, setTagRemoving] = useState(null); 
  
    useEffect(() => {
      const savedTags = sessionStorage.getItem("tags");
      if (savedTags) {
        setTags(JSON.parse(savedTags));
      }
    }, []);
  
    const tagInputChange = (e) => {
      const value = e.target.value;
      if (!value.startsWith("#")) {
        setInputValue("#");
      } else {
        setInputValue(value);
      }
    };
  
    const enterCheck = (e) => {
      if (e.key === "Enter") {
        const tagContent = inputValue.trim(); 
        if (tagContent.length > 1 && !tags.includes(tagContent)) {
          const updatedTags = [...tags, tagContent];
          setTags(updatedTags); 
          console.log(tagContent)
          setInputValue("#");
          return tagContent;
        } else {
          alert("Tag must be unique and not empty.");
        }
      }
    };
  
    const removeTag = (index) => {
      setTagRemoving(index); 
      setTimeout(() => {
        const updatedTags = tags.filter((_, i) => i !== index);
        setTags(updatedTags);

        setTagRemoving(null); 
      }, 300); 
    };
    

    return(
        <>
           
            
            <div className="fill"><label htmlFor="questionDesc" className="threadDir"><h1>Tags (Optional)</h1></label></div>

              <div className="input-container text-box ql-container">
              <h4 className="text">
                Please enter one at a time. Press <span className="text-bold">Enter</span> to submit.
              </h4>

              <p>Make sure to make them accurate and clear as possible.</p>
          
           
           
            <input
              id="tag-input"
              className="tag-input-container"
              type="text"
              value={inputValue}
              onChange={tagInputChange}
              onKeyDown={enterCheck}
              placeholder='Press Enter To Confirm'
              style={{
                border: "none",
                outline: "none",
                flexGrow: 1,
                minWidth: "150px",
                fontSize: "15px",
              }}
            />
            
          

        </div>

        <div className="tags-container">

            {tags.map((tag, index) => (
            <div
                key={index}
                className={`tag${tagRemoving === index ? "removing" : ""}`}
                onClick={() => removeTag(index)}
            >
                {tag}
            </div>
            ))}
            </div>
            </>
    );
}