import NewThreadInput from "./modules/NewThreadInput.js";
import Navigator from './modules/Navigator.js';

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