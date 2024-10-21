import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ShowBudget = () => {

    const { budget } = useContext(AppContext);

    return (
        <div>
            <div>Budget: ${budget}</div>
        </div>
    );

}

export default ShowBudget;