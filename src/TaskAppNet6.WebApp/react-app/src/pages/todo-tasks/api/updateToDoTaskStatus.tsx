import {apiClient} from "../../../apiClient";
import {sleepPromise} from "../../../utils/promise";
import {AxiosResponse} from "axios";
import {ToDoTaskStatus} from "./types/taskStatus";

export const updateToDoTaskStatus = (id: number | string, status: ToDoTaskStatus): Promise<AxiosResponse<boolean>> => apiClient.put(`api/todotasks/${id}/status`, {status}).then(sleepPromise(1000));