import axios from "axios"
const baseUrl = "http://localhost:9672/transactions"

const getTransactions = () => {
	return axios.get(baseUrl)
}

const addTransaction = newObject => {
	return axios.post(baseUrl, newObject)
}

export default {
	getTransactions: getTransactions,
	addTransaction: addTransaction,
}
