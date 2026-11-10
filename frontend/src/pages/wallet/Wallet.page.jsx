import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  Button,
  Modal,
} from "@mui/material";

import WalletTransactionCard from "../../components/wallet/WalletTransactionCard";
import WithdrawRequestForm from "../../components/forms/WithdrawRequestForm";

import {
  useWallet,
  useWalletTransactions,
} from "../../hooks/api/wallet/wallet.hooks";

export default function WalletPage() {
  const { data: wallet, isLoading: walletLoading } = useWallet();

  const {
    data: transactions,
    isLoading: txLoading,
  } = useWalletTransactions();

  const [openWithdraw, setOpenWithdraw] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      {/* HEADER */}
      <Typography variant="h5" mb={2}>
        My Wallet
      </Typography>

      {/* BALANCE */}
      <Paper sx={{ p: 2, mb: 2 }}>
        {walletLoading ? (
          <Typography>Loading balance...</Typography>
        ) : (
          <>
            <Typography variant="h6">
              Balance: {wallet?.balance ?? 0}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Available funds in your wallet
            </Typography>
          </>
        )}
      </Paper>

      {/* TRANSACTIONS */}
      <Typography variant="h6" mb={1}>
        Transactions
      </Typography>

      {txLoading ? (
        <Typography>Loading transactions...</Typography>
      ) : (
        <Stack spacing={2}>
          {transactions?.length ? (
            transactions.map((tx) => (
              <WalletTransactionCard
                key={tx._id || tx.id}
                transaction={tx}
              />
            ))
          ) : (
            <Typography color="text.secondary">
              No transactions found
            </Typography>
          )}
        </Stack>
      )}

      {/* ACTIONS */}
      <Button
        sx={{ mt: 3 }}
        variant="contained"
        onClick={() => setOpenWithdraw(true)}
      >
        Withdraw
      </Button>

      {/* 🔥 WITHDRAW MODAL */}
      <Modal
        open={openWithdraw}
        onClose={() => setOpenWithdraw(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
        >
          <WithdrawRequestForm
            walletId={wallet?._id}
            maxAmount={wallet?.balance || 0}
            onSuccess={() => {
              setOpenWithdraw(false);
              // optional: refetch wallet + transactions
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}