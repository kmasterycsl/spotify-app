import { useContext } from "react";
import { AppStateContext } from "../store/store";

export function useAppState() {
    return useContext(AppStateContext).state;
}

export function useAppDispatch() {
    return useContext(AppStateContext).dispatch;
}