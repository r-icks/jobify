import { useReducer, useContext, useEffect } from "react";
import React from "react";
import reducer from "./reducer";
import {
    CLEAR_ALERT, DISPLAY_ALERT, SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS, SETUP_USER_ERROR, TOGGLE_SIDEBAR, LOGOUT_USER,
    UPDATE_USER_BEGIN, UPDATE_USER_ERROR, UPDATE_USER_SUCCESS, HANDLE_CHANGE, 
    CLEAR_VALUES, CREATE_JOB_BEGIN, CREATE_JOB_SUCCESS, CREATE_JOB_ERROR, 
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTER,
    CHANGE_PAGE,
    DELETE_JOB_ERROR,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS
} from "./actions";

import axios from "axios"

export const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    userLocation: '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    company: '',
    position: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending','interview','declined'],
    status: 'pending',
    jobLocation: '',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
    stats: {},
    monthlyApplications: [],
    search:'',
    searchStatus:'all',
    searchType:'all',
    sorting:'latest',
    sortOptions:['latest','oldest','a-z','z-a']
}

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: "/api/v1"
    })

    // auth request
    authFetch.interceptors.request.use(
        (config)=>{
            return config
        },
        (error)=>{
            return Promise.reject(error)
        }
    )

    //auth response
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(error)
        }
    )

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    }

    const setupUser = async ({ currentUser, endPoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN })
        try {
            const { data } = await axios.post(
                `/api/v1/auth/${endPoint}`,
                currentUser)
            const { user, location } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: {
                    user, location, alertText
                }
            })
        }
        catch (err) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: err.response.data.msg }
            })
        }
        clearAlert();
    }

    const logoutUser = async () => {
        await authFetch.get('/auth/logout')
        dispatch({ type: LOGOUT_USER })
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser)
            const { user, location } = data
            dispatch({
                type: UPDATE_USER_SUCCESS, payload: {
                    user, location
                }
            })
        }
        catch (err) {
            if (err.response.status !== 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: err.response.data.msg }
                })
            }
        }
        clearAlert()
    }

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({ type: CLEAR_ALERT })
        }, 3000)
    }

    const handleChange = ({name, value}) => {
        dispatch({
            type: HANDLE_CHANGE,
            payload: {name, value},
        })
    }

    const clearValues = ()=>{
        dispatch({type:CLEAR_VALUES})
    }
    
    const createJob = async () => {
        dispatch({type: CREATE_JOB_BEGIN})
        try{
            const { position, company, jobLocation, jobType, status } = state

            await authFetch.post('/jobs/',{
                position,
                company,
                jobLocation, 
                jobType,
                status
            })
            dispatch({
                type: CREATE_JOB_SUCCESS,
            })

            dispatch({type:CLEAR_VALUES})
        } catch(error){
            if(error.response.status === 401) return
            dispatch({
                type: CREATE_JOB_ERROR,
                payload: {msg: error.response.data.msg}
            })
        }
        clearAlert();
    }

    const getJobs = async () => {
        const {searchStatus, searchType, sorting, search, page} = state
        let url= `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sorting}&page=${page}`
        if(search){
            url= url + "&search="+search
        }
        dispatch({type: GET_JOBS_BEGIN})
        try{
            const {data} = await authFetch.get(url)
            const {jobs, totalJobs, numOfPages} = data
            dispatch({
                type: GET_JOBS_SUCCESS,
                payload:{
                    jobs,
                    totalJobs,
                    numOfPages
                }
            })
        }
        catch(err){
            logoutUser()
        }
        clearAlert()
    }

    const setEditJob = (id)=>{
        dispatch({type: SET_EDIT_JOB,
        payload:{id}})
    }

    const editJob = async (id)=>{
        const {position, jobLocation, company, jobType, status} = state
        dispatch({type: EDIT_JOB_BEGIN})
        try{
            await authFetch.patch(`/jobs/${id}`,{
                position,
                jobLocation,
                company,
                jobType,
                status
            })
            dispatch({type: EDIT_JOB_SUCCESS})
            dispatch({type:CLEAR_VALUES})
        }
        catch(err){
            if(err.response.status === 401) return;
            dispatch({type:EDIT_JOB_ERROR,
            payload:{msg:err.response.data.msg}})
        }
        clearAlert()
    }

    const deleteJob = async (id)=>{
        dispatch({type:DELETE_JOB})
        try{
            await authFetch.delete(`/jobs/${id}`,)
            getJobs()
        }
        catch(err){
            if(err.response.status === 401) return;
            dispatch({type: DELETE_JOB_ERROR,
            payload:{msg:err.response.data.msg}})
        }
        clearAlert()
    }

    const showStats = async ()=>{
        dispatch({type: SHOW_STATS_BEGIN })
        try{
            const { data } = await authFetch('/jobs/stats')
            dispatch({type: SHOW_STATS_SUCCESS, 
            payload:{
                stats: data.defaultStats,
                monthlyApplications: data.monthlyApplications
            }})
        }
        catch(err){
            logoutUser()
        }
        clearAlert()
    }

    const clearFilters = ()=>{
        dispatch({type:CLEAR_FILTER});
    }

    const changePage = (page)=>{
        dispatch({type:CHANGE_PAGE,
        payload: {page}});
    }

    const getCurrentUser = async ()=>{
        dispatch({type: GET_CURRENT_USER_BEGIN})
        try{
            const {data} = await authFetch('/auth/getCurrentUser')
            const {user, location} = data
            dispatch({type: GET_CURRENT_USER_SUCCESS,payload:
            {user, location}})
        }
        catch(err){
            if(err.response.status === 401 ) return;
            logoutUser()
        }
    }

    useEffect(()=>{
        getCurrentUser()
    },[])
    
    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert,
            setupUser,
            toggleSidebar,
            logoutUser,
            updateUser,
            handleChange,
            clearValues,
            createJob,
            getJobs,
            setEditJob,
            deleteJob,
            editJob,
            showStats,
            clearFilters,
            changePage
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return (useContext(AppContext));
}