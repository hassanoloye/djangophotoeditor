## Django Photo Editor
[![Build Status](https://travis-ci.org/andela-hoyeboade/djangophotoeditor.svg?branch=develop)](https://travis-ci.org/andela-hoyeboade/djangophotoeditor) [![Coverage Status](https://coveralls.io/repos/github/andela-hoyeboade/djangophotoeditor/badge.svg?branch=develop)](https://coveralls.io/github/andela-hoyeboade/djangophotoeditor?branch=develop)

### Description
This is a Python Checkpoint4 project for D0B fellows in Andela. It's a Django application designed to manage photos. Users can upload photos, apply filters to them and can share their photos on Facebook

### Features
* Users can login with their Facebook accounts
* Users can upload images
* Users can categorize images by creating folders
* Users can view details of uploaded images
* Users can edit image by applying filters
* Users can share their images on Facebook

### Technology used
  * Django
  * Djangorestframework
  * Django swagger
  * Pillow
  * ReactJS

### API Documentation
The API documentation is available <a href="https://photoedits.herokuapp.com/api/v1/docs">here</a>

## Installation
1. Clone the repo
`git clone https://github.com/andela-hoyeboade/djangophotoeditor.git/` and navigate to the project directory

2. Create and activate a virtual environment e.g `mkvirtualenv venv`

3. Install dependencies
```pip install -r requirements.txt```

4. From the project root directory, run the app
  * Set up the database
      - Create a postgres database using pgadmin or any other possible methods.
      -  navigate to djangophotoeditor/djangophotoeditor/settings/development.py file, then update the database settings to hold your database name, your postgres user, password and any other neccessary information
  * Make migrations.<br>
      - Run `cd djangophotoeditor` and `python manage.py makemigrations` to create the models for the app.
      - After making migrations, run `python manage.py migrate` to create necessary tables in the database.
  * Run `cd djangophotoeditor` and `python manage.py runserver` to get the app running

## Functionality, Endpoints and Accessiblity
  <table>
  <tr>
  <th> Functionality </th>
  <th> Endpoint</th>
  <th> Public Access</th>
  </tr>
  <tr>
  <td>Logs a user in</td>
  <td>POST /auth/login</td>
  <td>True</td>
  </tr>
  <tr>
   <td>Register a user</td>
   <td>POST /auth/register</td>
   <td> True</td>
  </tr>

  <tr>
  <td>Create a new folder </td>
  <td>POST /folder/ </td>
  <td>False</td>
  </tr>

  <tr>
  <td>List all created folders</td>
  <td>GET /folder/ </td>
  <td>False</td>
  </tr>

  <tr>
  <td>Get single folder</td>
  <td>GET /folder/{folder_id} </td>
  <td>False</td>
  </tr>

  <tr>
  <td>Update this folder</td>
  <td>PUT /folder/{folder_id} </td>
  <td>False</td>
  </tr>

  <tr>
  <td>Delete this folder</td>
  <td>DELETE /folder/{folder_id} </td>
  <td>False</td>
  </tr>

  <tr>
  <td>Create new photo without folder</td>
  <td>POST /photo/ </td>
  <td>False</td>
  </tr>

  <tr>
  <td>Create new photo in a folder</td>
  <td>POST /folder/{folder_id}/photos/ </td>
  <td>False</td>
  </tr>

  <tr>
  <td>Get a photo </td>
  <td>GET /photo/{photo_id} </td>
  <td>False</td>
  </tr>

  <tr>
  <td>Update a photo </td>
  <td>PUT /photo/{photo_id} </td>
  <td>False</td>
  </tr>

  <tr>
  <td>Delete this photo</td>
  <td>DELETE /photo/{photo_id}</td>
  <td>False</td>
  </tr>
  </table>

## Usage
The app can be used by visiting the site https://photoedits.herokuapp.com, logging in with your facebook account and making use of the different functionalities provided on the dashboard page

## Running tests
1. Navigate to the project direcory
2. cd into djangophotoeditor and run python manage.py test

## Project Demo
Click <a href='https://www.youtube.com/watch?v=ZXjK-pjJOg8'>here </a> to view the project demo

## References
http://docs.djangoproject.com/ <br />
https://docs.python.org <br />
http://courses.reactjsprogram.com/ <br/>
https://pillow.readthedocs.io/en/3.4.x/ <br/>

## Author
Hassan Oyeboade
