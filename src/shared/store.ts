import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Vector2 } from "engine/components";
import {
  ControllerPhase
} from "game/entities/UnitController/ControllerState";

const initialState: {
  phase: ControllerPhase,
  unitId: string,
  position: Vector2,
  pendingMove: {
    destination: Vector2,
    action: string,
    targetId?: string,
    itemIndex?: number
  }
} = {
  phase: null,
  unitId: null,
  position: null,
  pendingMove: {
    destination: null,
    action: null
  }
}

const controllerSlice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    phaseChanged: (state, action) => { state.phase = action.payload },

    unitSelected: (state, action) => { state.unitId = action.payload },

    positionSelected: (state, action) => { state.position = action.payload },

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
  itemSelected
} = controllerSlice.actions;

const controllerStore = configureStore({
  reducer: controllerSlice.reducer
});

export default controllerStore;

export type ControllerStore = typeof controllerStore;
export type ControllerState = ReturnType<ControllerStore["getState"]>;
export type ControllerDispatch = ControllerStore["dispatch"];