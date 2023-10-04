from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify, abort, Response, session, make_response, json
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db   ##means from __init__.py import db
from flask_login import login_user, login_required, logout_user, current_user


auth = Blueprint('auth', __name__) #creating a blueprint for the auth.py file


@auth.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        login_user(user, remember=True)
        return jsonify({'success': True})
    else:
        abort(401, 'Invalid credentials')


@auth.route('/logout')#this is the route for the logout page
@login_required#this means that the user must be logged in to access this page
def logout():#this is the function for the logout page
    logout_user()#logout the user
    return redirect(url_for('auth.login'))#redirect the user to the login page


@auth.route('/sign-up', methods=['POST'])
def sign_up():
    email = request.json['email']
    first_name = request.json['firstName']
    password = request.json['password']

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'success': False, 'message': 'Email already exists'})
    else:
        new_user = User(email=email, first_name=first_name, password=generate_password_hash(
            password, method='pbkdf2:sha256'))
        db.session.add(new_user)
        db.session.commit()
        login_user(new_user, remember=True)
        return jsonify({'success': True})


