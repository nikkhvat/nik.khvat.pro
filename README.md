# nik19ta.pro

## About the project

My personal website - built with React, React-Router, and GitHub Pages.

### Tools

- Lang - `TypeScript` / `Golang`
- Framework (front-end) - `NextJs`
- Framework (back-end) - `Gin`
- DataBase - `PostgreSQL`
- ORM - `GORM`
- For multilingual - `i18n`
- For CI/CD - `GitHub Actions (self-hosted ubuntu)`
- Code analysis - `eslint`
- Reverse Proxy / ssl - `Nginx & brotli`

<br />

- You can wiew [nik19ta.pro](https://nik19ta.pro)
- You can wiew figma (image - link)

[![wiew figma](./README/figma.png)](https://www.figma.com/file/NKcx7nhqQJoVLYecFC9USK/nik19ta.me)

## How to run

### Start for local development

- Get packages `npm i`
- Set .env `cp .env.dev .env`
- Start `npm run dev`

<br />

### SetUp Nginx on Server

- [Nginx config](./nginx/sites-available/nik19ta.pro.conf)
- [Install and setting nginx / ssl](https://github.com/pepelsbey/playground/tree/main/56)

### backend

- create database

```sql
CREATE DATABASE nik19ta
```
> dump in `./backend/dumpdump.sql`
