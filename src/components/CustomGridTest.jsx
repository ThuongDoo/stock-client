import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomGridTest({ data }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
          color: "white",
          "& .MuiDataGrid-columnsContainer": {
            backgroundColor: "white",
          },
          "& .MuiDataGrid-iconSeparator": {
            // display: "none",
            // backgroundColor: "black",
          },
          "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
            backgroundColor: "black",
          },
          "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
            borderRight: `1px solid `,
          },
          "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
            borderBottom: `1px solid `,

            backgroundColor: "#344155",
          },
          "& .MuiDataGrid-cell": {
            color: "white",
          },
          "& .MuiPaginationItem-root": {
            backgroundColor: "white",

            borderRadius: 0,
          },
          "& .MuiDataGrid-withBorderColor": {
            backgroundColor: "blue",
          },
        }}
        {...data}
        initialState={{
          columns: {
            columnVisibilityModel: {
              // Hide columns status and traderName, the other columns will remain visible
              RSRating: false,
              "RS-O'neil": false,
              RSI: false,
              ADX: false,
              "DMI ": false,
              "DMI-": false,
            },
          },
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableColumnFilter
        disableColumnMenu
      />
    </div>
  );
}
