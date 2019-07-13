import React from "react"
import { FlexCol, FlexRow } from "@zopauk/react-components"
import styled from "styled-components"

const Strong = styled.strong`
	font-weight: 600;
`

const Row = styled(FlexRow)`
	margin: 78px 0 85px;
`

const FlexColRight = styled(FlexCol)`
	text-align: right;
`

const Svg = styled.svg`
	margin-top: -1rem;
`

const AccountComponent = ({ spent, balance, toLocalCurrency }) => (
	<Row>
		<FlexColRight xs={4}>
			<Strong>{toLocalCurrency(spent)}</Strong>
			<br />
			total sent
		</FlexColRight>
		<FlexCol xs={3}>
			<Svg width="4rem" height="4rem" viewBox="0 0 42 42">
				<circle cx="21" cy="21" r="15.91549430918954" fill="#fff" />
				<circle
					cx="21"
					cy="21"
					r="15.91549430918954"
					fill="transparent"
					stroke="#D8D8D8"
					strokeWidth="10"
				/>
				<circle
					cx="21"
					cy="21"
					r="15.91549430918954"
					fill="transparent"
					stroke="#FFB428"
					strokeWidth="10"
					strokeDasharray={`${parseInt(
						100 - (spent / (spent + balance)) * 100,
					)} ${parseInt((spent / (spent + balance)) * 100)}`}
					strokeDashoffset="25"
				/>
			</Svg>
		</FlexCol>
		<FlexCol xs={4}>
			<Strong>{toLocalCurrency(balance)}</Strong>
			<br />
			left available
		</FlexCol>
	</Row>
)

export default AccountComponent
