import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getFoodItems } from '../actions/foodItems';
import Header from './Header';
import Items from './Items';
import Form from './Form';
import Footer from './Footer';
import Pagination from './Pagination';
import CartButton from './CartButton';
import Start from './Start';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1;
  

  // useEffect(() => {
  //   if(page)
  //     dispatch(getFoodItems)
  // }, [page]);

  return (
    <div>
      {/* <Start /> */}
      <Header />
      {/* <Cart /> */}
      <Items currentId={currentId} setCurrentId={setCurrentId} />
      <Pagination page={page}  />
      {/* <Form currentId={currentId} setCurrentId={setCurrentId} /> */}
      {/* <Footer /> */}
    </div>
    
  )
}

export default Home