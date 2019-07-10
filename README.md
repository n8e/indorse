# indorse

## Cloning the project
Clone the project

```
git clone git@github.com:n8e/indorse.git
cd indorse
```

## Environment variables
Create environment variables within the API:
```
cd api
touch .env
```

The `.env` file needs to contain variables for the `MAILER_ADDRESS` and `MAILER_PASSWORD`. These are the credentials used in the nodemailer that sends an email as a new user registers.

_.env_
```
MAILER_ADDRESS='xxx@gmail.com'
MAILER_PASSWORD='xxxxx'
```

## Running the project
At the root of the project is a `docker-compose.yml` file. Run
```
docker-compose up --build
```

See project on http://localhost:3000. Note that the API is on port 8080

## Screenshots
#### Tabs to choose whether to signup or login
<img width="800" alt="Screenshot 2019-07-09 at 18 45 28" src="https://user-images.githubusercontent.com/12892047/60903311-be5cb500-a279-11e9-8250-ff28652bf1aa.png">

#### Login tab
<img width="800" alt="Screenshot 2019-07-09 at 18 45 44" src="https://user-images.githubusercontent.com/12892047/60903322-c3216900-a279-11e9-8c4a-ae6ed208efbb.png">

#### Signup tab
<img width="800" alt="Screenshot 2019-07-09 at 18 45 57" src="https://user-images.githubusercontent.com/12892047/60903564-4216a180-a27a-11e9-84fc-f764ce99a3be.png">
