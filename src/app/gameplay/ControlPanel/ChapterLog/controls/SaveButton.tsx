import React, { useContext, useState } from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import { Button } from "@mui/material";
import { addAlert } from "@/app/core/Alerts";

function SaveButton() {
  const { save } = useContext(ThoronContext);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save();
      addAlert({ type: "success", message: `Saved` });
    } catch (e) {
      addAlert({ type: "error", message: "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Button
      variant="contained"
      onClick={handleSave}
      disabled={saving}
      startIcon={<i className={`fas ${saving ? "fa-spinner fa-spin" : "fa-save"}`} />}
    >
      {saving ? "Saving..." : "Save"}
    </Button>
  )
}

export default SaveButton;
