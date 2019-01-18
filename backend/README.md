# Leadbook

Leadbook backend created using Python and Django Framework. And the Rest API
powered by Django Rest Framework. 

## Installation

To install this project user must installed pipenv. It's pypi new package management
tool alternative to pip. You can install pipenv [here](https://pipenv.org).

    pipenv install && pipenv install --dev

Note: Upon command will take care of creating virtualenv and install all the dependencies
which is mentioned in Pipfile.


## How to run:

Since this project using pipenv it's good idea to start by activating pipenv and run the
manage command. 

    pipenv run python manage.py migrate
    pipenv run python manage.py runserver

### Database Configuration

This project uses PostgreSQL and the configuration can be done by providing environment variables. 

#### Dump data
pipenv run python manage.py dumpdata core.Company  -o leadbook/core/fixtures/companies.json