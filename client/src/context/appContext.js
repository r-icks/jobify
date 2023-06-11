import { useReducer, useContext } from "react";
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
    EDIT_JOB_ERROR
} from "./actions";

import axios from "axios"

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')
const userLocation = localStorage.getItem('location')

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token,
    userLocation: userLocation || '',
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    company: '',
    position: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['pending','interview','declined'],
    status: 'pending',
    jobLocation: userLocation || '',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    page: 1,
}

const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
}

const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
}

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const authFetch = axios.create({
        baseURL: "/api/v1"
    })


    // auth request
    authFetch.interceptors.request.use(  //could refer axios documentation
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    )

    //auth response
    authFetch.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            // console.log(error.response)
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
            const { user, token, location } = data
            dispatch({
                type: SETUP_USER_SUCCESS,
                payload: {
                    user, token, location, alertText
                }
            })
            addUserToLocalStorage({ user, token, location });
        }
        catch (err) {
            dispatch({
                type: SETUP_USER_ERROR,
                payload: { msg: err.response.data.msg }
            })
        }
        clearAlert();
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER })
        removeUserFromLocalStorage();
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN })
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser)
            const { user, location, token } = data
            dispatch({
                type: UPDATE_USER_SUCCESS, payload: {
                    user, location, token
                }
            })
            addUserToLocalStorage({ user, location, token })
            console.log(data)
        }
        catch (err) {
            if (err.response.status != 401) {
                dispatch({
                    type: UPDATE_USER_ERROR,
                    payload: { msg: err.response.data.msg }
                })
            }
            // console.log(err)
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
        let url= '/jobs'

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
            console.log(err.response)
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
            console.log(err)
            logoutUser()
        }
    }
    
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
            editJob
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return (useContext(AppContext));
}