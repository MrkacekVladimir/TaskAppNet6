import {apiClient} from "../../../apiClient";
import {sleepPromise} from "../../../utils/promise";
import {AxiosResponse} from "axios";
import {ToDoTaskStatus} from "./types/taskStatus";

export interface CreateToDoTaskData{
    name: string;
    description: string;
    priority: string;
    status: ToDoTaskStatus;
}

export const createToDoTask = (data: CreateToDoTaskData): Promise<AxiosResponse<number>> => apiClient.post(`api/todotasks`, data).then(sleepPromise(2000));