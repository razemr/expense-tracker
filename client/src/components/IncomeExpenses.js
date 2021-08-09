import React, {useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
    const income = transactions.filter(t => t.amount >= 0).map(t => t.amount).reduce((a,b) => a+b, 0).toFixed(2);
    const expense = ((transactions.filter(t => t.amount < 0).map(t => t.amount).reduce((a,b) => a+b, 0)) * -1).toFixed(2);
    return (
        <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">+${income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">-${expense}</p>
        </div>
      </div>
    )
}
