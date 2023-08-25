import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Breakfast = ({ setCurrentId }) => {
    const navigateTo = useNavigate();
    const { foodItems } = useSelector((state) => state.foodItems);
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleOptions = () => {
        setCurrentId(food._id)
    }

    return (
        <div className='text-center w-1/3 p-1'>
            {foodItems.map((food) => (
                <div key={food._id} onClick={() => navigateTo(`/foodItems/${food._id}`)}>
                    {food.dinner && (
                        <div className='flex flex-col'>
                            <div className='relative bg-white w-full min-h-[10rem] overflow-hidden pb-1'>
                                <div onClick={() => navigateTo(`/foodItems/${food._id}`)}>
                                    <img className="w-full object-cover h-44 hover:" src={food.selectedFile} alt={food.dish} />
                                </div>
                                <div>
                                    <div className='p-2 flex flex-col gap-1' onClick={() => navigateTo(`/foodItems/${food._id}`)}>
                                        <div className='flex'>
                                            <h2 className='mr-auto font-semibold text-sm overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                                {food.dish}
                                            </h2>
                                            {(user?.result?.googleId === food?.creator || user?.result?._id === food?.creator) && (
                                            <div onClick={handleOptions} className='cursor-pointer px-1 bg-colorG'>
                                                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                                            </div>
                                            )}
                                        </div>
                                        <div className='flex items-center gap-1 '>
                                            <span className='overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                                {food.tags.map((tag, index) => (
                                                    <span key={index} className='px-1 py-1 rounded-full text-xs bg-colorG '>{tag}</span>
                                                ))}
                                            </span>
                                            <span className='text-colorStar ml-1 flex item-center ml-auto'>
                                                <ion-icon name="star"></ion-icon>
                                                <span className='text-xs text-colorDG pl-1'>5.{food.rate}</span>
                                            </span>
                                        </div>

                                        {food.discount? (
                                            <div className='mr-auto'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-sm'><span>&#8377;</span>{food.discount}</span>
                                                    <span className='text-xs line-through opacity-50 '><span>&#8377;</span>{food.price}</span>
                                                    <span className='absolute left-0 top-36 bg-green-500 px-0.5 py-0.5 text-xs text-white'>save {100 - (food.discount/food.price*100)}%</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='mr-auto'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-sm'><span>&#8377;</span>{food.price}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex gap-2 justify-between items-center'>
                                        <button className='gap-2 h-auto text-xs p-2 ml-2'>
                                            Add to cart
                                        </button>
                                        {/* <button className='flex-grow flex justi-center items-center bg-gray-300/60 hover:bg-gray-300/80 transition rounded-md'>
                                            <ion-icon name="heart"></ion-icon>
                                        </button> */}
                                         {(user?.result?.googleId === food?.creator || user?.result?._id === food?.creator) && (
                                            <div className='ml-auto mr-2 '>
                                                <ion-icon onClick={() => dispatch(deleteFoodItem(food._id))} name="trash-outline"></ion-icon>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Breakfast