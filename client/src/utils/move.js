export function move(
  source,
  destination,
  droppableSource,
  droppableDestination
) {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  return {
    updatedSource: sourceClone,
    updatedDest: destClone,
  };
}
