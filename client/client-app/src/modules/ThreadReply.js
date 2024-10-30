export default function ThreadReply() {
    function ReplyButton() {
        let data = {
            contents: document.getElementById("reply").value,
            thread_id: JSON.parse(sessionStorage.getItem("thread"))[2],
            uuid: JSON.parse(sessionStorage.getItem("user")).uuid
        }

        console.log(data);

        PostReply(data);
    }

    function PostReply(data) {
        fetch("http://127.0.0.1:8000/createReply", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    return(
        <div>
            <h2>Reply to Thread</h2>

            <div>
                <br/>
                <b>Enter Reply:</b><input id="reply"></input>
                <br/>
                <button onClick={ReplyButton}>Submit Reply</button>
            </div>
        </div>
    );
}