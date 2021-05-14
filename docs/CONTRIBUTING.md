# Contributing

## Code of Conduct

See [Code of Conduct](CODE_OF_CONDUCT.md)

## Security Issues

See [Security](SECURITY.md)

## Contributing to the code

**The issue tracker is only for issue reporting or proposals/suggestions. If you have a question, you can ask the team in our [Discord Server][discord server]**.

To contribute to this repository, feel free to create a new fork of the repository and
submit a pull request.

### Commit Guidelines

- Follow the [Commit Convention][commit convention].

### Xetha Project Concept Guidelines

There are a number of guidelines considered when reviewing Pull Requests to be merged. _This is by no means an exhaustive list, but here are some things to consider before/while submitting your ideas._

- Don't let that stop you if you've got a good concept though, as your idea still might be a great addition.
- Everything should be shard compliant. If code you put in a pull request would break when sharding, break other things from supporting sharding, or is incompatible with sharding; then you will need to think of a way to make it work with sharding in mind before the pull request will be accepted and merged.
- Everything should follow [OOP paradigms][oop paradigms] and generally rely on behaviour over state where possible. This generally helps methods be predictable, keeps the codebase simple and understandable, reduces code duplication through abstraction, and leads to efficiency and therefore scalability.

### Local Development

#### Environment Requirements
- Node.js v14+
- Git, Git Bash
- Yarn
- MongoDB (Local or you can use Atlas if you don't want to download MongoDB)
- Visual Studio Code
  - [ESLint](eslint) for code linting and formatting.
  - [Markdown All in One](markdown) for writing `*.md` (Markdowns)
  - [shell-format](shell-format) for writings scripts, `*.yml` etc.

#### Setting Development Environment

First play:
```sh
# Clone the repository, this might take a while.
$ git clone https://github.com/oadpoaw/xetha.git
$ cd xetha

# Install dependencies. This takes few seconds at most.
$ yarn install

# Setting up husky for git hooks
$ yarn prepare
```

#### Athena

Starting
```sh
# to start react dev server with HMR (Hot Module Reload)
$ yarn start:athena
```

#### Cathy

Create `.env` inside [cathy](../cathy)
```env
CLIENT_ID=
CLIENT_SECRET=
MONGODB_URI=
CALLBACK_URL=http://localhost:3000/api/redirect
DASHBOARD_URL=http://localhost:3000
```
And fill in the blanks.

Building
```sh
$ yarn build:cathy
```

Starting
```sh
$ yarn start:cathy
```

#### Xanatha

Create `.env` inside [xanatha](../xanatha)
```env
CLIENT_ID=
CLIENT_SECRET=
DISCORD_TOKEN=
MONGODB_URI=
```
and fill in the blanks.

Building
```sh
$ yarn build:xanatha
```

Starting
```sh
$ yarn start:xanatha
```

#### Adding dependencies
```sh
yarn workspace <athena|cathy|xanatha> add [-D] [...deps]
```

#### The Shared Library
This contain packages that is used through out the project

If you made some changes to a shared library, make sure run the following:
```sh
yarn bootstrap
# To build the shared library and to symlink the shared library so it can be used throughout the project
```

#### Formatting and Linting
We use ESLint for linting and Prettier for linting.

Formatting:
```sh
yarn format:athena # for athena workspace
yarn format:cathy # for cathy workspace
yarn format:shared # for the shared library
yarn format:xanatha # for xanatha workspace
```

Linting:
```sh
yarn lint:athena # for athena workspace
yarn lint:cathy # for cathy workspace
yarn lint:shared # for the shared library
yarn lint:xanatha # for xanatha workspace
```

#### Troubleshooting
If things didn't go well with the modules (node_modules)

You can try by cleaning the `.cache` folder
```sh
yarn clean:<workspace>
```
Replace `<workspace>` with `athena`, `cathy`, `xanatha` or `shared` 

[vscode]: https://code.visualstudio.com
[commit convention]: https://www.conventionalcommits.org/en/v1.0.0/
[eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[markdown]: https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
[shell-format]: https://marketplace.visualstudio.com/items?itemName=foxundermoon.shell-format
[discord server]: https://discord.gg/YeJs5w7XAH
[node.js]: https://nodejs.org/en/download/
[here]: https://github.com/xetha-bot/xetha/pulls
[oop paradigms]: https://en.wikipedia.org/wiki/Object-oriented_programming
