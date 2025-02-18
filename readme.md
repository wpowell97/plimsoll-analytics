# Plimsoll Report Website

Bootstrap website for showcasing customer report data. This website has a light, business-like design.

<img src="/images/website-screenshot.png"  />

## Features

- Modern layout with custom colours/styles/backgrounds
- Responsive design
- Sticky navbar with style changes on scroll
- Jump to top button
- Report Data
- Findings Information
- Simplified Action Objectives
- Contact Page

## Usage

This website is built with [Bootstrap](https://getbootstrap.com/) and [Sass](https://sass-lang.com/). It uses [Font Awesome](https://fontawesome.com/) for icons.

In order to customise this website, you need to install [Node.js](https://nodejs.org/en/). Then, clone this repository and run:

```bash
npm install
```

This will install Bootstrap, Sass and Font Awesome. To build your CSS files from Sass, run:

```bash
npm run sass:build
```

To watch your Sass files for changes, run:

```bash
npm run sass:watch
```

You can add Bootstrap variables to the `bootstrap.scss` file. You can look at the file `node_modules/bootstrap/dist/scss/_variables.scss` for a list of all the variables. Do NOT edit the `variables.scss` file directly, as it will be overwritten when you update Bootstrap.

To add your own custom styles, use the `styles.scss` file.
