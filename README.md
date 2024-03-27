## Checking out

### Windows
Microsoft `git` (the one you install using `winget`) will automatically add carriage returns to each line. The linter will have a fit if this happens. To avoid this run the following commands prior to cloning the repo

```
git config --global core.eol lf
git config --global core.autocrlf input
```

If you have already cloned the repo and have encountered the problem with the linter, run the above commands, then run the below (note: local changes will be destroyed).

```
git rm -rf --cached .
git reset --hard HEAD
```

## Installing

```
npm install
```

## Running

```
npm run dev
```

The linter will run prior to starting, which can be slow and will exit if there are linting errors

## Developing

### IDE

#### VSCode

##### Extensions
These extensions will make your life easier

Recommended
* vscode-styled-components
You might need to switch to the workspace version of Typescript for this to pay attention to local customizations (specifically not complaining about `label` attributes). You can do this by, opening any file with a `.ts` extension, typing `Ctrl+Shift+P` in VSCode then typing in `TypeScript: Select TypeScript Version`, then selecting the Workspace Version.
* ESLint (already configured in .vscode/settings.json)

Optional (but still recommended)
* Code Spell Checker
* GitHub Copilot
