import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const AddTransaction = () => {
    const { addTransaction } = useContext(GlobalContext);

    const validationSchema = Yup.object({
        text: Yup.string().required('Text is required'),
        amount: Yup.number().required('Amount is required').notOneOf([0], 'Amount cannot be 0')
    });

    const formik = useFormik({
        initialValues : {
            text: '',
            amount: 0
        },
        onSubmit: (values) => {
            const newTransaction = {
                text: values.text,
                amount: +values.amount
            }
    
            addTransaction(newTransaction);
            formik.resetForm();
        },
        validationSchema
    });

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input id="text" type="text" value={formik.values.text} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter text..." />
                    {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div> : null}
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount <br />(negative - expense, positive - income)</label>
                    <input id="amount" type="number" value={formik.values.amount} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Enter amount..." />
                    {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div> : null}
                </div>
                <button className="btn" type="submit">Add transaction</button>
            </form>
        </>
    )
}