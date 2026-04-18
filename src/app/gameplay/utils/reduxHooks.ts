import { useSelector, useDispatch, useStore } from "react-redux";
import {
  ControllerDispatch,
  ControllerState,
  ControllerStore
} from "@/shared/store";

// https://redux.js.org/usage/usage-with-typescript#define-typed-hooks

export const useControllerSelector =
  useSelector.withTypes<ControllerState>();

export const useControllerDispatch =
  useDispatch.withTypes<ControllerDispatch>();

export const useControllerStore =
  useStore.withTypes<ControllerStore>();