import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SET_FILTER } from '../store/reducers/gig.reducer'

const useOnSetFilter = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSetFilter = (filterBy) => {
    dispatch({ type: SET_FILTER, filterBy })

    let categoryParams
    let queryStringParams

    if (filterBy.categories !== '') {
      queryStringParams = `?categories=${filterBy.categories}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
      navigate(`/gig${queryStringParams}`)
    } else {
      categoryParams = filterBy.tags[0] || ''
      queryStringParams = `?categories=${categoryParams}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&daysToMake=${filterBy.daysToMake}`
      navigate(`/gig${queryStringParams}`)
    }
  }

  return onSetFilter
}

export default useOnSetFilter