import React, { Component } from 'react'

export default class InputForm extends Component {
	state = {
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		showButtom: false
	}

	checkEmpty = () => {
		if (this.state.id === '' || this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.phone === '') {
			return this.setState({ showButtom: false })
		}

		return this.setState({ showButtom: true })
	}

	numberHandler = (event) => {
		const { value } = event.target
		const newVal = value.replace(/[^\d]/, '')
		this.setState({ phone: newVal }, this.checkEmpty)
	}

	handlerChange = (event) => {
		const { name, value } = event.target
		this.setState({ [name]: value }, this.checkEmpty)
	}



	render() {
		const { showForm, onSubmit } = this.props
		return (
			<form>
				<label>
					<p>ID</p>
					<input
						type="text"
						value={this.state.id}
						name="id"
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
							<button onClick={
								(e) => {
									e.preventDefault();
									onSubmit({id: this.state.id, firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, phone: this.state.phone})
								}}
							>
								Добавить
							</button>
						</div>
					)
				}
			</form>
		)

	}
}