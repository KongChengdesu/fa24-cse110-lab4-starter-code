import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import EditBudgetForm from "./EditBudgetForm";
import ShowBudget from "./ShowBudget";
import { fetchBudget, updateBudget } from "../../utils/budget-utils";

const Budget = () => {

  const { budget, setBudget } = useContext(AppContext);

  const [ editing, setEditing ] = useState(false);

  const [ newBudget, setNewBudget ] = useState(budget);

  useEffect(() => {
    loadBudget();
  }, []);

  async function loadBudget() {
    setBudget(await fetchBudget());
  }

  const handleEditClick = () => {
    if(editing) {

      if(isNaN(newBudget)) {
        alert('Please enter a valid number');
        return;
      }

      updateBudget(newBudget);
      setBudget(newBudget);

    }
    setEditing(!editing);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
      <div>{editing ? EditBudgetForm(newBudget, setNewBudget) : ShowBudget()}</div>
      <button
        onClick={handleEditClick}
        className="btn btn-primary"
        style={{ 
          fontSize: '0.7rem',
          padding: '0.1rem 0.5rem',
        }}
      > {editing ? 'Save' : 'Edit'}</button>
    </div>
  );
};

export default Budget;
