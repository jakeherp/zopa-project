import React, { useState } from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import {
	Button,
	colors,
	FlexCol,
	FlexContainer,
	FlexRow,
	Fonts,
	GlobalStyles,
	Header2,
	Header3,
	SidekickCard,
	TextField,
} from "@zopauk/react-components"

const H2 = styled(Header2)`
	color: ${colors.neutral.neutral900};
`

const Strong = styled.strong`
	font-weight: 600;
`

const Transactions = styled.dl`
	display: flex;
	flex-wrap: wrap;

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

const Form = styled.form`
	min-height: 500px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`

const App = () => {
	const [nameInput, setNameInput] = useState("")
	const [emailInput, setEmailInput] = useState("")
	const [amountInput, setAmountInput] = useState("£")

	const [balance, setBalance] = useState(13500)
	const [transactions, setTransactions] = useState([
		{
			id: 1,
			name: `Natalia`,
			email: `natalia@zopa.com`,
			amount: 1500.0,
		},
		{
			id: 2,
			name: `Thomas`,
			email: `thomas@zopa.com`,
			amount: 1000.0,
		},
		{
			id: 3,
			name: `Martin`,
			email: `martin@zopa.com`,
			amount: 2000.0,
		},
	])

	const handleNameChange = evt => setNameInput(evt.target.value)
	const handleEmailChange = evt => setEmailInput(evt.target.value)
	const handleAmountChange = evt => setAmountInput(evt.target.value)
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
				<FlexRow>
					<FlexCol xs={12}>
						<SidekickCard type="verified">
							<h2>The money has been sent</h2>
						</SidekickCard>
					</FlexCol>
				</FlexRow>
				<FlexRow justify="space-around">
					<FlexCol xs={12} m={5} l={4}>
						<H2>Send money</H2>
						<Form>
							<TextField
								errorMessage="Please enter a valid name"
								inputProps={{ name: "name" }}
								label="Name"
								value={nameInput}
								onChange={evt => handleNameChange(evt)}
							/>
							<TextField
								inputProps={{ name: "email" }}
								label="Email address"
								value={emailInput}
								onChange={evt => handleEmailChange(evt)}
							/>
							<TextField
								inputProps={{ name: "amount" }}
								label="Amount"
								value={amountInput}
								onChange={evt => handleAmountChange(evt)}
							/>
							<Button styling="primary" fullWidth={true}>
								Send
							</Button>
						</Form>
					</FlexCol>
					<FlexCol xs={12} m={5} l={4}>
						<H2>My account</H2>
						<FlexContainer gutter={0}>
							<FlexRow>
								<FlexCol xs={5}>
									<Strong>
										{toLocalCurrency(totalSpent)}
									</Strong>
									<br />
									total sent
								</FlexCol>
								<FlexCol xs={2}>XXX</FlexCol>
								<FlexCol xs={5}>
									<Strong>{toLocalCurrency(balance)}</Strong>
									<br />
									left available
								</FlexCol>
							</FlexRow>
						</FlexContainer>
						<Header3>Transactions</Header3>
						<Transactions>
							{transactions.map(transaction => (
								<React.Fragment key={transaction.id}>
									<dt>
										{transaction.name}
										<small>{transaction.email}</small>
									</dt>
									<dd>
										{toLocalCurrency(transaction.amount)}
									</dd>
								</React.Fragment>
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
