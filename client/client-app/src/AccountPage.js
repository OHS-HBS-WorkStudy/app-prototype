import Navigator from "./modules/Navigator.js";

export default function AccountPage() {
    let data = JSON.parse(sessionStorage.getItem("user"))

    return(
        <div>
            <Navigator/>
            <div className="nav-space"></div>
            <body>
            <div className="account">
            <div className="center">
                <h1>{data.first_name} {data.last_name}</h1>
                <h2>{data.type}</h2>
                </div>
                </div>
                
            </body>
        </div>
    );
}