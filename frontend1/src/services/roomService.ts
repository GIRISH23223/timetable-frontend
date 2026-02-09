import { mockStorage } from "@/utils/mockStorage";

const KEY = "rooms";

export const getRooms = async () => {
    return mockStorage.getItems<any>(KEY);
};

export const createRoom = async (data: any) => {
    return mockStorage.createItem(KEY, data);
};

export const updateRoom = async (id: string, data: any) => {
    return mockStorage.updateItem(KEY, id, data);
};

export const deleteRoom = async (id: string) => {
    return mockStorage.deleteItem(KEY, id);
};
