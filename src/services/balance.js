import axios from "axios"
const baseUrl = "http://localhost:8080/balance"

const getBalance = () => {
	return axios.get(baseUrl)
}

const updateBalance = newObject => {
	return axios.put(`${baseUrl}/0`, newObject)
}

export default {
	getBalance: getBalance,
	updateBalance: updateBalance,
}
