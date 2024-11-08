import Navigator from "./modules/Navigator.js";
import ThreadReply from "./modules/ThreadReply.js";
import ReplyList from "./modules/ReplyList.js";
import ThreadVote from "./modules/ThreadVote.js";

import DOMPurify from "dompurify";

export default function ThreadPage() {
    let data = JSON.parse(sessionStorage.getItem("thread"));

    console.log(data);

    const sanitizedTitle = DOMPurify.sanitize(data[0]);
    const sanitizedDesc = DOMPurify.sanitize(data[1]);

    return(
        <>
         <Navigator />
            <div className="thread">
                <div id="thread-content">
                    <body>
                            <h1 className="thread-title" dangerouslySetInnerHTML={{__html: sanitizedTitle  }} />
                            <p className="thread-desc" dangerouslySetInnerHTML={{__html: sanitizedDesc  }} />
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