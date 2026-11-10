import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import WalletTransactionCard from "./WalletTransactionCard";
import WithdrawRequestForm from "./WithdrawRequestForm";

import {
  useWallet,
  useWalletTransactions,
} from "../../hooks/api/wallet/wallet.hooks";

const containerSx = {
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

const sectionSx = {
  p: 2,
  border: "1px solid",
  borderColor: "divider",
  borderRadius: 2,
};

const balanceContentSx = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
};

const labelSx = {
  fontSize: 12,
  color: "text.secondary",
};

const amountSx = {
  mt: 0.25,
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1.2,
};

const withdrawButtonSx = {
  flexShrink: 0,
  textTransform: "none",
  fontWeight: 600,
};

const sectionTitleSx = {
  fontSize: 16,
  fontWeight: 600,
  mb: 1.5,
};

const transactionsSx = {
  display: "flex",
  flexDirection: "column",
  gap: 1.5,
};

const emptySx = {
  py: 2,
  color: "text.secondary",
  fontSize: 14,
};

const modalSx = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(92vw, 480px)",
  maxHeight: "90vh",
  overflowY: "auto",
  outline: "none",
};

export default function Wallet() {
  const { data: wallet, isLoading: walletLoading } = useWallet();

  const {
    data: transactions,
    isLoading: txLoading,
  } = useWalletTransactions();

  const [openWithdraw, setOpenWithdraw] = useState(false);

  const balance = Number(wallet?.balance || 0);

  return (
    <Box sx={containerSx}>
      {/* BALANCE */}
      <Paper elevation={0} sx={sectionSx}>
        {walletLoading ? (
          <Typography sx={labelSx}>
            Loading balance...
          </Typography>
        ) : (
          <Box sx={balanceContentSx}>
            <Box>
              <Typography sx={labelSx}>
                Available Balance
              </Typography>

              <Typography sx={amountSx}>
                Rs. {balance.toLocaleString()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={() => setOpenWithdraw(true)}
              disabled={!balance}
              sx={withdrawButtonSx}
            >
              Withdraw
            </Button>
          </Box>
        )}
      </Paper>

      {/* TRANSACTIONS */}
      <Paper elevation={0} sx={sectionSx}>
        <Typography sx={sectionTitleSx}>
          Transactions
        </Typography>

        {txLoading ? (
          <Typography sx={emptySx}>
            Loading transactions...
          </Typography>
        ) : transactions?.length ? (
          <Stack sx={transactionsSx}>
            {transactions.map((transaction) => (
              <WalletTransactionCard
                key={transaction._id || transaction.id}
                transaction={transaction}
              />
            ))}
          </Stack>
        ) : (
          <Typography sx={emptySx}>
            No transactions found
          </Typography>
        )}
      </Paper>

      {/* WITHDRAW */}
      <Modal
        open={openWithdraw}
        onClose={() => setOpenWithdraw(false)}
      >
        <Box sx={modalSx}>
          <WithdrawRequestForm
            walletId={wallet?._id}
            maxAmount={balance}
            onSuccess={() => setOpenWithdraw(false)}
          />
        </Box>
      </Modal>
    </Box>
  );
}