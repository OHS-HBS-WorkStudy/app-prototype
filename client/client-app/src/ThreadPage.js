export default function ThreadPage() {
    let data = JSON.parse(sessionStorage.getItem("thread"))

    console.log(data);

    return(
        <div>
            <h1>{data[0]}</h1>
            <p>{data[1]}</p>
        </div>
    )
}