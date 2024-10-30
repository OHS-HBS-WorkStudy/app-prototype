import Navigator from "./modules/Navigator.js";
import ThreadReply from "./modules/ThreadReply.js";
import ReplyList from "./modules/ReplyList.js";

export default function ThreadPage() {
    let data = JSON.parse(sessionStorage.getItem("thread"));

    console.log(data);

    return(
        <div className="Thread-Content">
            <Navigator />
            <h1 className="Thread-Title">{data[0]}</h1>
            <p className="Thread-Desc">{data[1]}</p>
            <br/>
            <div>
                <ThreadReply />
                <ReplyList />
            </div>
        </div>
    )
}