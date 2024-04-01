import { Box, Pagination, PaginationItem, styled } from "@mui/material";
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import React from "react";
// import {
//   DataGrid,
//   GridToolbarColumnsButton,
//   GridToolbarContainer,
//   GridToolbarDensitySelector,
//   GridToolbarExport,
//   gridPageCountSelector,
//   gridPageSelector,
//   useGridApiContext,
//   useGridSelector,
// } from "@mui/x-data-grid";
// // import { useDemoData } from "@mui/x-data-grid-generator";
// import { styled } from "@mui/material/styles";
// import Pagination from "@mui/material/Pagination";
// import PaginationItem from "@mui/material/PaginationItem";
// import { Box } from "@mui/material";

// function customCheckbox(theme) {
//   return {
//     "& .MuiCheckbox-root svg": {
//       width: 16,
//       height: 16,
//       backgroundColor: "transparent",
//       border: `1px solid ${
//         theme.palette.mode === "light" ? "#d9d9d9" : "rgb(67, 67, 67)"
//       }`,
//       borderRadius: 2,
//     },
//     "& .MuiCheckbox-root svg path": {
//       display: "none",
//     },
//     "& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg": {
//       backgroundColor: "#1890ff",
//       borderColor: "#1890ff",
//     },
//     "& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after": {
//       position: "absolute",
//       display: "table",
//       border: "2px solid #fff",
//       borderTop: 0,
//       borderLeft: 0,
//       transform: "rotate(45deg) translate(-50%,-50%)",
//       opacity: 1,
//       transition: "all .2s cubic-bezier(.12,.4,.29,1.46) .1s",
//       content: '""',
//       top: "50%",
//       left: "39%",
//       width: 5.71428571,
//       height: 9.14285714,
//     },
//     "& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after":
//       {
//         width: 8,
//         height: 8,
//         backgroundColor: "#1890ff",
//         transform: "none",
//         top: "39%",
//         border: 0,
//       },
//   };
// }

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: theme.palette.mode === "light" ? "white" : "rgba(255,255,255,0.85)",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  WebkitFontSmoothing: "auto",
  letterSpacing: "normal",
  "& .MuiDataGrid-columnsContainer": {
    backgroundColor: theme.palette.mode === "light" ? "#fafafa" : "#1d1d1d",
  },
  "& .MuiDataGrid-iconSeparator": {
    // display: "none",
    // backgroundColor: "black",
  },
  "& .MuiDataGrid-columnHeaders .MuiDataGrid-columnHeader": {
    backgroundColor: "black",
  },
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-cell": {
    borderRight: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,
  },
  "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
    borderBottom: `1px solid ${
      theme.palette.mode === "light" ? "#f0f0f0" : "#303030"
    }`,

    backgroundColor: "#344155",
  },
  "& .MuiDataGrid-cell": {
    color: theme.palette.mode === "light" ? "white" : "rgba(255,255,255,0.65)",
  },
  "& .MuiPaginationItem-root": {
    backgroundColor: "white",

    borderRadius: 0,
  },
  "% .MuiDataGrid-footerContainer": { backgroundColor: "blue" },
  // ...customCheckbox(theme),
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: "Change density" } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport
        slotProps={{
          tooltip: { title: "Export data" },
          button: { variant: "outlined" },
        }}
        csvOptions={{
          fileName: "myExport",
          exportData: { all: true },
        }}
        printOptions={{
          disableToolbarButton: true,
        }}
      />
    </GridToolbarContainer>
  );
}
const PAGE_SIZE = 20;

export default function CustomGrid({ data }) {
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  return (
    <div style={{ height: 400, width: "100%" }}>
      <StyledDataGrid
        sx={{
          "& .MuiDataGrid-footerContainer": { backgroundColor: "#0F172A" },
        }}
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
        }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        slots={{
          pagination: CustomPagination,
          toolbar: CustomToolbar,
        }}
        {...data}
        disableColumnFilter
        disableColumnMenu
      />
    </div>
  );
}
