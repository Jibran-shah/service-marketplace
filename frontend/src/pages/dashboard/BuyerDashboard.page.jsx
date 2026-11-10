import { useState } from "react";
import { Box } from "@mui/material";
import MasterDetailLayout from "../../components/MasterDetailLayout";
import DashboardActions from "./DashboardActions";
import MyBookingsList from "../bookings/MyBookingList";

export default function BuyerDashboardPage() {
  const [selected, setSelected] = useState(null);
  const [selectedOrderId, setSelectedOrderId] =
    useState(null);

  const actions = [
    {
      label: "bookings",
      component: <MyBookingsList/>
    }
  ];

  return (
    <MasterDetailLayout
      hasSelection={
        !!selected || !!selectedOrderId
      }
      sidebar={(openMain) => (
        <DashboardActions
          actions={actions}
          onSelectAction={(item) => {
            setSelectedOrderId(null);
            setSelected(item);
            openMain?.();
          }}
        />
      )}
      main={
        <Box sx={{ p: 2 }}>
          {selected?.component ?? <MyBookingsList/>}
        </Box>
      }
    />
  );
}