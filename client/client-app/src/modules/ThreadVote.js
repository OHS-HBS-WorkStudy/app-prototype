import { useState } from "react";

export default function ThreadVote() {
    const [score, changeScore] = useState(Number(sessionStorage.getItem("thread_score")));

    let val = sessionStorage.getItem("thread_score");

    const scoreMax = val+1;
    const scoreMin = val-1;

    const [increase, didIncrease] = useState(false);
    const [decrease, didDecrease] = useState(false);

    function increaseScore() {
        if(score !== scoreMax) {
            changeScore(score+1);
            sessionStorage.setItem("thread_score", score+1);
            didIncrease(true);
            postVote("positive")
        }
    }

    function decreaseScore() {
        if(score !== scoreMin){
            changeScore(score-1);
            sessionStorage.setItem("thread_score", score-1);
            didDecrease(true);
            postVote("negative")
        }
    }

    function postVote(type) {
        let data = {
            score: type,
            thread_id: JSON.parse(sessionStorage.getItem("thread"))[2]
        }

        fetch("http://127.0.0.1:8000/createVote", {
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
            <button id="decrease" onClick={decreaseScore}>-</button>
            <p><b>{score}</b></p>
            <button id="increase" onClick={increaseScore}>+</button>
        </div>
    );
}