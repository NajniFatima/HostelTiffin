import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Packing = () => {
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const navigateTo = useNavigate();

  const handleNext = () => {
    navigateTo('/arrangement');
  }

  return (
    <>
      <div className='flex items-center justify-center w-full min-h-screen bg-colorG'>
        <div className='flex bg-white rounded-md shadow-lg'>
          <div className='flex divide-x'>
            <div className='flex flex-col px-6 pt-5 pb-6'>
              <div className='flex items-center justify-between'>
                <div className="flex items-center p-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                </div>
                <div>Select Date Start</div>
              </div>
              <input name="start" type="date" onChange={(e) => setStartDate(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
            <div className='flex flex-col px-6 pt-5 pb-6'>
              <div className='flex items-center justify-between'>
                <div class="flex items-center p-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg>
                </div>
                <div>Select Date End</div>
              </div>
              <input name="start" type="date" onChange={(e) => setEndDate(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
            </div>
          </div>
        </div>
          <div className='absolute right-6 bottom-10'>
            <button onClick={handleNext}>Next</button>
          </div>
      </div>
    </>
  )
}

export default Packing
8