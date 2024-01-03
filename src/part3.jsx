import '../src/assets/style.css';
// Now we are using another json file, with more tasks that are not ordered
import payload from "./tasks-advanced.json";

export const drawTasks = () => {

  const offset = 150

  const tasks = loadTasks();

  function loadTasks() {
    const tasksById = payload.tasks.reduce((map, task) =>
      map.set(task.taskId, task), new Map()
    );
    payload.tasks.forEach(task => {
      if (task.blockedBy && task.blockedBy.length > 0) {
        task.blockedBy = task.blockedBy.map(taskId => tasksById.get(taskId));
      }
    })
    return sortTopologically(payload.tasks);
  }

  // This is just a variation of the sort for our use case
  function sortTopologically(unsortedTasks) {
    const visited = new Set();
    const sortedTasks = [];
    const visit = (task) => {
      if (visited.has(task)) return;
      visited.add(task);
      if (task.blockedBy && task.blockedBy.length > 0) {
        task.blockedBy.forEach(visit);
      }
      sortedTasks.push(task);
    };
    unsortedTasks.forEach(visit);
    sortedTasks.reverse()
    return sortedTasks;
  }

  function calculatePositions(length, currentPosition) {
    if (length === 1) {
      return [currentPosition];
    }
    let k = - (Math.ceil(length / 2) - 1);
    const positions = [];
    for (let i = 0; i < length; i++) {
      positions.push({
        x: currentPosition.x + 250 * k,
        y: currentPosition.y
      })
      k++;
    }
    return positions;
  }

  const connect = (shape1, shape2) => {
    miro.board.createConnector({
      shape: 'elbowed',
      start: {
        item: shape1.id,
      },
      end: {
        item: shape2.id,
      },
    })
  }

  const created = new Map();
  const draw = async (task, currentPosition) => {
    if (created.has(task)) return created.get(task)
    const miroTask = await miro.board.createShape({
      content: task.taskName,
      shape: 'round_rectangle',
      x: currentPosition.x,
      y: currentPosition.y
    })
    created.set(task, miroTask)

    if (task.blockedBy) {
      currentPosition.y += offset;
      const positions = calculatePositions(task.blockedBy.length, currentPosition);
      for (const blockingTask of task.blockedBy) {
        if (!created.has(blockingTask)) {
          await draw(blockingTask, positions.pop())
        }
        connect(miroTask, created.get(blockingTask))
      }
    }
    return miroTask
  }

  async function execute() {
    let x = 0
    let y = 0
    for (const task of tasks) {
      const shape = await draw(task, {x, y});
      x = shape.x;
      y = shape.y + offset;
    }
  }

  execute().then(() => 
    created.clear()
  )
};
