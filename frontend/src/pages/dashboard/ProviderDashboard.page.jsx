import { useState } from "react";
import { Box } from "@mui/material";

import MasterDetailLayout from "../../components/MasterDetailLayout";
import DashboardActions from "./DashboardActions";
import CreateServiceForm from "../services/CreateServiceForm";
import MyServicesList from "../services/MyServices"
import MyBookingsList from "../bookings/MyBookingList";
import Wallet from "../wallet/Wallet";

export default function ProviderDashboardPage() {
  const [selected, setSelected] = useState(null);

  const actions = [
    {
      label: "Add Service",
      Component:<CreateServiceForm/>
    },
    {
      label: "My Services",
      Component:<MyServicesList/>
    },
    {
      label: "Bookings",
      Component:<MyBookingsList/>
    },
    {
      label: "Wallet",
      Component:<Wallet/>
    }
  ];

  return (
    <Box sx={{p:1}}>
      <MasterDetailLayout
        hasSelection={!!selected}
        sidebar={(openMain) => (
          <DashboardActions
            actions={actions}
            onSelectAction={(item) => {
              setSelected(item);
              openMain?.();
            }}
          />
        )}

        main={
          selected?.Component ?? null
        }
      />
    </Box>
  );
}