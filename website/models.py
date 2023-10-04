from . import db#this is the database that we created in the __init__.py file
from flask_login import UserMixin
from sqlalchemy.sql import func


class Note(db.Model):#this is the class for the note
    id = db.Column(db.Integer, primary_key=True)#this is the id for the note
    data = db.Column(db.String(10000))#this is the data for the note
    date = db.Column(db.DateTime(timezone=True), default=func.now())#this is the date for the note
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))#this is the user id for the note(we are using foreign key to connect the user and the note)


class User(db.Model, UserMixin):#this is the class for the user
    id = db.Column(db.Integer, primary_key=True)#this is the id for the user
    email = db.Column(db.String(150), unique=True)#this is the email for the user
    password = db.Column(db.String(150))#this is the password for the user
    first_name = db.Column(db.String(150))#this is the first name for the user
    notes = db.relationship('Note')#this is the relationship between the user an the note(which is a one to many relationship)