import React, { Component } from 'react'
/* import ReactPaginate from 'react-paginate' */
import Loader from './Loader/Loader'
import Table from './Table/Table'
import DetailRowView from './DetailRowView/DetailRowView'
import ModeSelector from './ModeSelector/ModeSelector'
import TableSearch from './TableSearch/TableSearch'
import Pagination from './Pagination/Pagination'
import _ from 'lodash'

export default class App extends Component {

	state = {
		isModeSelected: false,
		isLoading: false,
		data: [],
		search: '',
		sort: 'asc',  // 'desc'
		sortField: 'id', // поле по умолчанию
		row: null,
		currentPage: 0
	}

	/* async componentDidMount() { */
	/* const response = await fetch(`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`) */
	/* const data = await response.json() */
	/* console.log(data) */
	/* this.setState({ */
	/* 	isLoading: false, */
	/* data: _.orderBy(data, this.state.sortField, this.state.sort) */
	/* }) */
	/* 	} */

	async fetchData(url) {
		const response = await fetch(url)
		const data = await response.json()
		console.log(data.filter(item => item.id === 0))
		this.setState({
			isLoading: false,
			data: _.orderBy(data, this.state.sortField, this.state.sort)
		})
	}


	onSort = sortField => {

		const cloneData = this.state.data.concat()
		/* sortType */
		const sort = this.state.sort === 'asc' ? 'desc' : 'asc'
		/* orderedData */
		const data = _.orderBy(cloneData, sortField, sort)

		this.setState({data, sort, sortField})
			/* data: orderedData,
			sort: sortType,
			sortField */
		
		/* console.log(sortField) */
	}

	modeSelectHandler = url => {
		/* console.log(url) */
		this.setState({
			isModeSelected: true,
			isLoading: true,
		})
		this.fetchData(url)
	}

	onRowSelect = row => (
		this.setState({ row })
	)

	/* pageChangeHandler = ({selected}) => (
		this.setState({currentPage: selected})
	) */

	searchHandler = search => {
		this.setState({search, currentPage: 0})
	}

	getFilteredData() {
		const {data, search} = this.state

		if (!search) {
			return data
		}

		return data.filter(item => {
			return item['firstName'].toLowerCase().includes(search.toLowerCase())
				|| item['lastName'].toLowerCase().includes(search.toLowerCase())
				|| item['email'].toLowerCase().includes(search.toLowerCase())
		})
	}

	getPageData(currentPage, pageSize) {
		const startElement = currentPage * pageSize
		const endElement = startElement + pageSize

		const {data} = this.state
		
		return data.slice(startElement, endElement)
	}

	paginationHandler = (currentPage) => {

		/* currentPage => currentPage: currentPage (внизу) */
		this.setState({currentPage})
	}


	render() {
		const pageSize = 50
		const {currentPage, data} = this.state
		if (!this.state.isModeSelected) {
			return (
				<div className="container">
					<ModeSelector onSelect={this.modeSelectHandler} />
				</div>
			)
		}

		/* const displayData = _.chunk(this.state.data, pageSize)[this.state.currentPage] */
		const filteredData = this.getFilteredData()

		const displayData = this.getPageData(currentPage, pageSize)
		console.log('display', displayData.length, data);

		const pageCount = Math.ceil(data.length / pageSize)



		return (
			<div>
				{
					this.state.isLoading
						? <Loader />
						: <React.Fragment>
							<TableSearch onSearch={this.searchHandler} />
							<Table
							/* data={this.state.data} */
							data={displayData}
							/* data={this.getPageData(currentPage, pageSize)} */
							onSort={this.onSort}
							sort={this.state.sort}
							sortField={this.state.sortField}
							onRowSelect={this.onRowSelect}
							/>
						</React.Fragment>
				}

				{
					this.state.data.length > pageSize
					? <Pagination onClick={this.paginationHandler} pageCount={pageCount} /> : null
				}

				{/* {
					this.state.data.length > pageSize
					? <ReactPaginate
						previousLabel={'<'}
						nextLabel={'>'}
						breakLabel={'...'}
						breakClassName={'break-me'}
						pageCount={20}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						onPageChange={this.pageChangeHandler}
						containerClassName={'pagination'}
						activeClassName={'active'}
						pageClassName="page-item"
						pageLinkClassName="page-link"
						previousClassName="page-item"
						nextClassName="page-item"
						previousLinkClassName="page-link"
						nextLinkClassName="page-link"
						forcePage={this.state.currentPage}
					/> : null
				} */}

				{
					this.state.row ? <DetailRowView person={this.state.row} /> : null
				}
			</div>
		)
	}
}
