import React from "react"
import styled from "styled-components"
import {
	Button,
	ErrorMessage,
	InputLabel,
	InputText,
} from "@zopauk/react-components"

const Form = styled.form`
	min-height: 500px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`

const Amount = styled.div`
	position: relative;

	input {
		padding-left: 2rem;
	}
`

const Currency = styled.span`
	position: absolute;
	left: 1rem;
	top: 50%;
	transform: translateY(-50%);
	font-size: 1.5rem;
`

const FormComponent = ({
	handlers: {
		handleNameChange,
		handleEmailChange,
		handleAmountChange,
		handleSubmit,
	},
	values: { nameInput, emailInput, amountInput },
}) => (
	<Form onSubmit={handleSubmit}>
		<div>
			<InputLabel>Name</InputLabel>
			<InputText value={nameInput.value} onChange={handleNameChange} />
			{nameInput.error && (
				<ErrorMessage>Please enter a valid name</ErrorMessage>
			)}
		</div>
		<div>
			<InputLabel>Email address</InputLabel>
			<InputText value={emailInput.value} onChange={handleEmailChange} />
			{emailInput.error && (
				<ErrorMessage>Please enter a valid email address</ErrorMessage>
			)}
		</div>
		<div>
			<InputLabel>Amount</InputLabel>
			<Amount>
				<InputText
					type="number"
					value={amountInput.value > 0 && amountInput.value}
					onChange={handleAmountChange}
				/>
				<Currency>&pound;</Currency>
			</Amount>
			{amountInput.error && (
				<ErrorMessage>Please enter a valid amount</ErrorMessage>
			)}
		</div>
		<Button styling="primary" fullWidth={true}>
			Send
		</Button>
	</Form>
)

export default FormComponent
