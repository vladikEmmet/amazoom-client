import { useAppDispatch } from "@/store/store";
import { AsyncThunkAction, unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { useAction } from "./useAction"

export const useAppDispatchUnwrap = () => {
    const dispatch = useAppDispatch();
    async function dispatchUnwrapped<R extends any>(
        action: AsyncThunkAction<R, any, any>
    ): Promise<R> {
        return dispatch(action).then(unwrapResult)
    }

    return dispatchUnwrapped;
}