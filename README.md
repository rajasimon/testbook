# Leadbook

[![Build Status](https://travis-ci.org/rajasimon/testbook.svg?branch=backend)](https://travis-ci.org/rajasimon/testbook)

Leadbook backend created using Python and Django Framework. And the Rest API
powered by Django Rest Framework. 

[![](https://imgur.com/download/TnbNpLt)](https://leadbook-challenge.herokuapp.com/docs/)

## Installation

To install this project user must installed pipenv. It's pypi new package management
tool alternative to pip. You can install pipenv [here](https://pipenv.org).

    pipenv install && pipenv install --dev

Note: Upon command will take care of creating virtualenv and install all the dependencies
which is mentioned in Pipfile.


## Development:

Since this project using pipenv it's good idea to start by activating pipenv and run the
manage command. 

    pipenv run python manage.py migrate
    pipenv run python manage.py runserver

### Database Configuration

One of the advantages of the `pipenv` is we can use `.env` file to configure
environment variables. 

    # .env

    DATABASE_NAME=<DATABASE_NAME>
    DATABASE_USER=<DATABASE_USER>
    DATABASE_PASSWORD=<DATABASE_PASSWORD>

#### Dump Data

    pipenv run python manage.py dumpdata core.Company  -o leadbook/core/fixtures/companies.json


### Management Command

To trigger the activation mail again please use this command.

    pipenv run python manage.py send_activation_mail <username>


## Deployment

Normal django runserver command is not suitable for production environment so 
in Heroku environment this project will use gunicorn to server API request

    gunicorn leadbook.wsgi