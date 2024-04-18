import axios, { AxiosRequestConfig } from "axios";
import { useAtom } from "jotai";
import { transactionsAtom } from "../store";
import { MORALIS_API_KEY } from "../config";

const headers = {
    'accept': 'application/json',
    'X-API-Key': MORALIS_API_KEY
}

const config: AxiosRequestConfig = {
    headers: headers,
}

const useWalletAPI = () => {

    const [transactions, setTransactions] = useAtom(transactionsAtom);

    const getTransactions = async (address: string) => {
        try {
            const response = await axios.get(`https://deep-index.moralis.io/api/v2.2/wallets/${address}/history?limit=1000`, config)

            console.log(response);
            setTransactions(response.data.result);
        } catch (e) {
            console.error(e);
        }
    }

    return { getTransactions }
}

export default useWalletAPI;