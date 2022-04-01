# -------
# backend
# -------
npm install

# create .env with and complete has you want 

MY_SECRET_TOKEN = " "
DATA_BASE = " "
DATA_BASE_USER = " "
DATA_BASE_HOST = " "
DATA_BASE_DIALECT = " "

# create database

sequelize db:migrate

# start server

nodemon server

# -------
# vue_frontend
# -------

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
