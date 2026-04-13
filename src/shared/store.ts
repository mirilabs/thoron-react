import { createSlice, configureStore } from "@reduxjs/toolkit";
import { IVector2 } from "@/engine/utils/Vector2";
import {
  ControllerPhase
} from "@/game/entities/ControlSystem/ControllerState";
import listenerMiddleware from "./listenerMiddleware";
import { Command } from "thoron";

export type ChapterEditMode = "unit_move" | null;

const initialState: {
  phase: ControllerPhase,
  unitId: string | number,
  position: IVector2,
  pendingMove: {
    destination: IVector2,
    action: Command,
    targetId?: string,
    itemIndex?: number
  },
  editMode: ChapterEditMode
} = {
  phase: null,
  unitId: null,
  position: null,
  pendingMove: {
    destination: null,
    action: null
  },
  editMode: null
}

const controllerSlice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    phaseChanged: (state, action) => { state.phase = action.payload },

    unitSelected: (state, action) => {
      state.unitId = action.payload;
    },

    positionSelected: (state, action) => {
      state.position = action.payload;
    },

    destinationSelected: (state, action) => {
      state.pendingMove.destination = action.payload;
    },

    actionSelected: (state, action) => {
      state.pendingMove.action = action.payload;
    },

    targetSelected: (state, action) => {
      state.pendingMove.targetId = action.payload;
    },

    itemSelected: (state, action) => {
      state.pendingMove.itemIndex = action.payload;
    },

    pendingMoveDiscarded(state, action) {
      state.pendingMove = { destination: null, action: null }
    },

    chapterEditModeChanged(state, action) {
      state.editMode = action.payload;
    }
  }
});

export const {
  phaseChanged,
  unitSelected,
  positionSelected,
  destinationSelected,
  actionSelected,
  targetSelected,
  itemSelected,
  pendingMoveDiscarded,
  chapterEditModeChanged
} = controllerSlice.actions;

const controllerStore = configureStore({
  reducer: controllerSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware)
});

export default controllerStore;

export type ControllerStore = typeof controllerStore;
export type ControllerState = ReturnType<ControllerStore["getState"]>;
export type ControllerDispatch = ControllerStore["dispatch"];