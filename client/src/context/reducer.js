import { CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_ERROR, SETUP_USER_SUCCESS,
SETUP_USER_BEGIN, TOGGLE_SIDEBAR, LOGOUT_USER, UPDATE_USER_BEGIN,
UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, HANDLE_CHANGE, CLEAR_VALUES,
CREATE_JOB_BEGIN, CREATE_JOB_ERROR, CREATE_JOB_SUCCESS, 
GET_JOBS_BEGIN, GET_JOBS_SUCCESS, SET_EDIT_JOB, DELETE_JOB, EDIT_JOB_BEGIN, EDIT_JOB_SUCCESS, 
EDIT_JOB_ERROR, SHOW_STATS_BEGIN, SHOW_STATS_SUCCESS, CLEAR_FILTER, CHANGE_PAGE, DELETE_JOB_ERROR, GET_CURRENT_USER_BEGIN, GET_CURRENT_USER_SUCCESS} from "./actions";

import { initialState } from "./appContext.js";

const reducer = (state, action) => {
    if(action.type === DISPLAY_ALERT){
        return {
            ...state,
            showAlert:true,
            alertType:"danger",
            alertText:"Provide all values"
        }
    }
    if(action.type === CLEAR_ALERT){
        return {
            ...state,
            showAlert:false,
            alertType:'',
            alertText:'',
        }
    }
    if(action.type === SETUP_USER_BEGIN){
        return {
            ...state,
            isLoading: true
        }
    }
    if(action.type === SETUP_USER_SUCCESS){
        return {
            ...state,
            isLoading: false,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: "success",
            alertText: action.payload.alertText
        }
    }
    if(action.type === SETUP_USER_ERROR){
        return{
            ...state,
            isLoading:false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg
        }
    }
    if(action.type === TOGGLE_SIDEBAR){
        return{
            ...state,
            showSidebar: !state.showSidebar
        }
    }
    if(action.type === LOGOUT_USER){
        return{
            ...initialState,
            userLoading: false,
            user: null
        }
    }
    if(action.type === UPDATE_USER_BEGIN){
        return{
            ...state,
            isLoading: true
        }
    }
    if(action.type === UPDATE_USER_SUCCESS){
        return{
            ...state,
            isLoading: false,
            user: action.payload.user,
            location: action.payload.location,
            showAlert: true,
            alertText: "User Profile Updated!",
            alertType: "success"
        }
    }
    if(action.type === UPDATE_USER_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg,
        }
    }
    if(action.type === HANDLE_CHANGE) {
        return {
            ...state,
            [action.payload.name] : action.payload.value,
            page: 1
        }
    }
    if(action.type === CLEAR_VALUES){
        const initialState = {
            jobType:'full-time',
            status:'pending',
            position:'',
            company:'',
            jobLocation: state.userLocation,
            isEditing: false,
            editJobId: ''
        }
        return{
            ...state,
            ...initialState
        }
    }
    if(action.type === CREATE_JOB_BEGIN){
        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }
    if(action.type === CREATE_JOB_ERROR){
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }
    if(action.type === CREATE_JOB_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: "New Job Created"
        }
    }
    if(action.type === GET_JOBS_BEGIN){
        return{
            ...state,
            isLoading: true
        }
    }
    if(action.type === GET_JOBS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            jobs:action.payload.jobs,
            numOfPages: action.payload.numOfPages,
            totalJobs: action.payload.totalJobs
        }
    }
    if(action.type === SET_EDIT_JOB){
        const job = state.jobs.find((job)=>{
            return job._id === action.payload.id
        }
        )
        const {
            _id, position, company, status, jobType, jobLocation
        } = job
        return{
            ...state,
            editJobId: _id,
            isEditing: true,
            position,
            company,
            jobLocation, 
            jobType,
            status
        }
    }
    if(action.type === DELETE_JOB){
        return{
            ...state,
            isLoading:true
        }
    }
    if(action.type === EDIT_JOB_BEGIN){
        return{
            ...state,
            isLoading:true,
            showAlert:false,
        }
    }
    if(action.type === EDIT_JOB_SUCCESS){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Job Updated!'
        }
    }
    if(action.type === EDIT_JOB_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg
        }
    }
    if(action.type === DELETE_JOB_ERROR){
        return{
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: "danger",
            alertText: action.payload.msg
        }
    }
    if(action.type === SHOW_STATS_BEGIN){
        return{
            ...state,
            isLoading: true,
            showAlert: false
        }
    }
    if(action.type === SHOW_STATS_SUCCESS){
        return{
            ...state,
            isLoading: false,
            stats: action.payload.stats,
            monthlyApplications: action.payload.monthlyApplications
        }
    }
    if(action.type === CLEAR_FILTER){
        const {search, searchType, searchStatus, sorting} = initialState
        return{
            ...state,
            search,
            searchType,
            searchStatus,
            sorting
        }
    }
    if(action.type === CHANGE_PAGE){
        return{
            ...state,
            page:action.payload.page
        }
    }
    if(action.type === GET_CURRENT_USER_BEGIN){
        return {...state, userLoading: true, showAlert: false}
    }
    if(action.type === GET_CURRENT_USER_SUCCESS){
        return{
            ...state,
            userLoading : false,
            user: action.payload.user,
            location: action.payload.location,
            jobLocation: action.payload.location
        }
    }
    throw new Error(`no such action:${action.type}`);
}

export default reducer;