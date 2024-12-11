import { useMemo } from "react";
import { useBudget } from "../Hooks/useBudget"
import ExpenseDetails from "./ExpenseDetails";
export default function ExpenseList() {
	const {state}=useBudget();
	const filterExpenses=state.currentCategory ? state.expenses.filter(expenses => expenses.category === state.currentCategory):state.expenses
	const isEmpty = useMemo(()=>filterExpenses.length === 0,[state.expenses]) 
	return (
		<div>
			{isEmpty ? <p className="text-gray-600 text-2xl font-bold">No hay gastos</p>:
			<>
			
				<p className="text-gray-600 text-2xl font-bold my-5">Listado de gastos.</p>

				{filterExpenses.map(expense=>
					<ExpenseDetails
					key={expense.id}
					expense={expense}

					/>
				)}
			</>
			}
		</div>
	)
}
