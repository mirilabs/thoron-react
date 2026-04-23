import React, { useContext } from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import useUIAction from "@/app/gameplay/utils/useUIAction";
import {
  useControllerDispatch,
  useControllerSelector
} from "@/app/gameplay/utils/reduxHooks";
import { Action, Command } from "thoron";
import { unitSelected } from "@/shared/store";
import { InvalidActionError } from "thoron";

/**
 * Enables the callback to confirm the action selected in the action menu
 */
function ActionConfirmHandler() {
  const { controller } = useContext(ThoronContext);
  const dispatch = useControllerDispatch();
  const unitId = useControllerSelector(state => state.unitId);
  const pendingMove = useControllerSelector(state => state.pendingMove);

  useUIAction("confirm", () => {
    try {
      const action = {
        unitId,
        targetId: pendingMove.targetId,
        destination: pendingMove.destination,
        command: pendingMove.action as Command,
        itemIndex: pendingMove.itemIndex
      } as Action;
      controller.pushAction(action);

      dispatch(unitSelected(null));
    }
    catch (e) {
      if (e instanceof InvalidActionError) {
        console.error(e);
      }
      else throw e;
    }
  });

  return null;
}

function ActionConfirmHandlerContainer({ enabled }: { enabled: boolean }) {
  return enabled ? <ActionConfirmHandler /> : null;
}

export default ActionConfirmHandlerContainer;