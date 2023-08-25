import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getFoodItemsBySearch, getItem } from '../actions/foodItems';
import moment from 'moment';
import Header from '../components/Header';
import Reviews from './Reviews';

const ItemDetail = () => {
    const { item, foodItems , isLoading } = useSelector((state) => state.foodItems);
    const [visible, setVisible] = useState(3);
    // console.log(foodItems);
    // console.log('item', item);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const { id } = useParams();
    // console.log(isLoading);

    useEffect(() => {
      dispatch(getItem(id));
    }, [id])

    useEffect(() => {
      if(item) {
        dispatch(getFoodItemsBySearch({ search: 'none', tags: item?.tags.join(',')}));
      }
    }, [item])

    const openFoodItem = (_id) => {
      navigateTo(`/foodItems/${_id}`);
    }

    if(!item) return null;

    if(isLoading) {
      <div className="flex justify-center items-center font-['readex']">
        <div className="flex items-center justify-center w-full rounded-lg bg-white">
          <div role="status">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
              <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    }

    const recommendedFoodItems = foodItems.filter(({ _id}) => _id !== item._id);

    const showMoreItems = () => {
      setVisible((prev) => prev + 3);
    }

    return (
      <>
      <Header />
      <div>
        <a href="/" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <img className="object-cover w-full rounded-t-lg h-96" src={item.selectedFile} alt="" />
          <div className='flex w-full items-center gap-2 p-2'>
            <span className='flex gap-1 overflow-ellipsis overflow-hidden whitespace-nowrap'>
              {item.tags.length && item.tags[0] && (
                item.tags.map((tag, index) => (
                  <span key={index} className='px-4 py-2 rounded-full text-xs bg-colorG4'>{tag}</span>
                ))
              )}
            </span>
            <span className='text-colorStar flex mr-6'>
                <ion-icon size='small' name="star"></ion-icon>
                <span className='text-sm text-colorDG pl-1'>{item.rate}</span>
            </span>
          </div>
          <div className="flex flex-col justify-between px-4 py-2 mr-auto">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{item.dish}</h5>
                <p className="mb-3 font-normal text-gray-700">{item.description}</p>
              <div className='flex p-1 gap-3 item-center'>
                <p>Available for: </p>
                {item.breakfast && <span className='flex px-2 rounded-full text-xs bg-colorG4 justify-center items-center'>Breakfast</span>}
                {item.lunch && <span className='flex px-2 rounded-full text-xs bg-colorG4 justify-center items-center'>Lunch</span>}
                {item.dinner && <span className='flex px-2 rounded-full text-xs bg-colorG4 justify-center items-center'>Dinner</span>}
              </div>
              <p className='text-sm p-2'>See more of creators menu: </p>
              <div className='flex bg-gray-200 w-full gap-3 rounded-md p-1 pt-2'>
                <div>
                  <div className='rounded-full bg-exit w-12 h-12'></div>
                </div>
                <div className='text-sm'>
                  <div>
                    {item.name}
                  </div>
                  <div>detail2: Total orders</div>
                  <div>detail3: Rate</div>
                </div>
              </div>
              <p className='pt-2'>Address: </p>
              <p>ABC streets, DEF state coumtry, pincode XYZ</p>
              <p>Maps Section</p>
          </div>
        </a>
        <div>
          <Reviews item={item} />
        </div>
        <div>
          {recommendedFoodItems.length && (
            <div>
              <div>
                You might also like:
              </div>
              <div>
                <div className=''>
                  {recommendedFoodItems.slice(0,visible).map((recommendedItem) => (
                    <div key={recommendedItem._id} onClick={() => openFoodItem(_id)}>
                      <div className='flex flex-col'>
                            <div className='relative bg-white w-full min-h-[10rem] overflow-hidden pb-1'>
                                <div onClick={() => navigateTo(`/foodItems/${recommendedItem._id}`)}>
                                    <img className="w-full object-cover h-44 hover:" src={recommendedItem.selectedFile} alt={recommendedItem.dish} />
                                </div>
                                <div>
                                    <div className='p-2 flex flex-col gap-1' onClick={() => navigateTo(`/foodItems/${recommendedItem._id}`)}>
                                        <div className='flex'>
                                            <h2 className='mr-auto font-semibold text-sm overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                                {recommendedItem.dish}
                                            </h2>
                                            {(user?.result?.googleId === recommendedItem?.creator || user?.result?._id === recommendedItem?.creator) && (
                                            <div onClick={handleOptions} className='cursor-pointer px-1 bg-colorG'>
                                                <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                                            </div>
                                            )}
                                        </div>
                                        <div className='flex items-center gap-1 '>
                                            <span className='overflow-ellipsis overflow-hidden whitespace-nowrap'>
                                                {recommendedItem.tags.map((tag, index) => (
                                                    <span key={index} className='px-1 py-1 rounded-full text-xs bg-colorG '>{tag}</span>
                                                ))}
                                            </span>
                                            <span className='text-colorStar ml-1 flex item-center ml-auto'>
                                                <ion-icon name="star"></ion-icon>
                                                <span className='text-xs text-colorDG pl-1'>5.{recommendedItem.rate}</span>
                                            </span>
                                        </div>

                                        {recommendedItem.discount? (
                                            <div className='mr-auto'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-sm'><span>&#8377;</span>{recommendedItem.discount}</span>
                                                    <span className='text-xs line-through opacity-50 '><span>&#8377;</span>{recommendedItem.price}</span>
                                                    <span className='absolute left-0 top-36 bg-green-500 px-0.5 py-0.5 text-xs text-white'>save {100 - (recommendedItem.discount/recommendedItem.price*100)}%</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='mr-auto'>
                                                <div className='flex items-center gap-2'>
                                                    <span className='text-sm'><span>&#8377;</span>{recommendedItem.price}</span>
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
                                        {(user?.result?.googleId === recommendedItem?.creator || user?.result?._id === recommendedItem?.creator) && (
                                            <div className='ml-auto mr-2 '>
                                                <ion-icon onClick={() => dispatch(deleteFoodItem(recommendedItem._id))} name="trash-outline"></ion-icon>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                  ))}
                    <div className='flex justify-center'>
                      <button onClick={showMoreItems}>
                        See more...            
                      </button>
                    </div>
                    </div>  
                </div>
            </div>
          )}
        </div>
      </div>
      </>
    )
}

export default ItemDetail