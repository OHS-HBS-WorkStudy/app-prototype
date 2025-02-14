import NewThreadInput from "./modules/NewThreadInput.js";
import Navigator from './modules/Navigator.js';
import './CSS/NewThreadPage.css';

export default function NewThread() {
    return(
        <> 
            <Navigator />
            <body>
                <h1>Create new Thread</h1>

                <NewThreadInput />
            </body>
        </>
    );
}