import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const EditBudgetForm = (initialBudget: number, setBudget: React.Dispatch<React.SetStateAction<number>>) => {

    return (
        <div>
            <div style={{
                display: "inline-flex"
            }}>
                Budget: $
                <input
                    id="budget"
                    type="number"
                    value={initialBudget}
                    style={{
                        fontSize: "1rem",
                        padding: 0,
                        width: "auto",
                        border: "none",
                    }}
                    onChange={(e) => setBudget(parseFloat(e.target.value))}
                    className="form-control"
                />
            </div>
        </div>
    )

}

export default EditBudgetForm;