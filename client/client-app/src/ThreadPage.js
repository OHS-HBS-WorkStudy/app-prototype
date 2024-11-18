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
            <div>
                <Navigator />
                <div className="nav-space">
                    <div className="thread">
                        <div className="center">
                            <div className="thread-content">
                                <div className="thread-title" dangerouslySetInnerHTML={{__html: sanitizedTitle  }} />
                                <div className="thread-desc" dangerouslySetInnerHTML={{__html: sanitizedDesc  }} />
                                <div>
                                    <ThreadReply />
                                    <div className="reply-list-container">
                                        <ReplyList />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}
