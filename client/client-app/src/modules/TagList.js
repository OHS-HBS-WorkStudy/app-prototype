import apostrophe from './Adipose.js';

export default function TagList({tag, val}) {
    function removeTag() {
        let rTag = document.getElementById(val);

        rTag.remove();
    }

    return(
        <div id={val}>
            <b>Tag:</b><input class="tag"/>
            <button onClick={removeTag}>Remove</button>
        </div>
    );
}