import React, { useState, useEffect } from 'react';
import Column from './Column.jsx';
import { Button } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { reorder } from '../utils/reorder';
import { move } from '../utils/move';
import { useColumnsData } from './LocalContext.js';
import { Outlet } from 'react-router-dom';
import {
  initializeBoard,
  updateBoardName,
  createColumn,
  deleteColumn,
  updateColumn,
} from '../services/apiService.js';

function Board() {
  const [boardId, setBoardId] = useState(null);
  const [boardName, setBoardName] = useState('');
  const [isEditingBoardName, setIsEditingBoardName] = useState(true);
  const [columnsData, setColumnsData] = useColumnsData([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await initializeBoard();

        setBoardId(response._id);
        setBoardName(response.name);
        setColumnsData(response.columns);
        console.log(response);
      } catch (error) {
        console.error('Error fetching board details:', error);
      }
    };

    fetchBoard();
  }, []);

  useEffect(() => {
    // Handler to be called after a delay
    const handler = setTimeout(() => {
      if (boardName) {
        try {
          updateBoardName(boardId, boardName);
        } catch (error) {
          console.error('Error updating board name:', error);
        }
      }
    }, 300);

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(handler);
    };
  }, [boardName, boardId]);

  const handleBoardNameChange = (event) => {
    setBoardName(event.target.value);
  };

  const handleKeyDownBoardName = async (event) => {
    if (event.key === 'Enter') {
      setIsEditingBoardName(false);
      event.preventDefault();
    }
  };

  const editBoardName = () => {
    setIsEditingBoardName(true);
  };

  //=================================================================================================

  const handleCreateColumn = async () => {
    const newColumn = {
      name: '',
      wip: '',
      tasks: [],
      board: boardId,
    };

    try {
      const response = await createColumn(newColumn);
      const createdColumn = response.data;
      setColumnsData([...columnsData, createdColumn]);
    } catch (error) {
      console.error('Error creating column:', error);
    }
  };

  const handleDeleteColumn = async (columnId) => {
    try {
      await deleteColumn(columnId);
      const updatedColumn = columnsData.filter((column) => {
        return column._id !== columnId;
      });
      setColumnsData(updatedColumn);
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  // const handleUpdateColumn = (columnId, updatedColumnData) => {
  //   const columns = { ...columnsData };
  //   columns[columnId] = updatedColumnData;

  //   setColumnsData(columns);
  // };

  //=================================================================================================

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If the item is dropped outside the list, do nothing.
    if (!destination) {
      return;
    }

    // If the item is dropped onto the same place, do nothing.
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    console.log(source.droppableId);

    const startColumnIndex = columnsData.findIndex(
      (column) => column._id === source.droppableId,
    );
    const finishColumnIndex = columnsData.findIndex(
      (column) => column._id === destination.droppableId,
    );
    //column not found in the array
    if (startColumnIndex === -1 || finishColumnIndex === -1) {
      console.error('Column not found');
      return;
    }

    const startColumn = columnsData[startColumnIndex];
    const finishColumn = columnsData[finishColumnIndex];

    // If reordering tasks within the same column
    if (startColumn._id === finishColumn._id) {
      const reorderedTasks = reorder(
        startColumn.tasks,
        source.index,
        destination.index,
      );

      const updatedColumns = columnsData.map((column) => {
        if (column._id === startColumn._id) {
          return {
            ...column,
            tasks: reorderedTasks,
          };
        }
        return column;
      });
      setColumnsData(updatedColumns);

      updateColumn(startColumn._id, {
        tasks: updatedColumns[startColumnIndex].tasks,
      });
    } else {
      // If moving tasks between columns
      const moveResult = move(
        startColumn.tasks,
        finishColumn.tasks,
        source,
        destination,
      );

      console.log(moveResult);

      const updatedColumns = columnsData.map((column) => {
        if (column._id === startColumn._id) {
          return {
            ...column,
            tasks: moveResult.updatedSource,
          };
        } else if (column._id === finishColumn._id) {
          return {
            ...column,
            tasks: moveResult.updatedDest,
          };
        }

        return column;
      });

      setColumnsData(updatedColumns);
      updateColumn(startColumn._id, { tasks: moveResult.updatedSource });
      updateColumn(finishColumn._id, { tasks: moveResult.updatedDest });
    }
  };

  return (
    <>
      <Header
        boardName={boardName}
        isEditingBoardName={isEditingBoardName}
        editBoardName={editBoardName}
        handleBoardNameChange={handleBoardNameChange}
        handleKeyDownBoardName={handleKeyDownBoardName}
        showLogout={true}
      />
      <div
        style={{
          overflowX: 'auto',
          padding: '24px',
          maxHeight: '100%',
        }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <Button
            onClick={(event) => handleCreateColumn(event)}
            variant='outlined'
            style={{
              marginTop: '20px',
              backgroundColor: '#f4f5f7',
              borderRadius: '5px',
              width: '250px',
              padding: '10px',
              opacity: '0.7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              margin: '10px 5px',
              boxSizing: 'border-box',
              overflowY: 'auto',
              flexShrink: 0,
              height: 'auto',
            }}
          >
            Add column
          </Button>
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              minHeight: '100px',
            }}
          >
            {Object.values(columnsData).map((column) => {
              return (
                <Column
                  key={column._id}
                  column={column}
                  deleteColumn={() => handleDeleteColumn(column._id)}
                />
              );
            })}
          </div>
        </DragDropContext>
        <Footer />
        <Outlet />
      </div>
    </>
  );
}

export default Board;
