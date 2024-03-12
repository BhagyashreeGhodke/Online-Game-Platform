import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import adminSlice from './adminSlice';
import currencySlice from './currencySlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        admin : adminSlice,
        currency: currencySlice
    }
});


export default store;