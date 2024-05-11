import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

// κανει fetch σωστα τους χρηστες! μην πειραξεις τον κωδικα
// οταν επιλεγω εναν χρηστη απο το dropdown, δεν τον επιλεγει στο dropdown
// αυτό μάλλον οφείλεται στο ότι στο value του Select δεν περνάει σωστά το selectedUserId

function UserDropdown({ users, onSelectUser, selectedUserId }) {
  return (
    <FormControl size="small">
      <InputLabel id="user-select-label">User</InputLabel>
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
  );
}

export default UserDropdown;
