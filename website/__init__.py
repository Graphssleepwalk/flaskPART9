from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager

db = SQLAlchemy()#creating a database object
DB_NAME = "database.db"#setting the database name


def create_app():#this is the function that creates the web app
    app = Flask(__name__)#creating the flask app (the name is the name of the file)
    app.config['SECRET_KEY'] = 'uoiuu uiu'#setting the secret key for the app
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'#setting the database URI for the app(the database is a sqlite database)
    db.init_app(app)#initializing the database

    from .views import views #this is the views.py file that we created
    from .auth import auth #this is the auth.py file that we created

    #registering the blueprints for the views and auth files
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User, Note #this is the models.py file that we created
    
    #creating the database if it does not exist
    with app.app_context():
        db.create_all()
    
    login_manager = LoginManager() #creating a login manager object(used for logging in and out)
    login_manager.login_view = 'auth.login' #setting the login view to the login page
    login_manager.init_app(app) #initializing the login manager(this is to be able to use the login manager in the app)

    
    @login_manager.user_loader #this is a decorator for the user loader
    def load_user(id):#this is the function for the user loader
        return User.query.get(int(id))#this returns the user with the id that is passed to the function

    return app


def create_database(app):#this is the function that creates the database
    if not path.exists('website/' + DB_NAME):#if the database does not exist
        db.create_all(app=app)#create the database
        print('Created Database!')#print that the database has been created