import React from "react"
import styled from "styled-components"
import { Button, InputText, InputLabel } from "@zopauk/react-components"

const Form = styled.form`
	min-height: 500px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`

const FormComponent = ({
	handleNameChange,
	handleEmailChange,
	handleAmountChange,
	handleSubmit,
	nameInput,
	emailInput,
	amountInput,
}) => (
	<Form onSubmit={handleSubmit}>
		<div>
			<InputLabel>Name</InputLabel>
			<InputText
				value={nameInput}
				onChange={handleNameChange}
				errorMessage="Please enter a valid name"
			/>
		</div>
		<div>
			<InputLabel>Email address</InputLabel>
			<InputText
				value={emailInput}
				onChange={handleEmailChange}
				errorMessage="Please enter a valid email address"
			/>
		</div>
		<div>
			<InputLabel>Amount</InputLabel>
			<InputText
				value={amountInput}
				onChange={handleAmountChange}
				errorMessage="Please enter a valid amount"
			/>
		</div>
		<Button styling="primary" fullWidth={true}>
			Send
		</Button>
	</Form>
)

export default FormComponent
