import Navigator from "./modules/Navigator.js";

export default function AccountPage() {
    let data = JSON.parse(sessionStorage.getItem("user"))

    return(
        <div>
            <Navigator/>
            <div>
            <h1>{data.first_name} {data.last_name}</h1>
            <h2>{data.type}</h2>
            </div>
        </div>
    );
}