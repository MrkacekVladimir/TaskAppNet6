import {apiClient} from "../../../apiClient";
import {AxiosResponse} from "axios";
import {sleepPromise} from "../../../utils/promise";
import {ToDoTaskStatus} from "./types/taskStatus";

export interface ToDoTaskDetailData {
    id: number;
    name: string;
    description: string;
    priority: number;
    status: ToDoTaskStatus;
    createdOn: Date;
    lastModifiedOn: Date | null;
}

export const ToDoTaskDetailInitialData: ToDoTaskDetailData = {
    id: 0,
    name: "",
    description: "",
    priority: 1,
    status: 1,
    createdOn: new Date(),
    lastModifiedOn: null
}

export const fetchDetailToDoTask = (id: number | string): Promise<AxiosResponse<ToDoTaskDetailData>> => apiClient.get(`api/todotasks/${id}`).then(sleepPromise(1000));