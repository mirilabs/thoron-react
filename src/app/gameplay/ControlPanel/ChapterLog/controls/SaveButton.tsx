import React, { useContext, useState } from "react";
import ThoronContext from "@/app/gameplay/ThoronContext";
import { Button } from "@mui/material";

function SaveButton() {
  const { save } = useContext(ThoronContext);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save();
    } catch (e) {
      console.error("Failed to save chapter", e);
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
