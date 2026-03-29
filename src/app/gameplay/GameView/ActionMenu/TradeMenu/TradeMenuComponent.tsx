import React from 'react';
import { useControllerSelector } from '@/app/gameplay/utils/reduxHooks';
import useUnit, { useSelectedUnit } from '@/app/gameplay/utils/useUnit';
import { DeployedUnit } from 'thoron';
import { useUIEmitter } from '@/app/gameplay/utils/useUIAction';

function TradeMenu() {
  const unit: DeployedUnit = useSelectedUnit();
  const {
    targetId
  } = useControllerSelector(state => state.pendingMove);
  const target: DeployedUnit = useUnit(targetId);

  const cancel = useUIEmitter("cancel");
  const confirm = useUIEmitter("confirm");

  if (!unit || !target) return null;

  return (
    <div className="trade-menu">
      <div className="trade-menu__content">
        <div className="trade-menu__unit">
          <h3>{unit.record.name}</h3>
          <ul className="trade-menu__inventory">
            {unit.items.map((item, i) => (
              <li key={i} className="trade-menu__item">
                {item.name}
                <button className="trade-menu__item__button">
                  <i className="fas fa-arrow-right" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="trade-menu__divider" />
        <div className="trade-menu__unit">
          <h3>{target.record.name}</h3>
          <ul className="trade-menu__inventory">
            {target.items.map((item, i) => (
              <li key={i} className="trade-menu__item">
                <button className="trade-menu__item__button">
                  <i className="fas fa-arrow-left" />
                </button>
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="trade-menu__actions">
        <button className="trade-menu__button confirm" onClick={confirm}>
          <i className="fas fa-check" />
          Confirm
        </button>
        <button className="trade-menu__button cancel" onClick={cancel}>
          <i className="fas fa-x" />
          Cancel
        </button>
      </div>
    </div>
  );
}

export default TradeMenu;
