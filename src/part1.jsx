import '../src/assets/style.css';

export const drawTasks = () => {

  // Offset can be different depending on the item size
  const offset = 150

  const connect = (shape1, shape2) => {
    // Try experimenting with different styles!
    // See documentation at https://developers.miro.com/docs/websdk-reference-connector
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
    // Try experimenting with different styles and shape types!
    // See documentation at https://developers.miro.com/docs/websdk-reference-shape
    // You can also change the size, and even the itemn type. Don't forget to update the offsets.
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
