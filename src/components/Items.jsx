import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodItem } from '../actions/foodItems';
import { useNavigate, useLocation } from 'react-router-dom';
import Breakfast from './Breakfast';
import Lunch from './Lunch';
import Dinner from './Dinner';
import Form from './Form';
import Pagination from './Pagination';
import { getFoodItems } from '../actions/foodItems';
import CartButton from './CartButton';
import Footer from './Footer';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Items = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { foodItems, isLoading } = useSelector((state) => state.foodItems);
  const user = JSON.parse(localStorage.getItem('profile'));
  const query = useQuery();
  const page = query.get('page') || 1;
  // console.log(foodItems);
  console.log(isLoading)

    

  // RATE WALA CODES.

  if(!foodItems.length && !isLoading) return 'No posts';


  return (
    isLoading ? ( 
      <div className="flex justify-center items-center font-['readex']">
        <div className="flex items-center justify-center w-full rounded-lg bg-white">
          <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
              <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    ) : (
      <div className='mx-auto max-w-screen-md'>
        <div className='bg-colorG flex justify-between'>
          <div className='text-center w-1/3 p-1'>
            <h6 className='text-md'>Breakfast</h6>
          </div>
          <div className='border border-x-colorDG border-y-white text-center w-1/3 p-1'>
            <h6 className='text-md'>Lunch</h6> 
          </div>
          <div className='text-center w-1/3 p-1'>
            <h6 className='text-md'>Dinner</h6>
          </div>
        </div>
        <div className='flex bg-gray-200 max-w-screen-md mx-auto'>
          <Breakfast currentId={currentId} setCurrentId={setCurrentId} />
          <Lunch setCurrentId={setCurrentId} />
          <Dinner setCurrentId={setCurrentId} />
        </div>
        <CartButton />
        <Pagination page={page}  />
        <Footer />
      </div>
    )
    )
}
  
  export default Items

        

        {/* {foodItems.map((food) => (
          // p-6 max-w-sm mx-auto  rounded-xl shadow-lg flex items-center space-x-4"
          <div key={food._id} onClick={() => navigateTo(`/foodItems/${food._id}`)} className='flex'>
            <div className=''>
              {food.breakfast && (
                <div className='mr-auto w-1/3 flex flex-col'>
                  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a href="#">
                        <img class="p-8 rounded-t-lg" src={food.selectedFile} alt={food.dish} />
                      </a>
                      <div class="px-5 pb-5">
                        <a href="#">
                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{food.dish}</h5>
                        </a>
                        <div class="flex items-center mt-2.5 mb-5">
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{food.rate}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-3xl font-bold text-gray-900 dark:text-white">{food.price}</span>
                          <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                        </div>
                      </div>
                  </div>
                </div>
              )}
              {food.lunch && (
                <div className='mx-auto w-1/3'>
                  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a href="#">
                        <img class="p-8 rounded-t-lg" src={food.selectedFile} alt={food.dish} />
                      </a>
                      <div class="px-5 pb-5">
                        <a href="#">
                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{food.dish}</h5>
                        </a>
                        <div class="flex items-center mt-2.5 mb-5">
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{food.rate}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-3xl font-bold text-gray-900 dark:text-white">{food.price}</span>
                          <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                        </div>
                      </div>
                  </div>
                </div>
              )}
              {food.dinner && (
                <div className='ml-auto w-1/3'>
                  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                      <a href="#">
                        <img class="p-8 rounded-t-lg" src={food.selectedFile} alt={food.dish} />
                      </a>
                      <div class="px-5 pb-5">
                        <a href="#">
                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{food.dish}</h5>
                        </a>
                        <div class="flex items-center mt-2.5 mb-5">
                          <ion-icon name="star"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                          <ion-icon name="star-outline"></ion-icon>
                            <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">{food.rate}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-3xl font-bold text-gray-900 dark:text-white">{food.price}</span>
                          <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                        </div>
                      </div>
                  </div>
                </div>
              )}
            </div>
            {/* <div className='bg-white border border-gray-200 rounded-lg shadow'>
                <img className='rounded-t-lg w-screen p-0 h-56' src={food.selectedFile} alt="" />
              <div className='p-5'>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{food.dish}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">{food.price}</p>
              </div>
            </div> */}







            {/* <div className='bg-colorG ml-auto text-white pt-2'>
              <i className='m-8 pt-2'>
                <ion-icon size="large" name="ellipsis-vertical-outline"></ion-icon>
              </i>
                <div className="text-xl mt-4 font-medium">{food.name}</div>
            </div> */}





              {/* {(user?.result?.googleId === food?.creator || user?.result?._id === food?.creator) && (
                <>
                  <ion-icon onClick={() => setCurrentId(food._id)} name="ellipsis-horizontal-outline"></ion-icon>
                  <ion-icon onClick={() => dispatch(deleteFoodItem(food._id))} name="trash-outline"></ion-icon>
                </>
              )} */}
          {/* </div> */}
        {/* ))} */}
      {/* </div> */}
