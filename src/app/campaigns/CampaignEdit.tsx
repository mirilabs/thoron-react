import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import db, { Campaign } from "@/data/db";
import { useNavigate } from "react-router";
import DeleteButton from "../core/DeleteButton";

interface CampaignEditProps {
  campaign: Campaign;
  onSave: (newTitle: string) => Promise<void>;
  onCancel: () => void;
}

function CampaignEdit({ campaign, onSave, onCancel }: CampaignEditProps) {
  const [title, setTitle] = useState(campaign.title);

  const navigate = useNavigate();

  const handleDelete = async () => {
    await db.campaigns.delete(campaign.id);
    navigate("/");
  }

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
      <DeleteButton
        variant="alert"
        onDelete={handleDelete}
        message={`Are you sure you want to delete ${campaign.title}?`}
        button={
          <Button
            variant="outlined"
            startIcon={<i className="fas fa-trash" />}
            sx={{
              color: "var(--error-color)",
              borderColor: "var(--error-color)"
            }}
          >
            Delete Campaign
          </Button>
        }
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