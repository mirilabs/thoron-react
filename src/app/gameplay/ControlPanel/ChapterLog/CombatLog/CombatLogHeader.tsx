import React from 'react';
import Chapter, { ActionResult } from 'thoron';
import UnitChip from '../UnitChip';
import { IconButton } from '@mui/material';

interface CombatLogHeaderProps {
  actionResult: ActionResult;
  chapter: Chapter;
  toggle: () => void;
}

function CombatLogHeader({
  actionResult,
  chapter,
  toggle
}: CombatLogHeaderProps) {
  if (actionResult.action.command !== "attack") return null;

  const { unitId, targetId } = actionResult.action;
  const attacker = chapter.getUnitById(unitId);
  const defender = chapter.getUnitById(targetId);

  return (
    <div className="flex flex-row gap-1 items-center w-full">
      <UnitChip unit={attacker} />
      <p className="text-[var(--text-color-2)]">attacked</p>
      <UnitChip unit={defender} />
      <div className="ml-auto w-10">
        <IconButton onClick={toggle}>
          <i className="fa-solid fa-chevron-down text-[var(--text-color-2)]"></i>
        </IconButton>
      </div>
    </div>
  )
}

export default CombatLogHeader;