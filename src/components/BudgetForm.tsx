import React, { FormEvent, useMemo, useState } from 'react'
import { useBudget } from '../Hooks/useBudget'
export default function BudgetForm() {
	const [budget, setBudget]=useState(0)
	const {dispatch}=useBudget()
	const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
		setBudget(e.target.valueAsNumber  
		)
	}
	const isValid=useMemo(()=>{
		return isNaN(budget) || budget <= 0
	},[budget])

	const handleSubmit = (e:FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		dispatch({type:'add-budget',payload:{budget}})

	}

	return (
		<form className='space-y-5' onSubmit={handleSubmit}>
			<div className='flex flex-col space-y-5'>
				<label htmlFor="budget" className='tex text-4xl text-ble font-bold text-center'>Definir Presupuesto</label>
			</div>

			<input type="number"
			className='w-full bg-white border border-gray-200 p-2'
			placeholder='define tu presupuesto'
			id='BudgetId'
			name='budget'
			value={budget}
			onChange={handleChange} />

			<input type="submit"
			value='Definir presupesto' 
			className='bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-thin uppercase disabled:opacity-40'
			disabled={isValid}
			/>
			
		</form>
	)
}
