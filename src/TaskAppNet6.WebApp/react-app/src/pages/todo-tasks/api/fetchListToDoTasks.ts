import {AxiosResponse} from "axios";
import {apiClient} from "../../../apiClient";
import {sleepPromise} from "../../../utils/promise";
import {ToDoTaskStatus} from "./types/taskStatus";

export interface ListToDoTasksItem {
    id: number;
    name: string;
    description: string;
    priority: string;
    status: ToDoTaskStatus;
    createdOn: Date;
}

export interface ListToDoTasksResponse {
    totalCount: number;
    items: Array<ListToDoTasksItem>
}

export const fetchListToDoTasks = (pageNumber: number, pageSize: number): Promise<AxiosResponse<ListToDoTasksResponse>> =>
    apiClient.get<ListToDoTasksResponse>(`api/todotasks?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .then(sleepPromise(1000));