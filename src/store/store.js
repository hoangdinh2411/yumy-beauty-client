import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import servicesReducer from 'store/services/reducer'
import messageReducer from 'store/message/reducer'
import categoriesReducer from 'store/categories/reducer'
import couponReducers  from 'store/coupons/reducer'
import staffsReducer  from 'store/staffs/reducer'
import filterReducer from 'store/filter/reducers'

const rootReducers =combineReducers({
    message: messageReducer,
    services: servicesReducer,
    categories: categoriesReducer,
    coupons: couponReducers,
    staffs: staffsReducer,
    filter : filterReducer
})

const store = createStore(rootReducers ,composeWithDevTools(applyMiddleware(thunk)) )

export default store