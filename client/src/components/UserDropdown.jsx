import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function UserDropdown({ users, onSelectUser, selectedUserId }) {
  return (
    <>
      <FormControl size="small">
        <InputLabel id="user-select-label">Assign</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUserId}
          label="User"
          onChange={(e) => onSelectUser(e.target.value)}
          style={{ minWidth: 120 }}
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default UserDropdown;
