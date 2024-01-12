import React from 'react';
import Logout from './Logout.jsx';
import { AppBar, Toolbar, Typography, Input } from '@mui/material';

function Header({
  boardName,
  isEditingBoardName,
  editBoardName,
  handleBoardNameChange,
  handleKeyDownBoardName,
  showLogout,
}) {
  return (
    <AppBar position='static' style={{ backgroundColor: '#0079bf' }}>
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h5'>flux.task</Typography>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {isEditingBoardName ? (
            <Input
              style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}
              type='text'
              placeholder='Enter board name'
              value={boardName || ''}
              onChange={handleBoardNameChange}
              onKeyDown={handleKeyDownBoardName}
              autoFocus
            />
          ) : (
            <Typography
              variant='h6'
              onClick={editBoardName}
              style={{ cursor: 'pointer', color: '#fff', fontWeight: 'bold' }}
            >
              {boardName}
            </Typography>
          )}
        </div>
        <div style={{ marginLeft: 'auto' }}> {showLogout && <Logout />}</div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
