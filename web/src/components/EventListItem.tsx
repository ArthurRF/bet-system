import {
  Button,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { SportEvent } from "../types";
import BetModal from "./BetModal";

interface Props {
  event: SportEvent;
}

const EventListItem: React.FC<Props> = ({ event }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ListItem
        secondaryAction={
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            Place Bet
          </Button>
        }
      >
        <ListItemText
          primary={event.event_name}
          secondary={
            <Typography variant="body2" color="text.secondary">
              Odds: {event.odds}
            </Typography>
          }
        />
      </ListItem>
      <Divider />
      <BetModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        event={event}
      />
    </>
  );
};

export default EventListItem;
