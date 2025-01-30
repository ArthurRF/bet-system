import {
  Box,
  CircularProgress,
  Container,
  List,
  Pagination,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { PaginatedResponse, SportEvent } from "../types";
import EventListItem from "./EventListItem";

const ITEMS_PER_PAGE = 2;

export const EventList: React.FC = () => {
  const [events, setEvents] = useState<SportEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async (currentPage: number) => {
    try {
      setLoading(true);

      const url = import.meta.env.VITE_API_BASE_URL
        ? `${
            import.meta.env.VITE_API_BASE_URL
          }/events?page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        : `http://localhost:4000/api/events?page=${currentPage}&limit=${ITEMS_PER_PAGE}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch events");

      const data: PaginatedResponse = await response.json();
      setEvents(data.events);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (error) {
    return (
      <Container maxWidth="md">
        <Typography color="error" align="center" sx={{ mt: 4 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Sports Events
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Stack spacing={2}>
            <List>
              {events.map((event) => (
                <EventListItem key={event.event_id} event={event} />
              ))}
            </List>

            {totalPages > 1 && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </Stack>
        )}
      </Paper>
    </Container>
  );
};
