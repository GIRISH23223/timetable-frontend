import { mockStorage } from "@/utils/mockStorage";

const KEY = "timeslots";

export const getTimeslots = async () => {
    return mockStorage.getItems<any>(KEY);
};

export const createTimeslot = async (data: any) => {
    return mockStorage.createItem(KEY, data);
};

export const updateTimeslot = async (id: string, data: any) => {
    return mockStorage.updateItem(KEY, id, data);
};

export const deleteTimeslot = async (id: string) => {
    return mockStorage.deleteItem(KEY, id);
};
