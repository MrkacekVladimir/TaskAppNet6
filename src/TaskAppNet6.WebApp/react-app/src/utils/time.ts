import dayjs from "dayjs";

export const formatDate = (date: Date) => dayjs(date).format("DD.MM.YYYY");
export const formatDateTime = (date: Date) => dayjs(date).format( "HH:mm:ss DD.MM.YYYY");