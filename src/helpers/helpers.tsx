export const idGenerator = (taskId: any) =>
  taskId < 10 ? `0${taskId}` : taskId.toString();

export const calculateStatus = (progress: any) => {
  switch (progress) {
    case 0:
      return "To Do";
    case 50:
      return "In Progress";
    case 100:
      return "Done";
    default:
      return "To Do";
  }
};

export const calculateProgress = (progress: any) =>
  progress === 100 ? (progress = 0) : (progress += 50);
