import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData";
import {useQuery} from "@tanstack/react-query"

const API_URL="http://localhost:8080"

const fetchData=async (): AxiosPromise<FoodData[]>=>{
    const response =  axios.get(API_URL+"/food")
    //a promise que a  resposta dessa requisição seja uma lista de coisas que tenham o formato FoodData. (o interface)

    return response; 
}

export function useFoodData(){
    const query=useQuery({
        queryFn: fetchData,
        queryKey: ["food-data"],
        retry: 2
    });

    return {
        ...query,
         data: query.data?.data
    }
}

//função que faz uma requisição dos Food (Foods que vem da API)

//query?