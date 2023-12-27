import '../src/assets/style.css';

export const drawTasks = () => {

  const offset = 150

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

  async function execute() {
    const shape1 = await miro.board.createShape({
      content: "Create a shape",
      shape: 'round_rectangle',
      x: 0,
      y: 0
    })
    const shape2 = await miro.board.createShape({
      content: "Create Miro app",
      shape: 'round_rectangle',
      x: offset,
      y: 0
    })
    connect(shape1, shape2)
  }

  execute();
};
