// https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage

import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { ControllerState, ControllerDispatch } from "./store";

const listenerMiddleware = createListenerMiddleware();

export default listenerMiddleware.middleware;

export const addAppListener =
  addListener.withTypes<ControllerState, ControllerDispatch>();