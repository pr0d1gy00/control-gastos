import { useReducer,createContext, Dispatch, ReactNode, useMemo } from "react"
import { budgetActions, budgetReducer,budgetState,initialState } from "../reducers/budget-reducers"

type BudgetContextProps ={
	state:budgetState
	dispatch:Dispatch<budgetActions>
	totalExpenses:number
	remainingBudget:number
}
type BudgetProviderProps ={
	children: ReactNode
}
export const BudgetContext = createContext<BudgetContextProps>(null!)


export const BudgetProvider = ({children}:BudgetProviderProps)=>{
	const [state,dispatch]=useReducer(budgetReducer,initialState)
	const totalExpenses=useMemo(()=>
		state.expenses.reduce((total,expense)=>expense.amount + total,0)
	,[state.expenses])
	const remainingBudget= useMemo(()=>state.budget - totalExpenses,[state.expenses,totalExpenses,])
	return(
		<BudgetContext.Provider
			value={{
				state,
				dispatch,
				totalExpenses,
				remainingBudget
			}}
		>
			{children}
		</BudgetContext.Provider>
	)
}