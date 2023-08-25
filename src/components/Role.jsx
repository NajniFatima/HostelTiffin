import React from 'react'

const Role = () => {
  return (
    <div className='bg-colorB h-screen'>
      <div className='flex justify-center items-center h-screen'>
        <div className='z-20 border border-colorDB w-full top-10 max-w-md mx-2 p-6 bg-white rounded-3xl shadow-md'>
          <div className='flex items-center justify-center text-green-600 pb-6'>
            <ion-icon size='large' name="person-outline"></ion-icon>
          </div>
          <div className='flex justify-center items-center text-bold'>
            Choose Your Role
          </div>
          <hr />
          <div className='pt-4'>
            <div>
              <div className="flex items-center mb-6">
                  <input id="Admin" type="radio" value="" name="Admin" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="Admin" className="ml-2 text-sm font-medium text-gray-900">Admin</label>
              </div>
              <div className="flex items-center mb-6">
                  <input checked id="Buyer" type="radio" value="" name="Buyer" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="Buyer" className="ml-2 text-sm font-medium text-gray-900">Buyer</label>
              </div>
              <div className="flex items-center mb-6">
                  <input checked id="Seller" type="radio" value="" name="Seller" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                  <label htmlFor="Seller" className="ml-2 text-sm font-medium text-gray-900">Seller</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Role