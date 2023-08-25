import React ,{useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFoodItems } from '../actions/foodItems';
import { Link } from 'react-router-dom';

const Pagination = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.foodItems)
  
  useEffect(() => {
    if(page)
      dispatch(getFoodItems(page));
  }, [page])

  const links = [];

  for (let i = 1; i <= numberOfPages; i++) {
    const link = (
      <li key={i}>
        <Link
          to={`/foodItems?page=${i}`}
          className={`px-3 py-2 leading-tight text-gray-500 ${
            i === page ? "bg-blue-50 text-blue-600" : "bg-white"
          } border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
        >
          {i}
        </Link>
      </li>
    );
    links.push(link);
  }

  return (
    <nav aria-label="Page navigation example">
    <ul className="inline-flex items-center -space-x-px">
        <li>
        <Link
            to={`/foodItems?page=${Math.max(1, page - 1)}`} className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
            <span className="sr-only">Previous</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
        </Link>
        </li>
        {links}
        <li>
        <Link
            to={`/foodItems?page=${Math.min(numberOfPages, page + 1)}`} className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 roundedR-lg hover:bg-gray-100 hover:text-gray-700">
            <span className="sr-only">Next</span>
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        </Link>
        </li>
    </ul>
    </nav>
  )
}

export default Pagination;