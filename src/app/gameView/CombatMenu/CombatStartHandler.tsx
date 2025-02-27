import React, { useContext } from "react";
import ThoronContext from "components/ThoronContext";
import useUIAction from "components/utils/useUIAction";
import {
  useControllerDispatch,
  useControllerSelector
} from "components/utils/reduxHooks";
import { Command } from "thoron";
import { unitSelected } from "shared/store";
import { InvalidActionError } from "thoron";

function CombatStartHandler() {
  const { controller } = useContext(ThoronContext);
  const dispatch = useControllerDispatch();
  const unitId = useControllerSelector(state => state.unitId);
  const pendingMove = useControllerSelector(state => state.pendingMove);

  useUIAction("confirm", () => {
    try {
      controller.pushAction({
        unitId,
        targetId: pendingMove.targetId,
        destination: pendingMove.destination,
        command: pendingMove.action as Command
      });
      dispatch(unitSelected(null));
    }
    catch(e) {
      if (e instanceof InvalidActionError) {
        console.error(e);
      }
      else throw e;
    }
  });

  return null;
}

function CombatStartHandlerContainer({ enabled }: { enabled: boolean }) {
  return enabled ? <CombatStartHandler /> : null;
}

export default CombatStartHandlerContainer;