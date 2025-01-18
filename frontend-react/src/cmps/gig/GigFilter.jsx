import { gigService } from "../../services/gig/gig.service.remote" 
import { useState } from "react"


export function GigFilter({ onSetFilter }) {
    const [FilterByEdit, setFilterByEdit] = useState(gigService.getDefaultFilter)
    
  
    function handleTypeChange(ev) {
      const { value } = ev.target
      setFilterByEdit((prevFilter) => {
        return { ...prevFilter, txt: value }
      })
      console.log(FilterByEdit)
    }
  
    function onSubmitFilter(ev) {
      ev.preventDefault()
      onSetFilter(FilterByEdit)
    }
  
    function onChangeType({ target }) {
      // console.log(FilterByEdit)
      onSetFilter({ ...FilterByEdit, noteType: target.value })
    }
  
  
    return (
    <section className="gig-filter">
      <form className="text-filter-form" onSubmit={onSubmitFilter}>
        <div>
        <input className="input-filter" type="text" id="txt"
          name="txt"
          placeholder="What service are you looking for today? "
          
          onChange={handleTypeChange}
          value={FilterByEdit.txt} />
          <button class="btn-filter"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffffff" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></button>
                        </div>
      </form>
  
      {/* <select onChange={onChangeType}>
        <option value=''>All</option>
        <option value='note-txt'>Text</option>
        <option value='note-img'>Image</option>
        <option value='note-vid'>Video</option>
        <option value='note-todos'> Todos</option>
      </select> */}
    </section>
    )
  }