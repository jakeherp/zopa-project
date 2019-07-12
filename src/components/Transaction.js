import React from "react"

const TransactionComponent = ({ name, email, amount }) => (
	<React.Fragment>
		<dt>
			{name}
			<small>{email}</small>
		</dt>
		<dd>{amount}</dd>
	</React.Fragment>
)

export default TransactionComponent
