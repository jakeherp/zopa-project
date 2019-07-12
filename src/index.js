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
	}

	dd {
		text-align: right;
	}

	small {
		display: block;
	}
`

const App = () => {
	const [nameInput, setNameInput] = useState({ value: "", error: false })
	const [emailInput, setEmailInput] = useState({ value: "", error: false })
	const [amountInput, setAmountInput] = useState({
		value: null,
		error: false,
	})
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

	const handleNameChange = evt =>
		setNameInput({ ...nameInput, value: evt.target.value })
	const handleEmailChange = evt =>
		setEmailInput({ ...nameInput, value: evt.target.value })
	const handleAmountChange = evt =>
		setAmountInput({ ...nameInput, value: evt.target.value })

	const handleSubmit = e => {
		e.preventDefault()

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
		setTimeout(() => setMoneySent(false), 5000)
		resetForm()
		console.log(transactions, balance)
	}

	const resetForm = () => {
		setNameInput("")
		setEmailInput("")
		setAmountInput("")
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
			<FlexContainer gutter={0}>
				{moneySent && (
					<Alert type="verified">The money has been sent</Alert>
				)}
				<FlexRow justify="space-around">
					<FlexCol xs={12} m={5} l={4}>
						<H2>Send money</H2>
						<Form
							handleNameChange={e => handleNameChange(e)}
							handleEmailChange={e => handleEmailChange(e)}
							handleAmountChange={e => handleAmountChange(e)}
							handleSubmit={e => handleSubmit(e)}
							nameInput={nameInput.value}
							emailInput={emailInput.value}
							amountInput={amountInput.value}
						/>
					</FlexCol>
					<FlexCol xs={12} m={5} l={4}>
						<H2>My account</H2>
						<FlexContainer gutter={0}>
							<Account
								spent={toLocalCurrency(totalSpent)}
								balance={toLocalCurrency(balance)}
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
			</FlexContainer>
		</React.Fragment>
	)
}

export default App

ReactDOM.render(<App />, document.getElementById("root"))
