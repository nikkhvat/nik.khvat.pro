# nik19ta.pro

## About the project

Welcome to my personal website! This website was built using React, React-Router, and GitHub Pages. It's a platform where I can showcase my work, skills, and projects to the world.

### Tools

This website uses the following tools and technologies:

- Lang - `TypeScript` / `Golang`
- Framework (front-end) - `NextJs`
- Framework (back-end) - `Gin`
- DataBase - `PostgreSQL`
- ORM - `GORM`
- For multilingual - `i18n`
- For CI/CD - `GitHub Actions (self-hosted ubuntu)`
- Code analysis - `eslint`
- Reverse Proxy / ssl - `Nginx & brotli`

### Links

- Visit [nik19ta.pro](https://nik19ta.pro) to see the live website
- View the [![wiew figma](./README/figma.png)](https://www.figma.com/file/NKcx7nhqQJoVLYecFC9USK/nik19ta.me) for the website layout and design

## How to run

### Local development

To start developing the website locally, follow these steps:

- Get packages `npm i`
- Set .env `cp .env.dev .env`
- Start `npm run dev`

### Setting up Nginx on a server

If you want to host the website on a server using Nginx and SSL, follow these steps:

- Create a new Nginx configuration file using the file at [nginx/sites-available/nik19ta.pro.conf](./nginx/sites-available/nik19ta.pro.conf) as a template.
- Install and configure Nginx and SSL on your server using [these instructions](https://github.com/pepelsbey/playground/tree/main/56).

### backend

To create the necessary database for the backend, run the following SQL query:

```sql
CREATE DATABASE nik19ta
```

A database dump is also included in the `./backend/dumpdump.sql` file.

Thank you for your interest in my website! If you have any questions or feedback, please feel free to contact me.