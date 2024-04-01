import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomGridTest({ data }) {
  return (
    <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
      <DataGrid
        {...data}
        // initialState={{
        //   columns: {
        //     columnVisibilityModel: {
        //       // Hide columns status and traderName, the other columns will remain visible
        //       RSRating: false,
        //       "RS-O'neil": false,
        //       RSI: false,
        //       ADX: false,
        //       "DMI ": false,
        //       "DMI-": false,
        //     },
        //   },
        //   pagination: { paginationModel: { pageSize: 5 } },
        // }}
        // pageSizeOptions={[5, 10, 25]}
        // disableColumnFilter
        // disableColumnMenu
      />
    </div>
  );
}
