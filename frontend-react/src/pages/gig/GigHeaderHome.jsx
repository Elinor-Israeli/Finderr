import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// import { GigSort } from '../../cmps/gig/GigSort'

import { GigList } from '../../cmps/gig/GigList'
import { TopFilterBar } from '../../cmps/gig/listfilterBar'
// import { SortBy } from '../../cmps/gig/SortBy'
import { loadGigs } from '../../store/actions/gig.actions' 
import { SET_FILTER, SET_SORT  } from '../../store/reducers/gig.reducer' 

export function GigHeaderHome() {

}