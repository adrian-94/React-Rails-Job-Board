# Rails + React Job board

Allows users to create jobs, apply to jobs and manage their applications. 

Clone the repo

API:

```
bundle install
bundle exec rake db:create db:migrate db:seed
bundle exec rails s
```

client:

```
cd client
yarn install
yarn start
```

# HomePage

- Lists the current jobs from the api
- Has a link to view the job
- Does not require the user to be logged in
- Lists open jobs

# Applications

- List the current applications for the logged in user
- Requires the user to be logged in
- allow the user to update their status
- allow the user to change job application status

# Job
- allow the user to apply for the job
- tell the user if they have applied previously
- allow anyone to update the status ( can close, open or draft the job). 

