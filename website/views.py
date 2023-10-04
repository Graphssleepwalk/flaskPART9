from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from .models import Note
from . import db
import json

views = Blueprint('views', __name__)#creating a blueprint for the views.py that is imported in the __init__.py file


@views.route('/', methods=['GET', 'POST'])#this is the route for the home page
@login_required#this means that the user must be logged in to access this page
def home():#this is the function for the home page 
    if request.method == 'POST':#if the request is a POST request (which means that the user has submitted a note) 
        note = request.form.get('note')#Gets the note from the HTML form 

        if len(note) < 1:#if the note is less than 1 character
            flash('Note is too short!', category='error') #flash a message that it is too short
        else:#if the note is not too short
            new_note = Note(data=note, user_id=current_user.id) #create a new not and set that to the current user
            db.session.add(new_note) #adding the note to the database 
            db.session.commit()#committing the changes to the database
            flash('Note added!', category='success')#flash a message that the note has been added

    return render_template("home.html", user=current_user)#render the home page and pass the current user to the HTML file


@views.route('/delete-note', methods=['POST'])#this is the route for the delete note page
def delete_note():  # this is the function for the delete note page
    note = json.loads(request.data) # this function expects a JSON from the INDEX.js file 
    noteId = note['noteId']#get the note ID from the JSON
    note = Note.query.get(noteId)  # query the database for the note with the note ID 
    if note:#if query returns a note
        if note.user_id == current_user.id: #if the note belongs to the current user
            db.session.delete(note)#delete the note from the database
            db.session.commit()#commit the changes to the database

    return jsonify({})#return a JSON  