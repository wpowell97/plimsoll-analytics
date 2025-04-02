# Plimsoll Report Website

A responsive marketing and reporting website built with **Bootstrap 5** and **Sass**, designed to showcase company and industry-specific data. The design features a clean, business-oriented UI with mobile-friendly navigation, smooth scroll effects, and modular components.

🔗 [Live Demo](https://plimsoll-analytics.vercel.app/)  

<img src="/images/portfolio-screen.png" alt="Plimsoll Report Website preview" />

---

## 🚀 Features

- **Fully responsive layout** using Bootstrap 5
- **Clean, modern design** with custom backgrounds and colors
- **Sidebar navigation** for desktop with modal buttons
- **Burger menu** with modals for mobile and tablets
- **Animated hero section** with scroll-in text
- **Section-based scrollspy highlighting**
- **Jump-to-top button**
- **Content sections**:
  - Company overview
  - Featured industry reports
  - Our services
  - Getting started guide
  - Purchase options
  - FAQ accordion
- **Styled footer** with social media icons

---

## 🛠️ Tech Stack

- [Bootstrap 5](https://getbootstrap.com/)
- [Sass](https://sass-lang.com/)
- [Font Awesome](https://fontawesome.com/)
- HTML5, CSS3, JavaScript

---

## 📦 Usage

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
