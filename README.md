# Instructions

## The structure of the application

This is a Python project managed by Poetry:
- The `evently` directory contains the Django backend app
- The `frontend` directory contains the Next.js frontend app

## Backend

Install poetry dependencies

```bash
poetry config virtualenvs.in-project true --local
poetry install
```

Migrate database (This will create an SQLite file and populate it)

```bash
poetry run python evently/manage.py migrate
```

Create a superuser

```bash
poetry run python evently/manage.py createsuperuser
```

Add some data using Python shell

```
poetry run python evently/manage.py shell

>>> from django.contrib.auth.models import User
>>> u = User.objects.first()
>>> u.id
1
>>> from events.models import Event
>>> e = Event(title="Event", description="Event desc", longitude=0.0, latitude=0.0, location="Casablanca, Morocco", owne
r=u, start_time="2024-12-31T00:12:55.000Z")
>>> e.save()
```

Run the backend server

```bash
poetry run python evently/manage.py runserver
```

## Frontend

Create an `.env` file containing the backend URL

```
API_URL=https://localhost:8000
```

Go to the frontend directory

```bash
cd frontend
```

Install all the dependencies

```bash
# Use the package manager of your choice
pnpm install
```

Run the frontend development server

```bash
pnpm dev
```

The homepage will redirect you to the correct path.

And you are good to go!