import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateStorage } from "zustand/middleware";

const commonStoreStorage: StateStorage = {
    getItem: (name: string): Promise<any> => {
        return AsyncStorage.getItem(name);
    },
    setItem: (name: string, value: any): Promise<void> => {
        return AsyncStorage.setItem(name, value);
    },
};

export default commonStoreStorage;
