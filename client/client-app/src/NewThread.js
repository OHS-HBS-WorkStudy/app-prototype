import NewThreadInput from "./modules/NewThreadInput.js";
import Navigator from './modules/Navigator.js';

export default function NewThread() {
    return(
        <div>
            <Navigator />
            <h1>Create new Thread</h1>

            <NewThreadInput />
        </div>
    );
}