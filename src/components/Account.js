import React from "react"
import { FlexCol, FlexRow } from "@zopauk/react-components"
import styled from "styled-components"

const Strong = styled.strong`
	font-weight: 600;
`

const AccountComponent = ({ spent, balance }) => (
	<FlexRow>
		<FlexCol xs={5}>
			<Strong>{spent}</Strong>
			<br />
			total sent
		</FlexCol>
		<FlexCol xs={2}>XXX</FlexCol>
		<FlexCol xs={5}>
			<Strong>{balance}</Strong>
			<br />
			left available
		</FlexCol>
	</FlexRow>
)

export default AccountComponent
