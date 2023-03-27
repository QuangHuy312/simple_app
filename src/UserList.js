import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  DialogContentText,
  DialogActions,
  Tooltip,
  Select,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

export default function UserList() {
  const [timeAdd, setTimeAdd] = useState(0);
  const [currentItem, setCurrentItem] = useState("");
  const [disableBtnAdd, setDisableBtnAdd] = useState(false);
  // DeleteUser
  const [openDelete, setOpenDelete] = useState(false);

  // CreateUser
  const [showInputFormat, setShowInputFormat] = useState("phone");
  const [showFormAdd, setShowFormAdd] = useState(false);
  // EditUser
  const [showFormEdit, setShowFormEdit] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timeAdd > 0) {
        setTimeAdd(timeAdd - 1);
      }
      if (timeAdd === 0) {
        clearInterval(myInterval);
        setDisableBtnAdd(false);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [timeAdd]);
  const [data, setData] = useState(() => [
    {
      id: 1,
      contactInfo: "60123456789",
      contactTyp: "M",
      name: "John Smith",
      age: "24",
    },
    {
      id: 2,
      contactInfo: "jccs44@haysc.com",
      contactTyp: "F",
      name: "Jenson",
      age: "31",
    },
    {
      id: 3,
      contactInfo: "12123456789",
      contactTyp: "M",
      name: "John Smith",
      age: "24",
    },
  ]);

  // Search
  const handleSearch = (e) => {
    const { value } = e.target;
    if (value.trim() !== "") {
      const newData = data.filter((item) => item.name.includes(value));
      setData(newData);
    } else {
      setData([
        {
          id: 1,
          contactInfo: "60123456789",
          contactTyp: "M",
          name: "John Smith",
          age: "24",
        },
        {
          id: 2,
          contactInfo: "jccs44@haysc.com",
          contactTyp: "E",
          name: "Jenson",
          age: "31",
        },
        {
          id: 3,
          contactInfo: "12123456789",
          contactTyp: "M",
          name: "John Smith",
          age: "24",
        },
      ]);
    }
  };

  // Delete
  const handleDelete = (id) => {
    const deletedData = data.filter((x) => x.id !== id);
    setData(deletedData);
    setOpenDelete(false);
  };

  // Add user

  const handleChangeRadio = (e) => {
    setShowInputFormat(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const valueForm = new FormData(e.currentTarget);
    setData([
      ...data,
      {
        id: data.length + 1,
        contactInfo: valueForm.get("contact"),
        contactTyp: valueForm.get("gender"),
        name: valueForm.get("name"),
        age: valueForm.get("age"),
      },
    ]);
    setShowFormAdd(false);
    setDisableBtnAdd(true);
    setTimeAdd(15);
  };

  // Edit User
  const handleEditUser = (item) => {
    setCurrentItem(item);
    setShowFormEdit(true);
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const valueForm = new FormData(e.currentTarget);
    const newData = data.map((x) => {
      if (x.id === currentItem.id) {
        return {
          ...x,
          age: valueForm.get("age"),
          contactTyp: valueForm.get("gender"),
        };
      } else {
        return x;
      }
    });
    setData(newData);
    setShowFormEdit(false);
  };
  return (
    <Box
      sx={{
        padding: "30px 100px",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for a contact"
        onChange={handleSearch}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Contact</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {item.name}({item.contactTyp})
                  </TableCell>
                  <TableCell align="center">{item.contactInfo}</TableCell>
                  <TableCell align="center">{item.age}</TableCell>
                  <TableCell align="center">
                    <Box display="flex">
                      <Button
                        variant="contained"
                        onClick={() => handleEditUser(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{
                          marginLeft: 10,
                        }}
                        onClick={() => {
                          setCurrentItem(item.id);
                          setOpenDelete(true);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Box py={5} textAlign="center">
                    {" "}
                    No Data
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Box
          textAlign="right"
          sx={{
            padding: "20px",
            paddingRight: 50,
          }}
        >
          Total : {data.length}
        </Box>
      </TableContainer>

      <Box
        mt={4}
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Tooltip title="Add User">
          <IconButton
            onClick={() => setShowFormAdd(true)}
            disabled={disableBtnAdd}
            sx={{
              background: "gray",
              width: 50,
              height: 50,
              color: "#fff",
              "&:hover": {
                background: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
        {timeAdd > 0 && <Box>{timeAdd + " seconds left"}</Box>}
      </Box>

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this user ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenDelete(false)}>
            Cancel
          </Button>
          <Button onClick={() => handleDelete(currentItem)}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Add user */}
      {showFormAdd && (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Contact</FormLabel>
            <RadioGroup
              defaultValue="phone"
              name="radio-group"
              onChange={handleChangeRadio}
            >
              <FormControlLabel
                value="phone"
                control={<Radio />}
                label="Phone"
              />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email"
              />
            </RadioGroup>
          </FormControl>
          {showInputFormat === "phone" ? (
            <TextField
              margin="normal"
              type="number"
              required
              fullWidth
              id="phone"
              label="Mobile Number"
              name="contact"
              autoComplete="phone"
              autoFocus
            />
          ) : (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="contact"
              autoComplete="email"
              autoFocus
            />
          )}
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup defaultValue="M" name="gender">
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            autoComplete="age"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      )}

      {showFormEdit && (
        <Box component="form" onSubmit={handleSubmitEdit} sx={{ mt: 1 }}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup defaultValue={currentItem.contactTyp} name="gender">
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            autoComplete="age"
            autoFocus
            defaultValue={currentItem.age}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Edit
          </Button>
        </Box>
      )}
    </Box>
  );
}
