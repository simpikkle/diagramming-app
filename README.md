# Building diagrams on a Miro board

## About

This repository is a code source for the video on the Miro Developer Platform channel. It shows one of the many ways to build diagrams on a Miro board.
In this example, we're taking a list of tasks from the json file and displaying the dependencies between them on the Miro board.

## Watch the Video Tutorial

Watch the video below to learn how to build diagrams on a Miro board programmatically, using Miro's WebSDK.

There are 3 parts in the video with a corresponding 3 files in the repository:

1. In [part 1](https://github.com/simpikkle/diagramming-app/blob/main/src/part1.jsx) we create two shapes and connect them to each other
2. In [part 2](https://github.com/simpikkle/diagramming-app/blob/main/src/part2.jsx) we load the tasks from the json file, calculate positions for them on the Miro board, and build a simple diagram
3. In [part 3](https://github.com/simpikkle/diagramming-app/blob/main/src/part3.jsx) we go a step further and sort the tasks before displaying them on the board. We also use more complex json with tasks.

[![Build a Diagramming App with Miros WebSDK](https://img.youtube.com/vi/hBLbEVIJL6Y/0.jpg)](https://youtu.be/hBLbEVIJL6Y)

The app will produce a diagram similar to the one below.

<img width="972" alt="image" src="https://github.com/simpikkle/diagramming-app/assets/17803164/a3d68908-77f1-4406-b954-c158a9372df6">

## App details

### How to start locally

- Run `npm i` to install dependencies.
- Run `npm start` to start developing. \
  Your URL should be similar to this example:

```
http://localhost:3000
```

- Paste the URL under **App URL** in your
  [app settings](https://developers.miro.com/docs/build-your-first-hello-world-app#step-3-configure-your-app-in-miro).
- Open a board; you should see your app in the app toolbar or in the **Apps**
  panel.

### How to build the app

- Run `npm run build`. \
  This generates a static output inside [`dist/`](./dist), which you can host on a static hosting
  service.

### Folder structure

<!-- The following tree structure is just an example -->

```
.
├── src
│  ├── assets
│  │  └── style.css
│  ├── app.jsx      // The code for the app lives here
│  └── index.js    // The code for the app entry point lives here
├── app.html       // The app itself. It's loaded on the board inside the 'appContainer'
└── index.html     // The app entry point. This is what you specify in the 'App URL' box in the Miro app settings
```
