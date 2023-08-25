import React, { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import final from '../assets/final.svg'
import FilterPopup from './FilterPopup';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../constants/actionTypes';
import { getFoodItemsBySearch } from '../actions/foodItems';
import Menu from './Menu';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Header = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isVeg, setIsVeg] = useState(false);
    const [isNonVeg, setIsNonVeg] = useState(false);
    const [searchDish, setSearchDish] = useState('');
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    useEffect(() => {
        const token = user?.token;
        
        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, []);
    //navigateTo
    //location

    const handleOnClose = () => setShowFilter(false);

    const closeMenu = () => setShowMenu(false);

    const handleLogIn = () => {
        navigateTo('/auth');
    }

    const handleSearchDish = () => {
        if(searchDish.trim()) {
            dispatch(getFoodItemsBySearch({ searchDish, tags: tags.join(',') }));  //// tags: tags.join(',')
            navigateTo(`/foodItems/search?searchQuery=${searchDish || 'none' }&tags=${tags.join(',')}`);    // &tags=${tags.join(',')}
        } else {
            navigateTo('/');
        }
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            handleSearchDish();
        }
    }
    
    const logout = () => {
        dispatch({ type: LOGOUT });
        navigateTo('/');
        setUser(null);
    }

    return (
        <nav className='bg-colorB border-gray-200'>
            <div className={`${showMenu && 'fixed z-20 bg-colorB w-full'} max-w-screen-md flex items-center mx-auto justify-between font-["oswald"] py-2`}>
                <span className='flex items-center justify-between gap-2'>
                    <a href='/' className='flex items-center'>
                        <img src={final} alt='HealthyUG' className='bg-colorB h-14 md:h-24 p-0 w-auto' />
                    </a>
                    <div className='flex bg-white justify-around items-center h-full mx-auto rounded-lg p-0'>
                        <i className='flex items-center mr-2 ml-1'>
                            <ion-icon name="location-outline" ></ion-icon>
                            <span className="sr-only">Location icon</span>
                        </i>
                        <input type='text' placeholder="Location" className='block w-full p-2 pl-1 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-0' />
                        <div className='mr-2 transform rotate-0 transition ease-in-out duration-250 cursor-pointer' >
                            <ion-icon name="caret-down-outline"></ion-icon>
                        </div>
                        <div className='w-36rem max-h-434.5px bg-white rounded-lg absolute left-0 overflow-auto border border-gray-300 shadow-md top-3rem invisible opacity-0 transition-opacity transition-top duration-250 ease-in-out z-10' >
                            <div className='cursor-pointer bg-white shadow-inset-gray-200 pb-1.8 pr-1.8 pl-1.5' >
                                <div className='flex font-medium items-center'>
                                    <div className='w-10' >
                                        <i className='flex items-center cursor-default'>
                                            <ion-icon name="radio-button-on-outline" ></ion-icon>
                                        </i>
                                    </div>
                                    <p className='leading-1.5 m-0 text-red-500 text-lg font-normal text-left'>Current Location</p>
                                </div>
                                <p className='line-height-6 ml-10 text-lg text-gray-600 text-left'>Using GPS</p>
                            </div>
                        </div>
                    </div>
                </span>
                <span  onClick={() => setShowMenu(!showMenu)} className='inline-flex md:hidden text-black hover:bg-white focus:outline-none ml-auto focus:ring-2 focus:ring-gray-200 static rounded-lg text-sm p-2.5 mr-1'>
                    <ion-icon className='p-0' name={showMenu ? "close" : "menu"}></ion-icon>
                    {showMenu && (
                        <Menu visible={showMenu} onClose={closeMenu} />
                    )}
                </span>
            
                <ul className='hidden bg-white md:flex md:items-center md:bg-colorG md:w-auto md:pb-0 md:opacity-100 transition-all ease-in duration-500' >
                     {/* {`  absolute md:z-auto z-[-1] pl-9 ${showMenu? 'left-10' : 'right-20'}`} */}
                    <li className='bg-colorB'>
                        {user ? (
                            <div className='flex gap-3 items-center justify-between'>
                                {user?.result?.image ? (
                                    <img className='w-12 h-12 rounded-full shadow-lg bg-white' src={user.result.image} />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-colorG flex items-center justify-center border border-colorDG text-black font-bold text-lg mr-2">{user?.result?.name.charAt(0)}</div>
                                )}
                                <button className='bg-exit' onClick={logout}>LogOut</button>
                            </div>
                        ) : (
                            <div className='hidden md:block md:flex-row '>
                                <div onClick={handleLogIn} className='mx-4 my-6 md:my-0 md:bg-green-50 md:py-3 md:rounded-lg md:px-4 md:hover:border md:hover:border-black'>
                                    <a href="#" className='text-md duration-500'>
                                        <span >Log In </span>
                                    </a>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
            <div className='sticky rounded-t-lg top-0 bg-white flex max-w-screen-md mx-auto'>
                <div className='relative w-full mx-2'>
                    <div className='flex sticky top-0 bg-white transition duration-500 ease-in-out'>
                        <div onClick={() => setShowFilter(true)} className='flex-shrink-0 mr-4 relative mb-4 mt-4'>
                            <div className='border border-gray-300 text-gray-600 bg-white shadow-sm rounded-lg p-2 flex items-center cursor-pointer h-full text-lg' >
                                <div className='mr-2' >
                                    <div className='min-w-2.2rem py-0.1 px-0.2 pb-0.2 rounded-md flex justify-center items-center' >
                                        <ion-icon name="filter-outline"></ion-icon>
                                    </div>
                                </div>
                                Filters
                            </div>
                        </div>
                        <div onClick={() => setIsVeg(!isVeg)} className='hidden md:flex md:mr-3 md:relative md:mb-4 md:mt-4' >
                            <div className={`${isVeg ? 'border border-colorB bg-colorDB shadow-sm rounded-lg p-2 flex items-center cursor-pointer h-full text-black text-lg' : 'border border-gray-300 text-gray-600 bg-white shadow-sm rounded-lg p-2 flex items-center cursor-pointer h-full text-lg'}`} >
                            Pure veg
                                {isVeg &&
                                <div className='ml-2' >
                                    <div className='flex items-center cursor-default' >
                                        <ion-icon name="close-outline"></ion-icon>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                        <div onClick={() => setIsNonVeg(!isNonVeg)} className='hidden md:flex md:mr-3 md:relative md:mb-4 md:mt-4' >
                            <div className={`${isNonVeg ? 'border border-colorG bg-colorDB shadow-sm rounded-lg p-2 flex items-center cursor-pointer h-full text-black text-lg' : 'border border-gray-300 text-gray-600 bg-white shadow-sm rounded-lg p-2 flex items-center cursor-pointer h-full text-lg'}`} >
                            Non veg
                                {isNonVeg &&
                                <div className='ml-2' >
                                    <div className='flex items-center cursor-default' >
                                        <ion-icon name="close-outline"></ion-icon>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                        {/* <div className='hidden md:flex md:mr-3 md:relative md:mb-4 md:mt-4'>
                            <div className='border border-gray-300 text-gray-600 bg-white shadow-sm rounded-lg p-2 flex items-center cursor-pointer h-full text-lg'>
                                Tag
                                <div className='ml-2 transform rotate-0 transition ease-in-out duration-250 cursor-pointer' >
                                    <ion-icon name="caret-down-outline"></ion-icon>
                                </div>
                            </div>
                        </div> */}
                        <div className='flex rounded-lg top-0 mb-4 mt-4 ml-auto mr-4 border border-gray-300'>
                            <i className='flex items-center p-1 ml-1 text-gray-900 '>
                                <ion-icon name="search-outline" ></ion-icon>
                                <span className="sr-only">Search icon</span>
                            </i>
                            <input type='text' placeholder="search" onKeyDown={handleKeyPress} onChange={(e) => setSearchDish(e.target.value)} className='block w-full pl-2 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-0' />
                            <button onClick={handleSearchDish} className="text-white h-full right-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm">
                                <ion-icon name="search"></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FilterPopup visible={showFilter} onClose={handleOnClose} />
        </nav>

    )
}

export default Header








// <div>
        //     <nav className='bg-colorB border-gray-200'>
        //         <div className='max-w-screen-md flex flex-wrap items-center mx-auto justify-between font-["oswald"]'>
        //             <div className=''>
        //                 <a href='/' className='flex items-center'>
        //                     <img src={final} alt='hostelTiffin' className='bg-colorB h-14 md:h-24 p-0 w-auto' />
        //                 </a>
        //             </div>
        //             <div className='flex bg-white justify-around items-center relative h-full w-1/2 md:w-96 rounded-lg p-0 1rem'>
        //                 <i className='flex items-center mr-2 ml-1'>
        //                     <ion-icon name="location-outline" ></ion-icon>
        //                     <span className="sr-only">Location icon</span>
        //                 </i>
        //                 <input type='text' placeholder="Location" className='block w-full p-2 pl-1 text-sm text-gray-900' />
        //                 <div className='mr-2 transform rotate-0 transition ease-in-out duration-250 cursor-pointer' >
        //                     <ion-icon name="caret-down-outline"></ion-icon>
        //                 </div>



        //                 <div className='w-36rem max-h-434.5px bg-white rounded-lg absolute left-0 overflow-auto border border-gray-300 shadow-md top-3rem invisible opacity-0 transition-opacity transition-top duration-250 ease-in-out z-10' >
        //                     <div className='cursor-pointer bg-white shadow-inset-gray-200 pb-1.8 pr-1.8 pl-1.5' >
        //                         <div className='flex font-medium items-center'>
        //                             <div className='w-10' >
        //                                 <i className='flex items-center cursor-default'>
        //                                     <ion-icon name="radio-button-on-outline" ></ion-icon>
        //                                 </i>
        //                             </div>
        //                             <p className='leading-1.5 m-0 text-red-500 text-lg font-normal text-left'>Current Location</p>
        //                         </div>
        //                         <p className='line-height-6 ml-10 text-lg text-gray-600 text-left'>Using GPS</p>
        //                     </div>
        //                 </div>
        
        
        
        //             </div>
        //             <span  onClick={() => setShowMenu(!showMenu)} className='md:hidden text-gray-500 hover:bg-colorG focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1'>
        //                 <ion-icon name={showMenu ? "close" : "menu"}></ion-icon>
        //             </span>
        //             <ul className={`${!showMenu && 'hidden'}  ml-auto bg-white left-0 pb-1 md:flex md:items-center md:bg-colorG md:w-auto md:pb-0 md:opacity-100 transition-all ease-in duration-500`} >
        //             {/* {`  absolute md:z-auto z-[-1] pl-9 ${showMenu? 'left-10' : 'right-20'}`} */}
        //                 <li className=''>
        //                     {user ? (
        //                         <div className=''>
        //                             <img alt={user.result.name} src={user.result.image} />
        //                             {user.result.name}
        //                             <button onClick={logout}>LogOut</button>
        //                         </div>
        //                     ) : (
        //                         <span className='flex flex-col md:flex-row'>
        //                             <button className='mx-4 my-6 md:my-0'>
        //                                 <a href="#" className='text-md duration-500'>
        //                                     <span onClick={handleLogIn}>Log In </span>
        //                                 </a>
        //                             </button>
        //                             <button className='mx-4 my-6 md:my-0'>
        //                                 <a href="#" className='text-md duration-500'>
        //                                     <span onClick={handleLogIn}> Add Dish </span>
        //                                 </a>
        //                             </button>
        //                         </span>
        //                     )}
        //                 </li>
        //             </ul>
        //         </div>
        //         <div className='sticky rounded-t-lg top-0 bg-white flex max-w-screen-md mx-auto'>
        //             <div className='relative max-w-full mx-6'>
        //                 <div className='flex flex-wrap sticky top-0 pt-4 pb-4 bg-white z-20 transition duration-500 ease-in-out'>
        //                     <div onClick={() => setShowFilter(true)} className='flex-shrink-0 mr-1.5 relative mb-4 mt-4'>
        //                         <div className='border border-gray-300 text-gray-600 bg-white shadow-sm rounded-lg p-4 flex items-center cursor-pointer h-full text-lg' >
        //                             <div className='mr-2' >
        //                                 <div className='min-w-2.2rem py-0.1 px-0.2 pb-0.2 rounded-md flex justify-center items-center' >
        //                                     <ion-icon name="filter-outline"></ion-icon>
        //                                 </div>
        //                             </div>
        //                             Filters
        //                         </div>
        //                     </div>
        //                     <div onClick={() => setIsVeg(!isVeg)} className='flex-shrink-0 mr-3 relative mb-4 mt-4' >
        //                         <div className={`${isVeg ? 'border border-colorB bg-colorG shadow-sm rounded-lg p-4 flex items-center cursor-pointer h-full text-white text-lg' : 'border border-gray-300 text-gray-600 bg-white shadow-sm rounded-lg p-4 flex items-center cursor-pointer h-full text-lg'}`} >
        //                         Pure veg
        //                             {isVeg &&
        //                             <div className='ml-2' >
        //                                 <div className='flex items-center cursor-default' >
        //                                     <ion-icon name="close-outline"></ion-icon>
        //                                 </div>
        //                             </div>
        //                             }
        //                         </div>
        //                     </div>
        //                     <div onClick={() => setIsNonVeg(!isNonVeg)} className='flex-shrink-0 mr-3 relative mb-4 mt-4' >
        //                         <div className={`${isNonVeg ? 'border border-colorB bg-colorG shadow-sm rounded-lg p-4 flex items-center cursor-pointer h-full text-white text-lg' : 'border border-gray-300 text-gray-600 bg-white shadow-sm rounded-lg p-4 flex items-center cursor-pointer h-full text-lg'}`} >
        //                          Non veg
        //                             {isNonVeg &&
        //                             <div className='ml-2' >
        //                                 <div className='flex items-center cursor-default' >
        //                                     <ion-icon name="close-outline"></ion-icon>
        //                                 </div>
        //                             </div>
        //                             }
        //                         </div>
        //                     </div>
        //                     <div className='flex-shrink-0 mr-3 relative mb-4 mt-4'>
        //                         <div className='border border-gray-300 text-gray-600 bg-white shadow-sm rounded-lg p-4 flex items-center cursor-pointer h-full text-lg'>
        //                             Tag
        //                         </div>
        //                     </div>
        //                 </div>

        //             </div>
        //         </div>
        //     <FilterPopup visible={showFilter} onClose={handleOnClose} />
        // </div>