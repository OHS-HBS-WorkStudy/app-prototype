export default function NewThreadInput() {

    function submitThread() {
        let user = JSON.parse(sessionStorage.getItem("user"));
        let data = {
            thread_name: document.getElementById("thread_title").value,
            thread_contents: document.getElementById("thread_contents").value,
            uuid: user.uuid
        }

        postThread(data);
    }

    function postThread(val) {
        fetch("http://127.0.0.1:8000/createThread", {
            method: "POST",
            body: JSON.stringify(val),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          })
            .then((response) => response.json())
            .then((json) => toHome(json));
    }

    function toHome(json) {
        console.log(json);
        //changeScreen(0);
      }

    return(
        <body>
            <div className="ThreadCreate">
            <div className="container">
                <div className="center">
                    <div className="input-container">
                        <label for="thread-title"><b>Title:</b></label>
                            <input id="thread-title" placeholder="Enter title"></input>
                        <br/>
                        <label for="thread-contents"><b>Description:</b></label>
                            <input id="thread-contents" placeholder="Enter description" ></input>
                        <br/>
                        
                            <button className="btn-send" onClick={submitThread}>Submit Thread</button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}