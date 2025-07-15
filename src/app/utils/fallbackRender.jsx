import React from "react";

function fallbackRender({ error }) {
  return (
    <div>
      <p>⚠️Something went wrong</p>
      {
        process.env.NODE_ENV === "development" &&
        <>
          <p>{error.message}</p>
          <p style={{color: "gray"}}>{error.stack}</p>
        </>
      }
    </div>
  )
}

export default fallbackRender;