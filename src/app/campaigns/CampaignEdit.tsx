import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Campaign } from "@/data/db";

interface CampaignEditProps {
  campaign: Campaign;
  onSave: (newTitle: string) => Promise<void>;
  onCancel: () => void;
}

function CampaignEdit({ campaign, onSave, onCancel }: CampaignEditProps) {
  const [title, setTitle] = useState(campaign.title);

  return (
    <div className="flex flex-col gap-4 p-2">
      <TextField
        fullWidth
        label="Campaign Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        variant="outlined"
        autoFocus
      />
      <div className="flex flex-row gap-2 justify-end">
        <Button
          variant="contained"
          onClick={() => onSave(title)}
          startIcon={<i className="fas fa-save" />}>
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={onCancel}
          startIcon={<i className="fas fa-times" />}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default CampaignEdit;