export default function TagList({tag, val}) {
    function removeTag() {
        let rTag = document.getElementById(tag);

        rTag.remove();
    }

    return(
        <div id={tag}>
            <b>Tag:</b><input class="tag"/>
            <button onClick={removeTag}>Remove</button>
        </div>
    );
}