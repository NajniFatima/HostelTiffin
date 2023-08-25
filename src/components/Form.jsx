import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createFoodItem, updateFoodItem } from '../actions/foodItems';
import FileBase from 'react-file-base64';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
    const [foodData, setFoodData ] = useState({ dish: '', description: '', tags: '', selectedFile: '', breakfast: false, lunch: false, dinner: false, price: 0, discount: 0 });
    const dispatch = useDispatch();
    const foodItem = useSelector((state) => currentId ? state.foodItems.foodItems.find((item) => item._id === currentId) : null );
    const user = JSON.parse(localStorage.getItem('profile'));
    const [isChecked, setIsChecked] = useState({ breakfast: false, lunch: false, dinner: false });
    const [showForm, setShowForm] = useState(false);
    const [isDiscount, setIsDiscount] = useState(false);
    const navigateTo = useNavigate();

    useEffect(() => {
        if(foodItem) setFoodData(foodItem);
    },[foodItem])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateFoodItem(currentId, { ...foodData, name: user?.result?.name }, navigateTo));

        } else {
            dispatch(createFoodItem({ ...foodData, name: user?.result?.name }));
        }
        clear();
    }

    const handleCheck = (e) => {
        const { name, checked } = e.target;
        setIsChecked((prevIsChecked) => ({
            ...prevIsChecked, [name]: checked
        }));
        setFoodData({ ...foodData, [e.target.name]: e.target.checked });
        
    }
    const FormPopUp = () => {
        setShowForm(!showForm);
    }

    const handleOnClose = () => {
        setShowForm(false);
    }

    const clear = () => {
        setCurrentId(null);
        setFoodData({ dish: '', description: '', tags: '', selectedFile: '', breakfast: false, lunch: false, dinner: false, price: 0, discount: 0 });
        setIsChecked({ breakfast: false, lunch: false, dinner: false });
        setIsDiscount(false);
    }

    if(!user?.result?.name) {
        return (
            <div>
                <div>
                    Please sign In to create your own FoodItems or to rate other people foodItems.
                </div>
            </div>
        )
    }

    return (
        <div>
        <button onClick={FormPopUp}>Form</button>
        {showForm && (
            <div className='flex justify-center h-screen items-center bg-colorG'>
                <div className='w-full max-w-md px-6 py-1 bg-white rounded-lg shadow-md'>
                    <div className='flex items-center justify-center'>
                        <div className='w-full text-colorDB'>
                            <div className='flex items-center justify-center'>
                                <ion-icon size='large' name="fast-food" className='text-blue-700 text-4xl'></ion-icon>
                            </div>
                        </div>
                        <span className='ml-auto text-exit'><ion-icon name="close" onClick={handleOnClose}></ion-icon></span>
                    </div>
                    <form className='my-4' onSubmit={handleSubmit}>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="dish" id="dish" value={foodData.dish} onChange={(e) => setFoodData({ ...foodData, dish: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autoComplete='off' />
                            <label htmlFor="dish" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Dish Name</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="description" id="description" value={foodData.description} onChange={(e) => setFoodData({ ...foodData, description: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autoComplete='off' />
                            <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                        </div>
                        <div className="relative z-0 w-full pt-3 group">
                            <label htmlFor="selectedFile" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dish Image</label>
                            <FileBase type="file" multiple={false} onDone={({base64}) => setFoodData({ ...foodData, selectedFile: base64 })} name="selectedFile" id="selectedFile" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autoComplete='off' />
                        </div>
                        {/* <div className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'>
                            <FileBase type='file' multiple={false} onDone={({base64}) => setFoodData({ ...foodData, selectedFile: base64 })} />
                        </div> */}

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-6 group">
                                <input type="text" name="tags" id="tags" value={foodData.tags} onChange={(e) => setFoodData({ ...foodData, tags: e.target.value.split(',') })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                <label htmlFor="tags" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">tags</label>
                            </div>
                            <h3 className="text-sm mb-4 text-gray-900">Availability</h3>
                            <ul className="items-center mb-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                    <div className="flex items-center pl-3">
                                        <label htmlFor="breakfast" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">
                                            <input id="breakfast" name='breakfast' type="checkbox" checked={isChecked.breakfast} onChange={handleCheck} className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            BreakFast</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                    <div className="flex items-center pl-3">
                                        <label htmlFor="lunch" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">
                                            <input id="lunch" name='lunch' type="checkbox" checked={isChecked.lunch} onChange={handleCheck} className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            Lunch</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                    <div className="flex items-center pl-3">
                                        <label htmlFor="dinner" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">
                                            <input id="dinner" name='dinner' type="checkbox" checked={isChecked.dinner} onChange={handleCheck} className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            Dinner
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-2 group">
                                <input type="Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="price" id="price" value={foodData.price} onChange={(e) => setFoodData({ ...foodData, price: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autoComplete='off' />
                                <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                            </div>
                        </div>
                        <div className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
                                    <div className="flex items-center mb-4">
                                        <label htmlFor="discount" className="w-full py-3 ml-2 text-sm font-medium text-gray-900">
                                            <input id="discount" name='discount' type="checkbox" checked={isDiscount} onChange={() => setIsDiscount(!isDiscount)} className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            Add Discount</label>
                                    </div>
                                </div>
                                {isDiscount && (
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 w-full mb-6 group">
                                            <input type="Number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="discount" id="discount" value={foodData.discount} onChange={(e) => setFoodData({ ...foodData, discount: e.target.value })} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required autoComplete='off' />
                                            <label htmlFor="discount" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Discount Price</label>
                                        </div>
                                    </div>
                                )}
                        <button type="submit" className="mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                        <button type='button' onClick={clear}  className="text-white bg-exit focus:ring-4 focus:outline-none focus:ring-red-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Clear</button>
                    </form>
                </div>
            </div>
        )}
    </div>
 )
}

export default Form
        // <div>
        //     <button onClick={FormPopUp}>Form</button>
        //     {showForm && (
        //         <div className='h-screen inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        //             <div className="bg-white m-2 text-black rounded">
        //             {/* <div className='flex justify-center items-center h-screen bg-colorG'>
        //         <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>
        //           <div className='flex items-center justify-center'> */}
        //                 <div className='flex justify-center'>
        //                     <h2>Form</h2>
        //                     <span className='ml-auto bg-exit '>
        //                         <ion-icon name="close-outline" onClick={handleOnClose}></ion-icon>
        //                     </span>
        //                 </div>
        //                 <form onSubmit={handleSubmit}>
        //                     <div className='flex justify-between'>
        //                         <label htmlFor="dish">Dish Name </label>
        //                         <input type="text" id="dish" value={foodData.dish} onChange={(e) => setFoodData({ ...foodData, dish: e.target.value })} autoComplete='off' name="dish" />
        //                     </div>
        //                     <div className='p-3'>
        //                         <label htmlFor="description">Description  </label>
        //                         <input type="text" id="description" value={foodData.description} onChange={(e) => setFoodData({ ...foodData, description: e.target.value })} autoComplete='off' name="description" />
        //                     </div>
        //                     <div className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none'>
        //                         <FileBase type='file' multiple={false} onDone={({base64}) => setFoodData({ ...foodData, selectedFile: base64 })} />
        //                     </div>
        //                     <div className='p-3'>
        //                         <label htmlFor="tags">tags </label>
        //                         <input type="text" id="tags" value={foodData.tags} onChange={(e) => setFoodData({ ...foodData, tags: e.target.value.split(',') })} autoComplete='off' name="tags" />
        //                     </div>
        //                     <div className='p-3'>
        //                     <label htmlFor='breakfast'>
        //                     <input id='breakfast' name="breakfast" type="checkbox" checked={isChecked.breakfast} onChange={handleCheck} />
        //                         Breakfast
        //                     </label>
        //                     <label htmlFor='lunch'> <input id='lunch' name="lunch" type="checkbox" checked={isChecked.lunch} onChange={handleCheck} />
        //                         Lunch
        //                     </label>
        //                     <label htmlFor='dinner'> <input id='dinner' name="dinner" type="checkbox" checked={isChecked.dinner} onChange={handleCheck} />
        //                         Dinner
        //                     </label>
        //                         <label htmlFor="price">price </label>
        //                         <input type="number" id="price" value={foodData.price} onChange={(e) => setFoodData({ ...foodData, price: e.target.value })} autoComplete='off' name="price" />
        //                     </div>
        //                     <button type='submit'>Submit</button>
        //                     <button type='button' onClick={clear}>Clear</button>
        //                 </form>
        //             </div>
        //         </div>
        //     )}
        // </div>