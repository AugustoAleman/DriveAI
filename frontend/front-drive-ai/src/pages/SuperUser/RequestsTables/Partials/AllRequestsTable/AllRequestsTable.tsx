import { useMemo } from "react";
import { PageBackground } from "../styles";

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

function AllTable(requests: any) {
  const navigate = useNavigate();

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID solicitud",
        width: 200,
        align: "center", // Align to the center
        headerAlign: "center",
        editable: false,
      },
      {
        field: "contactName",
        headerName: "Nombre",
        width: 200,
        align: "center", // Align to the center
        headerAlign: "center",
        editable: false,
      },
      {
        field: "direction",
        headerName: "Dirección",
        width: 200,
        align: "center", // Align to the center
        headerAlign: "center",
        editable: false,
      },
      {
        field: "groupName",
        headerName: "Grupo",
        width: 200,
        align: "center", // Align to the center
        headerAlign: "center",
        editable: false,
      },
      {
        field: "date",
        headerName: "Fecha de registro",
        width: 200,
        align: "center", // Align to the center
        headerAlign: "center",
        editable: false,
      },
      {
        field: "status",
        headerName: "Estado",
        width: 200,
        align: "center", // Align to the center
        headerAlign: "center",
        renderCell: (params) => (
          <span
            style={{
              fontWeight: 800,
              color: getColorForStatus(params.value),
            }}
          >
            {params.value}
          </span>
        ),
        editable: false,
      },
    ],
    []
  );

  const handleRowClick = (params: any) => {
    console.log("Clicked row:", params.row);
    navigate(`details/${params.row.id}`);
  };

  function getColorForStatus(status: string) {
    switch (status) {
      case "ACCEPTED":
        return "green";
      case "PENDING":
        return "#fc9917";
      case "REJECTED":
        return "red";
      default:
        return "black";
    }
  }

  return (
    <PageBackground>

      <DataGrid
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        rows={requests}
        columns={columns}
        onRowClick={(params: any) => handleRowClick(params)}
        sx={{
          backgroundColor: "transparent",
          width: "auto",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",

          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },

          // only paint data grid rows white and leave header as is
          "& .MuiDataGrid-row": {
            backgroundColor: "white",
          },

          // only paint data grid header bold
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },

          // paint data grid header backgroundColor
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#b3b3b3",
          },

          // paint border of the data grid
          borderColor: "transparent",

          // Move the virtual scroller to the right
          "& .MuiDataGrid-virtualScroller": {
            overflowY: "auto",

            "&::-webkit-scrollbar": {
              marginRight: "0.5rem",
            },
          },
        }}
      />
    </PageBackground>
  );
}

const AllRequestsTable = ({ request }: any) => {
  return AllTable(request);
};

export default AllRequestsTable;
