import { useTypedSelector } from "./useTypedSelector";

export const useModal = () => useTypedSelector(state => state.modal);