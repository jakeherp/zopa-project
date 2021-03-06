import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled, { createGlobalStyle } from "styled-components"
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

import transactionsService from "./services/transactions"
import balanceService from "./services/balance"

import Account from "./components/Account"
import Alert from "./components/Alert"
import Form from "./components/Form"
import Transaction from "./components/Transaction"

const MobileStyles = createGlobalStyle`
	body {
		@media screen and (max-width: 767px) {
			margin: 0 3%;
		}
	}
`

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
		margin: 0;
		padding: 1rem 0;
		width: 50%;
		&:not(:last-of-type) {
			border-bottom: 1px solid #d8d8d8;
		}
		small {
			line-height: 2.5;
		}
	}

	dd {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: right;
	}

	small {
		display: block;
	}
`

const Container = styled(FlexContainer)`
	@media screen and (min-width: 768px) {
		background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxIDEiPjx0aXRsZT5waXhlbDwvdGl0bGU+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgc3R5bGU9ImZpbGw6I2U5ZWFmNCIvPjwvc3ZnPg==)
			repeat-y center;
		background-size: 1px;
		margin-top: 3rem;
	}
`

const App = () => {
	const [nameInput, setNameInput] = useState({ value: "", error: false })
	const [emailInput, setEmailInput] = useState({ value: "", error: false })
	const [amountInput, setAmountInput] = useState({ value: 0, error: false })
	const [moneySent, setMoneySent] = useState(false)

	const [balance, setBalance] = useState(0)
	const [transactions, setTransactions] = useState([])

	useEffect(() => {
		transactionsService.getTransactions().then(res => {
			setTransactions(res.data)
		})
		balanceService.getBalance().then(res => {
			setBalance(res.data[0].balance)
		})
	}, [])

	const validateEmail = email => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

	const handleNameChange = e =>
		setNameInput({ ...nameInput, value: e.target.value })
	const handleEmailChange = e =>
		setEmailInput({ ...nameInput, value: e.target.value })
	const handleAmountChange = e =>
		setAmountInput({ ...nameInput, value: e.target.value })

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

			transactionsService
				.addTransaction({
					id: transactions.length,
					name: nameInput.value,
					email: emailInput.value,
					amount: parseFloat(amountInput.value),
				})
				.then(() => {
					setTransactions(transactions.concat(transactionsObject))
					balanceService
						.updateBalance({
							id: 0,
							balance: leftAvailable,
						})
						.then(() => {
							setBalance(leftAvailable)
							setMoneySent(true)
							resetForm()
						})
				})
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
			<MobileStyles />
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
