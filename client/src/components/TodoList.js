import {
  Box,
  Button,
  Checkbox,
  ClickAwayListener,
  Container,
} from "@mui/material";
import {
  Grid,
  IconButton,
  Portal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  useGetTodosQuery,
  useAddNewTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../services/todosApi";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import Loader from "./Loader";
import ErrorConnecting from "./ErrorConnecting";

const TodoList = () => {
  const { data: todos, isLoading, isError } = useGetTodosQuery();
  const [addNewTodo] = useAddNewTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const [newTodo, setNewTodo] = useState("");
  const [openAddInput, setOpenAddInput] = useState(false);

  const handleClickAway = () => {
    setOpenAddInput(false);
  };

  const handleAddFormClick = () => {
    setOpenAddInput((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewTodo({ description: newTodo });
    setNewTodo("");
    handleAddFormClick();
  };

  const formStyles = {
    position: "fixed",
    width: 300,
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid",
    p: 4,
    borderRadius: "10px",
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorConnecting />;
  }

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        border: "1px rgba(148,144,144,0.99) solid",
        mt: 18,
        borderRadius: "8px",
      }}
    >
      <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div>
            <Button
              onClick={handleAddFormClick}
              size={"large"}
              style={{ textTransform: "none" }}
              startIcon={<AddIcon />}
              disableRipple={true}
              sx={{
                color: "rgba(148,144,144,0.99)",
                "&:hover": {
                  background: "none",
                },
              }}
            >
              Add a Todo
            </Button>
            {openAddInput ? (
              <Portal>
                <Box component={"form"} onSubmit={handleSubmit} sx={formStyles}>
                  <Typography variant={"h5"} gutterBottom align={"center"}>
                    New Todo
                  </Typography>
                  <TextField
                    inputProps={{ maxLength: 25 }}
                    fullWidth
                    sx={{ mb: 1 }}
                    autoFocus
                    variant={"outlined"}
                    type={"text"}
                    value={newTodo}
                    onChange={(e) => {
                      setNewTodo(e.target.value);
                    }}
                  />
                  <Button fullWidth variant={"contained"} type={"submit"}>
                    Add
                  </Button>
                </Box>
              </Portal>
            ) : null}
          </div>
        </ClickAwayListener>
        <Stack spacing={0} width={"100%"}>
          {todos.data
            .slice(0)
            .reverse()
            .map((todo, index) => (
              <Grid container key={index} alignItems={"center"}>
                <Grid item>
                  <Checkbox
                    color={"success"}
                    checked={todo.checked}
                    onChange={(event) => {
                      updateTodo({
                        checked: event.target.checked,
                        id: todo._id,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant={"subtitle1"}>
                    {todo.description}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    onClick={() => {
                      deleteTodo({ id: todo._id });
                    }}
                  >
                    <ClearIcon fontSize={"small"} />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
        </Stack>
      </Box>
    </Container>
  );
};

export default TodoList;
