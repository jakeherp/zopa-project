import axios from "axios"
const baseUrl = "http://localhost:8080/transactions"

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
