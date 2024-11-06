import NewThreadInput from "./modules/NewThreadInput.js";
import Navigator from './modules/Navigator.js';

export default function NewThread() {
    return(
        <> 
            <Navigator />
                <div className="new-thread">
                    <div className="new-thread-content">
                        <body>
                            <h1>Create new Thread</h1>

                            <NewThreadInput />
                        </body>
                    </div>
                </div>
        </>
    );
}