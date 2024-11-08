import { useState } from 'react';

import TagList from './TagList.js';

export default function AddTags() {
    const [tagCount, newTag] = useState(0);
    const [values, setValues] = useState([])

    function addTag() {
        newTag(tagCount+1);
        console.log(tagCount+1);
        values.length = tagCount+1;
        console.log(values.length);
        values[tagCount] = 0;
    }

    return(
        <div>
            <TagList tags={values}/>
            <button onClick={addTag}>Add Tag</button>
        </div>
    );
}