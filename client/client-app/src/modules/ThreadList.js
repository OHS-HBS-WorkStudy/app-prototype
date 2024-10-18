import { useState } from "react";

export default function ThreadList() {
    const {threads, giveThreads} = useState(0);

    function giveData(data) {
        console.log(data);

        giveThreads(data);
    }

    function getList() {
        fetch("http://127.0.0.1:8000/threadList")
        .then((response) => response.json())
        .then((json) => giveData(json));
    }

    getList();

    console.log(threads);
    
    return(
        <div>
            {threads.map(thread => 
                <h2>{thread.name}</h2>
            )}
        </div>
    )
}