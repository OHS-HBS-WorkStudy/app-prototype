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
        <div>
            <b>Title:</b>
            <input id="thread_title"></input>
            <br/>
            <b>Question:</b>
            <input id="thread_contents"></input>
            <br/>
            <button onClick={submitThread}>Submit Question</button>
        </div>
    );
}