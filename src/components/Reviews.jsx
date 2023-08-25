import React, {useState, useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reviewItem } from '../actions/foodItems';

const Reviews = ({ item }) => {
    const dispatch = useDispatch();
    const { foodItems } = useSelector((state) => state.foodItems);
    const [reviews, setReviews] = useState(item?.reviews)
    const [review, setReview] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleClick = async () => {
        const finalReview = `${user.result.name}: ${review}`;
        const newReview = await dispatch(reviewItem(finalReview, item._id));

        setReview(newReview);
        setReview('');
    }

    return (
        <div>
            <div className='flex flex-col justify-between'>
                {user?.result?.name && (

                <div className='p-4'>
                    <div>
                        <label>Write a Review:</label>
                    </div>
                    <input className='border border-colorDG w-full h-32' value={review} onChange={(e) => setReview(e.target.value)} />
                    <button className='mt-2.5 w-full' disabled={!review} onClick={handleClick}>Send</button>
                </div>
                )}
                <div className='h-52 overflow-auto mr-6'>
                    <div>
                    Reviews
                    </div>
                    {reviews.map((r, i) => (
                        <div key={i}>
                            {r}       
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Reviews