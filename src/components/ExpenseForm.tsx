import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { categories } from '../data/categories'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { DraftExpense, Value } from '../types';
import ErrorMessage from './ErrorMessage';
import { useBudget } from '../Hooks/useBudget';


export default function ExpenseForm() {
	const {dispatch,state,remainingBudget} =useBudget()
	const [expense,setExpense]=useState<DraftExpense>({
		amount:0,
		expenseName:'',
		category:'',
		date:new Date()
	})
	const [error,setError]=useState('')
	const [previousAmount,setPreviousAmount]=useState(0)

	const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
		const {name,value}=e.target
		const isAmountField = ['amount'].includes(name)
		setExpense({
			...expense,
			[name]:isAmountField ? +value:value
		})
	}
	const handleChangeDate=(value:Value)=>{
		setExpense({
			...expense,
			date:value
		})
	}
	const handleSubmit=(e:FormEvent<HTMLFormElement	>)=>{
		e.preventDefault()
		if(Object.values(expense).includes('')){
			setError('Todos los campos son obligatorios')
		}
		if((expense.amount-previousAmount) > remainingBudget){
			setError('Ese gasto se sale del presupuesto')
			return

		}
		if(state.editingId){
			dispatch({type:'update-expense',payload:{expense:{id:state.editingId,...expense}}})
		}else{
			dispatch({type:'add-expense',payload:{expense}})
		}

		setExpense({
			amount:0,
			expenseName:'',
			category:'',
			date:new Date()
		})
		setPreviousAmount(0)
	}

	useEffect(()=>{
		if(state.editingId){
			const editingExpense = state.expenses.filter(currentExpense=> currentExpense.id === state.editingId)[0]
			setExpense(editingExpense)
			setPreviousAmount(editingExpense.amount)
		}
	},[state.editingId,state.expenses])
	console.log(state.expenses)
	return (
		<form className='space-y-5' onSubmit={handleSubmit}>
			<legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
				{state.editingId ? 'Guardar cambios' : 'Nuevo Gasto'}
			</legend> 
			{error && <ErrorMessage>{error}</ErrorMessage>}
			<div className='flex flex-col gap-2'>
				<label htmlFor="expenseName"
				className='text-xl'>
					Nombre Gasto:
				</label>
				<input type="text" id='expenseName'
				placeholder='Añade el nombre del gasto' 
				className='bg-slate-100 p-2'
				name='expenseName'
				value={expense.expenseName}
				onChange={
					handleChange
				}/>
				
			</div>
			<div className='flex flex-col gap-2'>
				<label htmlFor="amount"
				className='text-xl'>
					Cantidad:
				</label>
				<input type="number" id='amount'
				placeholder='Añade la cantidad del gasto: ej. 300' 
				className='bg-slate-100 p-2'
				name='amount'
				value={expense.amount}
				onChange={handleChange}/>
			</div>
			<div className='flex flex-col gap-2'>
				<label htmlFor="amount"
				className='text-xl'>
					Categoria:
				</label>
				<select title='category' name="category" 
				className='bg-slate-100 p-2'
				id="category"
				value={expense.category}
				onChange={handleChange}
				>
					<option value="">-- Seleccione --</option>
					{categories.map(category=>(
						<option value={category.id} key={category.id}>{category.name}</option>
					))}
				</select>
			</div>
			<div className='flex flex-col gap-2'>
				<label htmlFor="amount"
				className='text-xl'>
					Fecha gasto:
				</label>
				<DatePicker
				value={expense.date}
				className='bg-slate-100 p-2 border-0'
				onChange={handleChangeDate}/>
			</div>
			<input type="submit" className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
			value={state.editingId ? 'Guardar cambios' : 'Registrar gastos'} />
		</form>
	)
}
