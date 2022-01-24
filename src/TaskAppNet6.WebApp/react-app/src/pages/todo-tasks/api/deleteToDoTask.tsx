import {apiClient} from "../../../apiClient";
import {sleepPromise} from "../../../utils/promise";

export const deleteToDoTask = (id: number | string) => apiClient.delete(`api/todotasks/${id}`).then(sleepPromise(2000));