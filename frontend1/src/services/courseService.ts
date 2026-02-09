import { mockStorage } from "@/utils/mockStorage";

const KEY = "courses";

export const getCourses = async () => {
    return mockStorage.getItems<any>(KEY);
};

export const createCourse = async (data: any) => {
    return mockStorage.createItem(KEY, data);
};

export const updateCourse = async (id: string, data: any) => {
    return mockStorage.updateItem(KEY, id, data);
};

export const deleteCourse = async (id: string) => {
    return mockStorage.deleteItem(KEY, id);
};
