import axios, { AxiosRequestConfig } from "axios";
import { useSetAtom } from "jotai";
import { transactionsAtom } from "../store";

const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjBkZjg0NmI3LWM4ZGYtNDg5YS05ZjY5LTljMzQ2NmM1ZmUxZCIsIm9yZ0lkIjoiMzg4NDUzIiwidXNlcklkIjoiMzk5MTU3IiwidHlwZUlkIjoiNTRmOWMzOWUtODZiNi00ZGFlLTgyM2EtYzE3OTAyM2JjZmMwIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTM0MTEwMjgsImV4cCI6NDg2OTE3MTAyOH0.BHyMfNcdDssWNUnqn5GOyqBoz_yi1IJpoXvJtaLcGT4";


const headers = {
    'accept': 'application/json',
    'X-API-Key': apiKey
}

const config: AxiosRequestConfig = {
    headers: headers,
}

const useWalletAPI = () => {

    const setTransactions = useSetAtom(transactionsAtom);

    const getTransactions = async (address: string) => {
        try {
            const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?limit=10`, config)

            console.log(response);
            setTransactions(response.data.result);

        } catch (e) {
            console.error(e);
        }
    }

    return { getTransactions }
}

export default useWalletAPI;