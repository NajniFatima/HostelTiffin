import React, { useEffect, useState } from 'react';

const FilterPopup = ({visible, onClose }) => {
    const [isSortBy, setIsSortBy] = useState(true);
    const [isRating, setIsRating] = useState(false);
    const [isOffer, setIsOffer] = useState(false);
    const [active, setActive ] = useState(1);

    const handleSortBy = () => {
        setActive(1);
        setIsSortBy(true);
        setIsRating(false);
        setIsOffer(false);
    }

    const handleRating = () => {
        setActive(2);
        setIsSortBy(false);
        setIsRating(true);
        setIsOffer(false);
    }

    const handleDiscount = () => {
        setActive(3);
        setIsSortBy(false);
        setIsRating(false);
        setIsOffer(true);
    }

    const clear = () => {

    }


    if(!visible) return null;
    return (
        <div className='fixed z-10 w-full inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
            <div className="bg-white w-full md:w-3/5 m-10 h-2/5 py-2 pr-2 text-black rounded">
                <form className='w-full h-full'>
                    <div className='flex pl-2 justify-between font-bold mb-1'>
                        <h2 className='text-lg'>Filters</h2>
                        <span className='ml-auto text-exit cursor-pointer'><ion-icon name="close-outline" onClick={onClose} className='text-exit text-4xl'></ion-icon></span>
                    </div>
                    <hr />
                    <div className='mt-2 w-full flex'>
                        <div className='h-36 w-1 bg-colorB rounded-lg'></div>
                        <div className='flex w-full'>
                            <div className='w-1/3 justify-between'>
                                <div className='flex flex-col justify-between'>
                                    <div key={1} className={`${active === 1 && 'bg-colorB mr-4 rounded-r-lg items-center'} flex h-12 text-sm cursor-pointer items-center pl-1`} onClick={handleSortBy}>
                                        <div className={` ${active == 1 && ' h-full bg-colorB text-lg translate-x-2 duration-500 rounded-lg p-2'}`}>
                                            Sort by
                                        </div>
                                    </div>
                                    <div key={2} className={`${active === 2 && 'bg-colorB mr-4 rounded-r-lg '} flex h-12 text-sm cursor-pointer items-center pl-1`} onClick={handleRating}>
                                        <div className={`${active === 2 && 'h-full bg-colorB text-lg translate-x-2 duration-500 rounded-lg p-2'}`}>
                                            Rating
                                        </div>
                                    </div>
                                    <div key={3} className={`${active === 3 && 'bg-colorB mr-4 rounded-r-lg '} flex h-12 text-sm cursor-pointer items-center pl-1`} onClick={handleDiscount}>
                                        <div className={`${active === 3 && 'h-full bg-colorB text-lg translate-x-2 duration-500 rounded-lg p-2'}`}>
                                            Discount
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-44'>
                                {isSortBy && (
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <input id="popularity" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="popularity" className="ml-2 text-sm font-medium text-gray-900">Popularity</label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input checked id="RateHighToLow" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="RateHighToLow" className="ml-2 text-sm font-medium text-gray-900">Rating: High to Low</label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input id="deliveryTime" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="deliveryTime" className="ml-2 text-sm font-medium text-gray-900">Delivery Time</label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input checked id="CostLowToHigh" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="CostLowToHigh" className="ml-2 text-sm font-medium text-gray-900">Cost: Low to High</label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input id="CostHighToLow" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="CostHighToLow" className="ml-2 text-sm font-medium text-gray-900">Cost: High to Low</label>
                                        </div>
                                    </div>
                                )}
                                {isRating && (
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <input id="4.5-above" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="4.5-above" className="ml-2 text-sm font-medium text-gray-900">Above 4.5</label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input checked id="4-above" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="4-above" className="ml-2 text-sm font-medium text-gray-900">Above 4</label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input checked id="3.5-above" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="3.5-above" className="ml-2 text-sm font-medium text-gray-900">Above 3.5</label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input id="3-above" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="3-above" className="ml-2 text-sm font-medium text-gray-900">Above 3</label>
                                        </div>
                                    </div>
                                )}
                                {isOffer && (
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <input id="5%discount" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="5%discount" className="ml-2 text-sm font-medium text-gray-900">5% above discount</label>
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <input checked id="any-offer" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="any-offer" className="ml-2 text-sm font-medium text-gray-900">Any Discount</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center pl-1'>
                        <button type='button' onClick={clear}  className="text-white bg-exit focus:ring-red-900 font-medium rounded-lg text-sm sm:w-auto px-5 py-2 text-center">Clear All</button>
                        <button type="submit" className="text-white bg-colorDB hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2 text-center">Apply</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default FilterPopup