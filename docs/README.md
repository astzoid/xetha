# Repository Documentation

| Codebase           |      Description      |
| :----------------- | :-------------------: |
| [athena](athena)   |  React App Frontend   |
| [cathy](cathy)     |    Express Backend    |
| [jazaira](jazaira) |    Branding Assets    |
| [shared](shared)   |   Shared Libraries    |
| [trisha](trisha)   | Linux Scripts/Configs |
| [xanatha](xanatha) |       Xetha Bot       |

---
## Code of Conduct

See [Code of Conduct](code_of_conduct).

## Contributing

See [Contributing](contributing) for contributing guide and local development guide.

## Security

See [Security](security) for reporting security issues.

## Discord Servers

- Official Discord: https://discord.gg/9RNzzMpkgq
- Development Discord: https://discord.gg/YeJs5w7XAH (Private)

---
## Notes

- Follow [Code of Conduct](code_of_conduct) and [Contributing](contributing) guide.
- Follow [Commit Convention](commit_convention). So we can have consistency to generate our changelogs. 
- No `--force` pushes. (Unless it's very reasonable).
- For security issues. See [Security](security)

Before you make a PR/Changes on:
- [shared libraries](shared), make an issue first pertaining about it and then make the PR.
- [athena](athena), [cathy](cathy) or [xanatha](xanatha), make sure that the code is linted and formatted by ESLint.
- [workflows](workflows), contact the owner first before making a change. and make sure it is formatted by [YAML](yaml) VSCode Extension.
- [cathy](cathy), make sure the code can run on multiple instances so we can scale infinitely. The use of cache is forbidden (unless it's very reasonable).
- [xanatha](xanatha), make sure everything is shard compliant and following OOP (Object Oriented Programming) Paradigms.
- Markdown files / `*.md`. make sure it is formatted by [Markdown All In One](markdown) VSCode Extension. And Markdown links should be in markdown variables Eg. `[name]: link` at the end of the file, and using it as `[Name](name)` anywhere else.
- [jazaira](jazaira), make an issue first pertaining about it.
- [trisha](trisha), contact the owner first before making some changes to it.

CI (Continous Integration) Workflow:
- If you want to skip CI tests add `[skip test]` to the commit message.
- Do not add `[skip ci]` to the commit messages or the PR/Changes won't be merge to the main branch. This is to enforce Commit Linting and Code Linting by running a workflow.

---
[code_of_conduct]: CODE_OF_CONDUCT.md
[contributing]: CONTRIBUTING.md
[security]: SECURITY.md

[athena]: ../athena
[cathy]: ../cathy
[jazaira]: ../jazaira
[shared]: ../shared
[trisha]: ../trisha
[xanatha]: ../xanatha
[workflows]: ../.github/workflows

[commit_convention]: https://www.conventionalcommits.org/en/v1.0.0/

[shell-format]: https://marketplace.visualstudio.com/items?itemName=foxundermoon.shell-format
[markdown]: https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one
[yaml]: https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml