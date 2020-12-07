import React, { Component } from 'react'

export default class InputForm extends Component {
	state = {
		ID: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		showButtom: false
	}

	checkEmpty = () => {
		console.log('showButtom 0', this.state.showButtom);
		if (this.state.ID === '' || this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.phone === '') {
			console.log('showButtom 1', this.state.showButtom);
			return this.setState({ showButtom: false })
		}

		console.log('showButtom 2', this.state.showButtom);
		return this.setState({ showButtom: true })
	}

	numberHandler = (event) => {
		const { value } = event.target
		const newVal = value.replace(/[^\d]/, '')
		this.setState({ phone: newVal }, this.checkEmpty)
		/* this.checkEmpty() */
		console.log('showButtom 3', this.state.showButtom);
	}

	handlerChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value }, this.checkEmpty)
		/* this.checkEmpty() */
		console.log('showButtom 4', this.state.showButtom);
	}

	render() {
		const { showForm } = this.props
		return (
			<form>
				<label>
					<p>ID</p>
					<input
						type="text"
						value={this.state.ID}
						name="ID"
						onChange={this.handlerChange}
					/>
				</label>
				<label>
					<p>First Name</p>
					<input
						type="text"
						value={this.state.firstName}
						name="firstName"
						onChange={this.handlerChange}
					/>
				</label>
				<label>
					<p>Last Name</p>
					<input
						type="text"
						value={this.state.lastName}
						name="lastName"
						onChange={this.handlerChange}
					/>
				</label>
				<label>
					<p>Email</p>
					<input
						type="text"
						value={this.state.email}
						name="email"
						onChange={this.handlerChange}
					/>
				</label>
				<label>
					<p>Phone</p>
					<input
						type="text"
						value={this.state.phone}
						name="phone"
						onChange={this.numberHandler}
					/>
				</label>
				{
					this.state.showButtom && (
						<div>
							<button onClick={() => showForm(false)}>Добавить</button>
						</div>
					)

				}
			</form>
		)

	}
}