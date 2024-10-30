import Navigator from "./modules/Navigator.js";
import ThreadReply from "./modules/ThreadReply.js";
import ReplyList from "./modules/ReplyList.js";

export default function ThreadPage() {
    let data = JSON.parse(sessionStorage.getItem("thread"));

    console.log(data);

    return(
        <>
         <Navigator />
            <div className="thread">
                <div id="thread-content">
                    <body>
                            <h1 className="thread-title">{data[0]}</h1>
                            <p className="thread-desc">{data[1]}</p>
                            <div>
                                <ThreadReply />
                                <ReplyList />
                            </div>
                    </body>
                </div>
            </div>
        </>
    )
}