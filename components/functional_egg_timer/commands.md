# Functional Egg Timer: SCSS Commands

SCSS is written in `style.scss`.
The browser still reads only `style.css`.

## Check Node and npm

Run from any folder:

```bash
node -v
npm -v
```

## Work From This Component Folder

```bash
cd components/functional_egg_timer
```

## Install Sass Locally For This Component

```bash
npm install -D sass
```

## Check Sass Install

```bash
npm list sass
npx sass --version
```

## Compile SCSS Once

Run from `components/functional_egg_timer`:

```bash
npx sass style.scss style.css
```

Run from project root:

```bash
npx --prefix components/functional_egg_timer sass components/functional_egg_timer/style.scss components/functional_egg_timer/style.css
```

## Watch SCSS Changes

Run from `components/functional_egg_timer`:

```bash
npx sass --watch style.scss:style.css
```

Run from project root:

```bash
npx --prefix components/functional_egg_timer sass --watch components/functional_egg_timer/style.scss:components/functional_egg_timer/style.css
```

Stop watch mode with `Ctrl + C`.

## Working Rule

Edit `style.scss`.
Do not manually edit generated `style.css` after watch mode is active, because Sass rewrites it.
