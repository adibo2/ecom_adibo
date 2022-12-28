import React from 'react'
import css from "./Search.module.scss"
import {BsFileEarmarkArrowDownFill } from 'react-icons/bs'
import {BsSearch} from 'react-icons/bs'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
const Search = () => {
  return (
   
   <>
   		<div class={`${css["search_wrap"] }  ${css["search_wrap_6"]}`}>
			<div className={css.search_box}>
				<input type="text" className={css.input} placeholder="search..." />
				<div className={css.btn}>
					<p className={css.p}>Search</p>
				</div>
			</div>
		</div>
   
  
   </>
  )
}

export default Search