import { mockStorage } from "@/utils/mockStorage";

const KEY = "faculties";

export const getFaculties = async () => {
    return mockStorage.getItems<any>(KEY);
};

export const createFaculty = async (data: any) => {
    return mockStorage.createItem(KEY, data);
};

export const updateFaculty = async (id: string, data: any) => {
    return mockStorage.updateItem(KEY, id, data);
};

export const deleteFaculty = async (id: string) => {
    return mockStorage.deleteItem(KEY, id);
};
