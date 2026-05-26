# To-Do List 1: Sass Commands

Sass is installed locally inside this component.

The source file is `style.scss`.
The browser still reads only `style.css`.

## The Main Trap

`npm install -D sass` installs the Sass compiler.
It does not create `style.scss`.

So the order is:

1. Create `style.scss`.
2. Install Sass.
3. Compile `style.scss` into `style.css`.

In this component `style.scss` already exists.

## Check Node and npm

Run from any folder:

```bash
node -v
npm -v
```

## Work From This Component Folder

From the project root:

```bash
cd components/to-do-list_1
```

Check that you are in the correct folder:

```bash
pwd
```

The path should end with:

```bash
components/to-do-list_1
```

All commands below assume the terminal is already inside `components/to-do-list_1`.

## Install Sass Locally For This Component

Run this only if `node_modules` or `package-lock.json` are missing:

```bash
npm install -D sass
```

This command installs Sass, but does not create Sass files.

## Check Sass Install

```bash
npm list sass
npx sass --version
```

## Compile Sass Once

Use the project script:

```bash
npm run sass
```

This script runs:

```bash
sass --no-source-map style.scss style.css
```

Meaning:

- read `style.scss`;
- generate `style.css`;
- do not generate `style.css.map`.

## Watch Sass Changes

```bash
npm run sass:watch
```

This script runs:

```bash
sass --watch --no-source-map style.scss:style.css
```

Meaning:

- keep watching `style.scss`;
- rewrite `style.css` after every save;
- stop watch mode with `Ctrl + C`.

## Run From Project Root Without cd

If your terminal is in the project root and you do not want to `cd`, use:

```bash
npm --prefix components/to-do-list_1 run sass
```

For watch mode:

```bash
npm --prefix components/to-do-list_1 run sass:watch
```

## Common Errors

If you see:

```bash
Error reading style.scss
```

then Sass cannot find `style.scss` in the current folder.

Fix:

```bash
pwd
```

Then make sure you are inside:

```bash
components/to-do-list_1
```

If `style.scss` does not exist, create it first.

## Working Rule

Edit `style.scss`.
Do not manually edit generated `style.css` after watch mode is active, because Sass rewrites it.
