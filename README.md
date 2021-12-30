# Websocket Communications with Node and Angular

This is the repository for the LinkedIn Learning course `Websocket Communications with Node and Angular`. The full
course is available from [LinkedIn Learning][lil-course-url].

_See the readme file in the main branch for updated instructions and information._

## Instructions

The course was coded on the `main` branch of the repository. The branch has tags coinciding with each video. The tags
are named following the `CHAPTER#_MOVIE#` pattern. For instance, to see the state of the application at the beginning of
Chapter 1, Movie 3, you would need to branch out from tag `01_03` with `git checkout b {{NEW_BRANCH_NAME}} 01_03`

On Github, you can use the tag pop up menu to switch to a specific tag and navigate the course files at that stage, or
go directly to `https://github.com/LinkedInLearning/websocket-comms-with-node-and-angular-2825709/tree/{{TAG_NAME}}`.

## Branches and Tags

The course was coded on the `main` branch of the repository. The branch has tags coinciding with each video. The tags
are named following the `CHAPTER#_MOVIE#` pattern. For instance, to see the state of the application at the beginning of
Chapter 1, Movie 3, you would need to branch out from tag `01_03` with `git checkout b {{NEW_BRANCH_NAME}} 01_03`

On Github, you can use the tag pop up menu to switch to a specific tag and view the course files at that stage, or go
directly to `https://github.com/LinkedInLearning/websocket-comms-with-node-and-angular-2825709/tree/{{TAG_NAME}}`.

When branching from a tag after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:

    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"

## Installing

1. To code along with the instructor, you must have:

- NodeJS installed; the course was developed with node v16.4.0. Run `node -v` to see your version
- NPM installed; the course was developed with npm v8.3.0. Run `npm -v` to see your version

2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. Run `npm install` to get all dependencies installed

[lil-course-url]: https://www.linkedin.com/learning/

[lil-thumbnail-url]: http://

## Working with a Monorepo

The Chat product we're building is a monorepo made up of 3 distinct packages:

1. [The Shared Library](./packages/types) exposes interfaces that are used by both the front and backend
2. [The Websocket Server](./packages/server) is the backend in charge of managing websocket connections and relaying
   chat messages
3. [The Angular Web Application](./packages/webapp) is the Chat application UI

The Monorepo is managed using the [Nx build system](https://nx.dev/) to greatly simplify setup. Here are the commands
used to scaffold each package (we'll go through them during the course):

### Creating the Shared Library

```bash
npx nx generate @nrwl/workspace:library types
```

### Creating the Websocket Server

```bash
npx nx generate @nrwl/node:app server
```

### Creating the Angular Web Application

```bash
npx nx generate @nrwl/angular:app webapp --backendProject server --strict false --style scss --routing false
```

### Adding Angular Material

```bash
npx nx generate @angular/material:ng-add --project=webapp --typography false --theme indigo-pink --animations true
```

After install, add the Angular material theming CSS file of your choice to the styles array
of [project.json](./packages/webapp/project.json). For example:
> "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"

Options are `indigo-pink.css`, `deeppurple-amber.css`, `pink-bluegrey.css` and `purple-green.css`

## Tools Used to build this application

### WS Library

https://github.com/websockets/ws

### nx Build system

https://nx.dev/

### Angular Frontend Framework

https://angular.io/docs

### Angular Material UI Library

https://material.angular.io/

### rxjs webSocket

https://rxjs.dev/api/webSocket/webSocket

### Advanced Websocket Client (Chrome/Brave extension)

https://chrome.google.com/webstore/detail/advanced-websocket-client/lgimpnfdefcpkicbflpmainbcdnlblej

### The Websocket Weasel (Firefox extension)

https://addons.mozilla.org/en-US/firefox/addon/websocket-weasel/
