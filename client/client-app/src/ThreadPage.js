import Navigator from "./modules/Navigator.js";
import ThreadReply from "./modules/ThreadReply.js";

export default function ThreadPage() {
    let data = JSON.parse(sessionStorage.getItem("thread"))

    console.log(data);

    return(
        <div className="Thread-Content">
            <Navigator />
            <h1 className="Thread-Title">{data[0]}</h1>
            <p className="Thread-Desc">{data[1]}</p>
            <ThreadReply />
        </div>
    )
}