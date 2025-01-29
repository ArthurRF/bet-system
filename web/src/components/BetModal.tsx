import {
  Alert,
  Box,
  Button,
  InputBaseComponentProps,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { SportEvent } from "../types";

interface Props {
  open: boolean;
  onClose: () => void;
  event: SportEvent;
}

interface CustomProps extends NumericFormatProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<typeof NumericFormat, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              value: values.value,
            },
          } as React.ChangeEvent<HTMLInputElement>);
        }}
        thousandSeparator
        prefix="$"
        decimalScale={2}
        fixedDecimalScale
      />
    );
  }
);

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const BetModal: React.FC<Props> = ({ open, onClose, event }) => {
  const [amount, setAmount] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabledInput, setDisabledInput] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);

    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      await new Promise((resolve) => {
        setDisabledInput(true);
        setTimeout(resolve, 200);
      });
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setAmount("");
        setDisabledInput(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to place bet. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="bet-modal-title">
      <Box sx={modalStyle}>
        <Typography
          id="bet-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Place Bet: {event.event_name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Odds: {event.odds}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Bet Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              slotProps={{
                input: {
                  inputComponent:
                    NumericFormatCustom as unknown as React.ElementType<InputBaseComponentProps>,
                },
              }}
              error={!!error}
              helperText={error}
              fullWidth
              disabled={disabledInput}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Place Bet
            </Button>
            {success && (
              <Alert severity="success">Bet placed successfully!</Alert>
            )}
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default BetModal;
