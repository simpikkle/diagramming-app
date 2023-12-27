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

  const draw = async (task, currentPosition) => {
    const miroTask = await miro.board.createShape({
      content: task.taskName,
      shape: 'round_rectangle',
      x: currentPosition.x,
      y: currentPosition.y
    })
    return miroTask
  }

  async function execute() {
    let x = 0
    let y = 0
    console.log(tasks);
    for (const task of tasks) {
      console.log(task);
      const shape = await draw(task, {x, y});
      x = shape.x + offset;
      y = shape.y;
      console.log("next");
    }
  }

  execute()
};
