import React, { Component } from 'react'

class Pagination extends Component {

	getElements = (pageCount) => {
		const listElements = []
		const {onClick} = this.props
	
		for (let i = 1; i <= pageCount; i++) {
			listElements.push(<li onClick={() => onClick(i)} key={i}>{i}</li>)
		}

		return listElements;
	}

	render() {

		const {pageCount} = this.props



		return (
			<ul>
				{this.getElements(pageCount)}
			</ul>
		)
	}
}

export default Pagination