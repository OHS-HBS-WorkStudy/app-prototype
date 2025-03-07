import { useState } from "react";

export default function ThreadVote() {
    const [score, changeScore] = useState(Number(JSON.parse(sessionStorage.getItem("thread"))[5]));

    let val = Number(sessionStorage.getItem("thread_score"));

    const scoreMax = val+1;
    const scoreMin = val-1;

    console.log(scoreMax, scoreMin)

    const [increase, didIncrease] = useState(false);
    const [decrease, didDecrease] = useState(false);

    const [selectedVote, setSelectedVote] = useState(null); 

    function increaseScore() {
        if(score < scoreMax) {
            changeScore(score+1);
            console.log("hello?")
            sessionStorage.setItem("thread_score", score);
            didIncrease(true);
            postVote("positive")
        }
    }

    function decreaseScore() {
        if(score > scoreMin){
            changeScore(score-1);
            sessionStorage.setItem("thread_score", score);
            didDecrease(true);
            postVote("negative")
        }
    }

    function postVote(type) {
        let data = {
            score: type,
            thread_id: JSON.parse(sessionStorage.getItem("thread"))[2],
            user_id: JSON.parse(sessionStorage.getItem("user")).uuid
        }

        fetch(sessionStorage.getItem("server_address")+"/createVote", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
    }

    return(
        <div>
            <button id="increase" onClick={increaseScore} className={`down-vote ${selectedVote ? "selected" : ""}`} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24px" height="24px">
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" fill="currentColor"/>
                </svg>
            </button>
            <p className="vote-number"><b>{score}</b></p>
            <button id="decrease" onClick={decreaseScore} className={`down-vote ${selectedVote ? "selected" : ""}`} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="24px" height="24px">
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" fill="currentColor"/>
                </svg>
            </button>
        </div>
    );
}