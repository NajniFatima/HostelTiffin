import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';
import { LOGOUT } from '../constants/actionTypes';

const Menu = ({visible, onClose }) => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    useEffect(() => {
        const token = user?.token;
        
        if(token) {
            const decodedToken = decode(token);
            
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [])
    
    const handleLogIn = () => {
        navigateTo('/role');
    }

    const logout = () => {
        dispatch({ type: LOGOUT });
        navigateTo('/');
        setUser(null);
    }

    if(!visible) return null;

    return (
        <div className='relative'>
            <div className='fixed right-0 top-16 p-1 z-20 bg-colorG min-h-full overflow-y-auto w-full md:hidden flex flex-col mt-2'>
                {user ? (
                    <div className='flex flex-col text-lg gap-5 pl-3'>
                        <div className='flex gap-3 items-center justify-between'>
                            <div className=''>Profile</div>
                            {user?.result?.image ? (
                                <img className='w-10 h-10 rounded-full shadow-lg bg-white' src={user.result.image} />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-colorG flex items-center justify-center border border-colorDG text-black font-bold text-lg mr-2">{user?.result?.name.charAt(0)}</div>
                            )}
                        </div>
                        <div className=''  onClick={() => {}}>
                            My Orders
                        </div>
                        <div className=''  onClick={() => {}}>
                            My WishList
                        </div>
                        <div className=''  onClick={() => {}}>
                            My Cart
                        </div>
                        <div className=''  onClick={() => {}}>
                            Help
                        </div>
                        <div className=''  onClick={logout}>
                            LogOut
                        </div>
                    </div>
                ) : (
                <>
                    <div onClick={handleLogIn} className='mx-4 my-6 md:my-0 md:bg-colorDB md:py-3 md:rounded-lg md:px-4 md:hover:border md:hover:border-black'>
                        <div className='text-md duration-500'>
                            <span >Log In </span>
                        </div>
                    </div>
                    <div className='md:hidden mx-4 my-6 md:my-0'>
                        <div className='text-md duration-500'>
                            <span onClick={() => {}}> Help </span>
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

export default Menu