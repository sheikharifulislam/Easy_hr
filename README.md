# [Easy HR](https://stalwart-licorice-5b26e6.netlify.app/)

## Overview

This is simple employee management service. admin can add a single employee or multiple employees from the CSV file in the database.also, admin can select one or multiple employees to send emails and send the same email to the selected all employee.

## API Reference

#### Get all employees

```http
  GET /employees
```

| Query Parameter | Type     | Description                       |
| :-------------- | :------- | :-------------------------------- |
| `page`          | `string` | **Required**. Current page number |

#### Add Employee

```http
  Post /employees
```

| Body        | Type     | Description                                      |
| :---------- | :------- | :----------------------------------------------- |
| `firstName` | `string` | **Required**. Employee first name (min length 3) |
| `LastName`  | `string` | **Required**. Employee last name (min length 3)  |
| `email`     | `string` | **Required**. Employee valid email address       |

#### Add Multiple Employee from csv

```http
  Post /employees/upload-csv
```

#### CSV file must contain below parameters (if any column contains invalid data then system automatically remove this column . and if csv file contains more then 3 columns then the system removes the extra column)

| Col Name    | Type     | Description                                      |
| :---------- | :------- | :----------------------------------------------- |
| `firstName` | `string` | **Required**. Employee first name (min length 3) |
| `LastName`  | `string` | **Required**. Employee last name (min length 3)  |
| `email`     | `string` | **Required**. Employee valid email address       |

#### send email

```http
  Post /email
```

| Body        | Type       | Description                                |
| :---------- | :--------- | :----------------------------------------- |
| `subject`   | `string`   | **Required**. Email Subject (min length 3) |
| `body`      | `string`   | **Required**. Email body (min length 50)   |
| `receivers` | `[string]` | **Required**. Array of valid email address |

## How to run

Please follow the below instructions to run this project in your computer:

1. Clone this repository

```sh
git clone https://github.com/sheikharifulislam/Easy_hr.git
```

2. Go to the cloned project directory

```sh
cd Easy_hr
```

### For client directory

1. Go to the client project directory

```sh
cd ./client
```

2. install necessary dependencies

```sh
npm install
```

3. Build the project

```sh
npm run build
```

4. Locally run the server

```sh
npm run dev
```

### For Server directory

1. Go to the server project directory

```sh
cd ./server
```

2. install necessary dependencies

```sh
npm install
```

3. Locally run the server

```sh
npm run server
```

**Note: for successfully run the project on you computer insure have node, npm, and git on your computer and add all evn variable properly (Flow the .env.example file).**
