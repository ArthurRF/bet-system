import {
  Box,
  CircularProgress,
  Container,
  List,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SportEvent } from "../types";
import EventListItem from "./EventListItem";

import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const url = import.meta.env.VITE_API_BASE_URL
        ? `${import.meta.env.VITE_API_BASE_URL}/events`
        : "http://localhost:4000/api/events";

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch events");

      const data = await response.json();

      setEvents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <div>
        <Typography
          color="error"
          align="center"
          variant="h5"
          gutterBottom
          mt={4}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {<SentimentVeryDissatisfiedIcon />}
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Sports Events
        </Typography>
        <List>
          {events.map((event) => (
            <EventListItem key={event.event_id} event={event} />
          ))}
        </List>
      </Paper>
    </Container>
  );
};
