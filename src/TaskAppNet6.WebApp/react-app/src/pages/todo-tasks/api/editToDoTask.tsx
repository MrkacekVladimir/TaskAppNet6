import {apiClient} from "../../../apiClient";
import {sleepPromise} from "../../../utils/promise";
import {AxiosResponse} from "axios";

export interface EditToDoTask{
    name: string;
    description: string;
    priority: string;
}

export const editToDoTask = (id: number | string, data: EditToDoTask): Promise<AxiosResponse<boolean>> => apiClient.put(`api/todotasks/${id}`, data).then(sleepPromise(1000));