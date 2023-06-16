import {FormRow, FormSelect} from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState, useMemo } from 'react'

export const SearchContainer = () => {

const [localSearch, setLocalSearch] = useState('');

  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sorting,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    handleChange,
    clearFilters
  } = useAppContext()

  const handleSearch = (e)=>{
    if(isLoading) return
    handleChange({name:e.target.name, value:e.target.value});
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setLocalSearch('')
    clearFilters()
  }

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch( e.target.value )
      clearTimeout(timeoutID)
      timeoutID = setTimeout(()=>{
        handleChange({name:e.target.name , value: e.target.value })
      },1000) 
    }
  }

  const optimizedDebounce = useMemo(()=>debounce(),[])

  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
            <FormRow
            type='text' name='search' value={localSearch}
            handleChange={optimizedDebounce} />

            <FormSelect name="searchStatus" value={searchStatus} labelText="Status"
            handleChange={handleSearch} list={['all',...statusOptions]} />

            <FormSelect name="searchType" value={searchType} labelText="Job Type"
            handleChange={handleSearch} list={['all',...jobTypeOptions]} />

            <FormSelect name="sorting" value={sorting} labelText="sort"
            handleChange={handleSearch} list={sortOptions} />

            <button className='btn btn-block btn-danger' disabled={isLoading} onClick={handleSubmit}>
              clear filters
            </button>

        </div>
      </form>
    </Wrapper>
  )
}