import React from "react"
import { SidekickCard, FlexCol, FlexRow } from "@zopauk/react-components"

const AlertComponent = ({ children, type }) => (
	<FlexRow>
		<FlexCol xs={12}>
			<SidekickCard type={type}>
				<h2>{children}</h2>
			</SidekickCard>
		</FlexCol>
	</FlexRow>
)

export default AlertComponent
