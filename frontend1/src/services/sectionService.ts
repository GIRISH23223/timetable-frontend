import { mockStorage } from "@/utils/mockStorage";

const KEY = "sections";

export const getSections = async () => {
    return mockStorage.getItems<any>(KEY);
};

export const createSection = async (data: any) => {
    return mockStorage.createItem(KEY, data);
};

export const updateSection = async (id: string, data: any) => {
    return mockStorage.updateItem(KEY, id, data);
};

export const deleteSection = async (id: string) => {
    return mockStorage.deleteItem(KEY, id);
};
