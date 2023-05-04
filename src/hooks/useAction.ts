import { rootActions } from "@/store/actions";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export const useAction = () => {
    const dispatch = useDispatch();
    const actions = useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
    return actions;
}