import React from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import {
  useControllerDispatch,
  useControllerSelector
} from "@/app/gameplay/utils/reduxHooks";
import { useContext } from "react";
import { InvalidActionError } from "thoron";
import { phaseChanged, unitSelected } from "@/shared/store";
import { ControllerPhase } from "@/game/entities/ControlSystem/ControllerState";

interface WaitButtonProps {
  isSelectable?: boolean
}

function WaitButton(props: WaitButtonProps = {}) {
  props = {
    isSelectable: true,
    ...props
  }

  const { controller } = useContext(ThoronContext);
  const dispatch = useControllerDispatch();
  const unitId = useControllerSelector(state => state.unitId);
  const pendingMove = useControllerSelector(state => state.pendingMove);

  const handleClick = () => {
    try {
      controller.pushAction({
        unitId,
        command: "wait",
        destination: pendingMove.destination,
      });
      dispatch(unitSelected(null));
      dispatch(phaseChanged(ControllerPhase.IDLE));
    }
    catch(e) {
      if (e instanceof InvalidActionError) {
        console.error(e);
      }
      else throw e;
    }
  };

  return (
    <li onClick={handleClick} className={props.isSelectable ? "" : "faded"}>
      {"Wait"}
    </li>
  )
}

export default WaitButton;