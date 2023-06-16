import { useAppContext } from "../context/appContext"
import {HiChevronDoubleLeft, HiChevronDoubleRight} from "react-icons/hi"
import Wrapper from "../assets/wrappers/PageBtnContainer.js"

export const PageBtnContainer = () => {
    const {numOfPages, page, changePage} = useAppContext()

    const pages = Array.from({length: numOfPages}, (_,index)=>{
        return index+1;
    })

    const prevPage = () => {
        let newPage = page-1
        if(newPage<1){
            newPage = numOfPages
        }
        changePage(newPage)
    }

    const nextPage = () => {
        let newPage = page+1
        if(newPage > numOfPages){
            newPage = 1
        }
        changePage(newPage)
    }

  return (
    <Wrapper>
        <button className="prev-btn" onClick={prevPage}>
            <HiChevronDoubleLeft /> prev
        </button>
        <div className="btn-container">
        {pages.map((pageNumber)=>{
            return <button key={pageNumber} type="button" className={`pageBtn ${pageNumber === page && 'active'}`}
            onClick={()=>{changePage(pageNumber)}}>{pageNumber}</button>
        })}
        </div>
        <button className="next-btn" onClick={nextPage}>
            next<HiChevronDoubleRight />
        </button>
    </Wrapper>
  )
}