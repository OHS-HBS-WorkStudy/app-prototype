export default function ThreadPage() {
    let data = JSON.parse(sessionStorage.getItem("thread"))

    console.log(data);

    return(
        <div className="Thread-Content">
            <h1 className="Thread-Title">{data[0]}</h1>
            <p className="Thread-Desc">{data[1]}</p>
        </div>
    )
}