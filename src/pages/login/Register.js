import React from 'react'

function Register() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'> 
        <div className='bg-white p-3 rounded w-25'>
         <h2>انشاء حساب</h2>
        <form>
            <div className='mb-3'>
                <label htmlFor='name'><strong>الاسم</strong></label>
                <input type='text' placeholder='ادخل الاسم' name='name' 
                className='form-control rounded-0' />
            </div>
            <div className='mb-3'>
                <label htmlFor='email'><strong>البريد الإلكتروني</strong></label>
                <input type='email' placeholder='ادخل البريد الالكتروني' name='email'
                className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor='password'><strong>كلمة السر</strong></label>
                <input type='password' placeholder='ادخل كلمة السر' name='password'
                className='form-control rounded-0'/>
            </div>
            <button type='submit' className='btn btn-sucess w-100 rounded-0'>انشاء الحساب</button>
            <p></p>
        </form>
        </div>
      
    </div>
  )
}

export default Register
