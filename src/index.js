import React, { useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import {
	colors,
	FlexCol,
	FlexContainer,
	FlexRow,
	Fonts,
	GlobalStyles,
	Header2,
	Header3,
} from "@zopauk/react-components"

import Alert from "./components/Alert"
import Form from "./components/Form"
import Account from "./components/Account"
import Transaction from "./components/Transaction"

const H2 = styled(Header2)`
	color: ${colors.neutral.neutral900};
`

const Transactions = styled.dl`
	display: flex;
	flex-wrap: wrap;
	max-height: 300px;
	overflow: scroll;

	dd,
	dt {
		width: 50%;
		margin: 0;
		padding: 1rem 0;
		&:not(:last-of-type) {
			border-bottom: 1px solid #d8d8d8;
		}
		small {
			line-height: 2.5;
		}
	}

	dd {
		text-align: right;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	small {
		display: block;
	}
`

const Container = styled(FlexContainer)`
	background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjx0aXRsZT5waXhlbDwvdGl0bGU+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgc3R5bGU9ImZpbGw6I2U5ZWFmNCIvPjwvc3ZnPg==)
		repeat-y center;
	background-size: 1px;
	margin-top: 3rem;
`

const App = () => {
	const [nameInput, setNameInput] = useState({ value: "", error: false })
	const [emailInput, setEmailInput] = useState({ value: "", error: false })
	const [amountInput, setAmountInput] = useState({ value: 0, error: false })
	const [moneySent, setMoneySent] = useState(false)

	const [balance, setBalance] = useState(13500)
	const [transactions, setTransactions] = useState([
		{
			id: 0,
			name: `Martin`,
			email: `martin@zopa.com`,
			amount: 1500.0,
		},
		{
			id: 1,
			name: `Thomas`,
			email: `thomas@zopa.com`,
			amount: 1000.0,
		},
		{
			id: 2,
			name: `Natalia`,
			email: `natalia@zopa.com`,
			amount: 2000.0,
		},
	])

	const validateEmail = email => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

	const handleNameChange = evt =>
		setNameInput({ ...nameInput, value: evt.target.value })
	const handleEmailChange = evt =>
		setEmailInput({ ...nameInput, value: evt.target.value })
	const handleAmountChange = evt =>
		setAmountInput({ ...nameInput, value: evt.target.value })

	const handleSubmit = e => {
		e.preventDefault()

		if (!nameInput.value) {
			setNameInput({ ...nameInput, error: true })
		} else if (!validateEmail(emailInput.value)) {
			setEmailInput({ ...emailInput, error: true })
		} else if (amountInput.value <= 0 || amountInput.value > balance) {
			setAmountInput({ ...amountInput, error: true })
		} else {
			const transactionsObject = {
				id: transactions.length,
				name: nameInput.value,
				email: emailInput.value,
				amount: parseFloat(amountInput.value),
			}

			const leftAvailable = balance - parseFloat(amountInput.value)

			setTransactions(transactions.concat(transactionsObject))
			setBalance(leftAvailable)
			setMoneySent(true)
			resetForm()
		}
	}

	const resetForm = () => {
		setNameInput({ value: "", error: false })
		setEmailInput({ value: "", error: false })
		setAmountInput({ value: 0, error: false })
	}

	const toLocalCurrency = (num, country = "en-GB", currency = "GBP") => {
		return new Intl.NumberFormat(country, {
			style: "currency",
			currency: currency,
		}).format(num)
	}

	const totalSpent = transactions.reduce((acc, curr) => acc + curr.amount, 0)

	return (
		<React.Fragment>
			<GlobalStyles />
			<Fonts />
			<Container gutter={0}>
				{moneySent && (
					<Alert type="verified">The money has been sent</Alert>
				)}
				<FlexRow justify="space-around">
					<FlexCol xs={12} m={5} l={4}>
						<H2>Send money</H2>
						<Form
							handlers={{
								handleNameChange,
								handleEmailChange,
								handleAmountChange,
								handleSubmit,
							}}
							values={{
								nameInput,
								emailInput,
								amountInput,
							}}
						/>
					</FlexCol>
					<FlexCol xs={12} m={5} l={4}>
						<H2>My account</H2>
						<FlexContainer gutter={0}>
							<Account
								spent={totalSpent}
								balance={balance}
								toLocalCurrency={num => toLocalCurrency(num)}
							/>
						</FlexContainer>
						<Header3>Transactions</Header3>
						<Transactions>
							{transactions
								.slice(0)
								.reverse()
								.map(transaction => (
									<Transaction
										key={transaction.id}
										name={transaction.name}
										email={transaction.email}
										amount={toLocalCurrency(
											transaction.amount,
										)}
									/>
								))}
						</Transactions>
					</FlexCol>
				</FlexRow>
			</Container>
		</React.Fragment>
	)
}

export default App

ReactDOM.render(<App />, document.getElementById("root"))
