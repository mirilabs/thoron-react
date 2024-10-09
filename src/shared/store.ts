import { createSlice, configureStore } from "@reduxjs/toolkit";
import { Vector2 } from "engine/components";
import {
  ControllerPhase
} from "game/entities/UnitController/ControllerState";

const initialState: {
  phase: ControllerPhase,
  unitId: string,
  position: Vector2,
  destination: Vector2,
  targetId: string
} = {
  phase: null,
  unitId: null,
  position: null,
  destination: null,
  targetId: null
}

const controllerSlice = createSlice({
  name: 'controller',
  initialState,
  reducers: {
    phaseChanged: (state, action) => { state.phase = action.payload },

    unitSelected: (state, action) => { state.unitId = action.payload },

    positionSelected: (state, action) => { state.position = action.payload },

    destinationSelected: (state, action) => {
      state.destination = action.payload;
    },

    targetSelected: (state, action) => { state.targetId = action.payload }
  }
});

export const {
  phaseChanged,
  unitSelected,
  positionSelected,
  destinationSelected,
  targetSelected
} = controllerSlice.actions;

const controllerStore = configureStore({
  reducer: controllerSlice.reducer
});

export default controllerStore;

export type ControllerStore = typeof controllerStore;
export type ControllerState = ReturnType<ControllerStore["getState"]>;
export type ControllerDispatch = ControllerStore["dispatch"];