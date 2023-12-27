import '../src/assets/style.css';
import payload from "./tasks.json";

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
    return payload.tasks;
  }

  function calculatePositions(length, currentPosition) {
    if (length === 1) {
      return [currentPosition];
    }
    const positions = [];
    let x = currentPosition.x
    for (let i = 0; i < length; i++) {
      positions.push({
        x: x,
        y: currentPosition.y
      })
      x += offset
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
    if (created.has(task)) return
    const miroTask = await miro.board.createShape({
      content: task.taskName,
      shape: 'round_rectangle',
      x: currentPosition.x,
      y: currentPosition.y
    })
    created.set(task, miroTask)

    if (task.blockedBy) {
      currentPosition.y += 150;
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
