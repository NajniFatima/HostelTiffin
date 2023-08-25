import React from 'react';

const Input = ({ name, labelName, autoFocus, type, onChange }) => {
  return (
        <div className="relative z-0 w-full mb-6 group">
          <input name={name} required autoFocus={autoFocus} type={type} id={name} onChange={onChange} className='block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer' placeholder=" " />
          <label htmlFor={name} className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-9' >{labelName}</label>
        </div>
    )
}

export default Input