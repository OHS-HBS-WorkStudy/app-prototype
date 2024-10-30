import { useState } from "react";

export default function ReplyList() {
    const [listActive, activateList] = useState(false);

    try{
        let test;

        function setList(json) {
            console.log(json);
            test = json;
            console.log(test);
            sessionStorage.setItem("replies", JSON.stringify(test));
            activateList(true);
        }
        
        function getList() {
            fetch("http://127.0.0.1:8000/replyList")
            .then((response) => response.json())
            .then((json) => setList(json))
            .catch((error) => {
                console.log(error);
            })
        }

        getList();

        if(listActive === true) {
            let values = JSON.parse(sessionStorage.getItem("replies"));
            return(
                <div>
                    <div>
                    {values.map(value => 
                        <h3>{value.contents}</h3>
                    )} 
                    </div>
                </div>
            ) 
        }else {
            return(
                <div>
                    <h2>No current Replies</h2>
                </div>
            )
        }
    }catch(err) {
        return(
            <div>
                <h2>No current Replies</h2>
            </div>
        )
    }
}