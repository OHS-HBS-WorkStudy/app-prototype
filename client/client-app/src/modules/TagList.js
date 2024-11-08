export default function TagList({tags}) {
    return(
        <div>
            {tags.map(tag =>
                <div><b>Tag:</b><input class="tag"/></div>
            )}
        </div>
    );
}