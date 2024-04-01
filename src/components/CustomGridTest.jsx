import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomGridTest({ data }) {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
      <DataGrid columns={data.columns} rows={data.rows} />
    </div>
  );
}
