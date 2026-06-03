import sqlite3
# import hashlib
from flask import Flask, jsonify, render_template, redirect, request, session
from flask_session import Session
from flask_cors import CORS # Required for handling Cross-Origin Resource Sharing
# from flask_login import current_user, login_required
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from datetime import timedelta
import json


load_dotenv()

app = Flask(__name__)
CORS(app) # Enable CORS for all routes, adjust as needed for production

# client = Sent()

# app.config["SESSION_PERMANENT"] = False
# app.config["SESSION_TYPE"] = "filesystem"
# Session(app)
app.secret_key = "lawrence"
app.permanent_session_lifetime = timedelta(days=1)

userdb = "userdata.db"

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


# update userdata set admin = 1 where phonenumber = 8042477800;
# update userdata set profileimage = 'static/images/testpic1.jpg' where id = 1;
# delete from userdata where password = '@Lawrence96' or password = 'test';
# select * from userdata;

try:
    connection = sqlite3.connect(userdb)
    print(f"Database '{userdb}' created and connected successfully.")

    cursor = connection.cursor()
    cursor.execute("CREATE TABLE IF NOT EXISTS userdata (id INTEGER PRIMARY KEY, fullname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE, phonenumber INTEGER NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, profileimage VARCHAR(255) NOT NULL DEFAULT 'static/images/defaultprofilepicture.png', membership VARCHAR(255) NOT NULL DEFAULT 'Not Subscribed', address VARCHAR(255) NOT NULL DEFAULT 'No Address', purchases TEXT NOT NULL DEFAULT 'No Purchases', notifications TEXT DEFAULT 'Welcome to Faithfully Lashed!\nPrepare for relaxing at-home visits by updating your address in the profile section of your account''s dashboard!--end--', registration TEXT NOT NULL DEFAULT (CURRENT_TIMESTAMP || ' UTC'), admin INTEGER DEFAULT 0)")
    print("Table 'userdata' created successfully (if it didn't exist).")
    # (DATETIME('now', 'localtime')
    # UTC - 5hrs = CST

    connection.commit()
    connection.close()
    print("Connection closed.")


except sqlite3.OperationalError as e:
    print(f"Failed to create/open database: {e}")



def get_database_data():
    # Connect to the database file (e.g., 'your_database.db')
    connection = sqlite3.connect(userdb)
    # Use a Row factory for easier column access (e.g., row['column_name'])
    # conn.row_factory = sqlite3.Row
    cursor = connection.cursor()

    # Execute an SQL SELECT query
    cursor.execute("SELECT * FROM userdata")

    # Fetch all the results
    results = cursor.fetchall()

    # Close the connection
    connection.close()

    formatted_users = []

    for result in results:
        id = result[0]
        fullname = result[1]
        email = result[2]
        phonenumber = result[3]
        password = result[4]
        profileimage = result[5]
        membership = result[6]
        address = result[7]
        purchases = result[8]
        notifications = result[9]
        registration = result[10]
        admin = result[11]

        formatted_userdata = {"id": id, "fullname": fullname, "email": email, "phonenumber": phonenumber, "password": password, "profileimage": profileimage, "membership": membership, "address": address, "purchases": purchases, "notifications": notifications, "registration": registration, "admin": admin}

        formatted_users.append(formatted_userdata)

    return formatted_users



# Mock database of products
# SERVICES = {
#     '1': {'name': 'Classic Full Set', 'time': 2, 'price': 100, 'note': None},
#     '2': {'name': 'Hybrid Full Set', 'time': 2, 'price': 125, 'note': None},
#     '3': {'name': 'Volume Full Set', 'time': 2, 'price': 135, 'note': None},
#     '4': {'name': 'Mega Volume Full Set', 'time': 2, 'price': 150, 'note': None},
#     '5': {'name': 'Lash Lift & Tint', 'time': 1, 'price': 85, 'note': "15% Off"}
# }

# SERVICES = {
#     '1': {'id': 1, 'name': 'Classic Full Set', 'time': 2, 'price': 100, 'note': None},
#     '2': {'id': 2, 'name': 'Hybrid Full Set', 'time': 2, 'price': 125, 'note': None},
#     '3': {'id': 3, 'name': 'Volume Full Set', 'time': 2, 'price': 135, 'note': None},
#     '4': {'id': 4, 'name': 'Mega Volume Full Set', 'time': 2, 'price': 150, 'note': None},
#     '5': {'id': 5, 'name': 'Lash Lift & Tint', 'time': 1, 'price': 85, 'note': "15% Off"}
# }

# SERVICES = {
#     '1': {'id': 1, 'name': 'Classic Full Set', 'time': 2, 'price': 100, 'note':''},
#     '2': {'id': 2, 'name': 'Hybrid Full Set', 'time': 2, 'price': 125, 'note':''},
#     '3': {'id': 3, 'name': 'Volume Full Set', 'time': 2, 'price': 135, 'note':''},
#     '4': {'id': 4, 'name': 'Mega Volume Full Set', 'time': 2, 'price': 150, 'note':''},
#     '5': {'id': 5, 'name': 'Lash Lift & Tint', 'time': 1, 'price': 85, 'note': "(15% Off)"}
# }


SERVICES = [
    {'id': 0, 'name': 'Classic Full Set', 'time': 2, 'price': 100, 'note':''},
    {'id': 1, 'name': 'Hybrid Full Set', 'time': 2, 'price': 125, 'note':''},
    {'id': 2, 'name': 'Volume Full Set', 'time': 2, 'price': 135, 'note':''},
    {'id': 3, 'name': 'Mega Volume Full Set', 'time': 2, 'price': 150, 'note':''},
    {'id': 4, 'name': 'Lash Lift & Tint', 'time': 1, 'price': 85, 'note': '(15% Off)'}
]

# serviceslist = SERVICES


# @app.route("/", methods=['GET', 'POST'])
# def index():
#     currentuser = session.get("currentuser")
#     return render_template("index.html", currentuser=currentuser, services=SERVICES)


@app.route('/fetchsession', methods=['GET', 'POST'])
def fetchsession():
    # temporaryuser = {"status": None, "message": None, "id": None, "fullname": None, "firstname": None, "email": None, "phonenumber": None, "password": None, "profileimage": None, "membership": None, "address": None, "purchases": None, "notifications": None, "registration": None, "admin": None, "userdata": None}
    if "currentuser" in session:
        # if session["currentuser"]["status"] == None
        currentuser = session.get("currentuser")
        userid = currentuser["id"]
        status, message, idx, fullnamex, firstnamex, emailx, phonenumberx, passwordx, profileimagex, membershipx, addressx, purchasesx, notificationsx, registrationx, adminx = refresh_user_credentials(userid)
        currentuser = {"status": status, "message": message, "id": idx, "fullname": fullnamex, "firstname": firstnamex, "email": emailx, "phonenumber": phonenumberx, "password": passwordx, "profileimage": profileimagex, "membership": membershipx, "address": addressx, "purchases": purchasesx, "notifications": notificationsx, "registration": registrationx, "admin": adminx, "userdata": None}
        session["currentuser"] = currentuser
        # print(session.get("currentuser")["status"])
        if currentuser["admin"] == 1:
            userdata = get_database_data()
            # print(userdata)
            adminuser = {"status": status, "message": message, "id": idx, "fullname": fullnamex, "firstname": firstnamex, "email": emailx, "phonenumber": phonenumberx, "password": passwordx, "profileimage": profileimagex, "membership": membershipx, "address": addressx, "purchases": purchasesx, "notifications": notificationsx, "registration": registrationx, "admin": adminx, "userdata": userdata}
            session["currentuser"] = adminuser
            # print(session["currentuser"]["userdata"])
            return adminuser
        return currentuser
    else:
        # return None
        return redirect("/")


# @app.route('/displayadmin', methods=['GET', 'POST'])
# def displayadmin():
#     if "currentuser" in session:
#         currentuser = session.get("currentuser")
#         if currentuser["admin"] == 1:
#             userdata = get_database_data()
#             return userdata

@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST' and 'useremail' in request.form:
        fullname = request.form.get('userfullname')
        phonenumberraw = request.form.get('userphone')
        phonenumber = phonenumberraw.replace("-",'')
        email = request.form.get('useremail')
        password = request.form.get('userpassword')
        save_to_database(fullname, phonenumber, email, password)

        recipient = email
        subject = f"Welcome to Faitfully Lashed, {fullname}!"
        body = f"Welcome to Faithfully Lashed, {fullname}!\n\nYou've successfully registered your account with us!\n\nFor future reference, sign into your account using either your phone number or email!\n\nLastly, please confirm your account information below and remember to keep it safe.\n\nIf there's an issue with your information below, please send a response to this email with the problem detailed within it.\n\nE-mail: {email}\nPhone Number: {phonenumberraw}\nPassword: {password}\n\nThanks again for signing up with Faithfully Lashed!"
        send_email(recipient, subject, body)

        return 'Registered successfully!'

    else:
        return 'No form submitted.'


@app.route('/signin', methods=['POST'])
def signin():
    if request.method == 'POST' and 'usersignin' or 'passwordsignin' in request.form:
        usersigninraw = request.form.get('usersignin')
        usersignin = usersigninraw.replace("-", '')
        passwordsignin = request.form.get('passwordsignin')


        status, message, idx, fullnamex, firstnamex, emailx, phonenumberx, passwordx, profileimagex, membershipx, addressx, purchasesx, notificationsx, registrationx, adminx = check_user_credentials(usersignin, passwordsignin)
        user = {"status": status, "message": message, "id": idx, "fullname": fullnamex, "firstname": firstnamex, "email": emailx, "phonenumber": phonenumberx, "password": passwordx, "profileimage": profileimagex, "membership": membershipx, "address": addressx, "purchases": purchasesx, "notifications": notificationsx, "registration": registrationx, "admin": adminx, "userdata": None}

        # session.permanent = True
        # currentuser = user
        # session["currentuser"] = currentuser


        if status is True:

            app.permanent_session_lifetime = timedelta(days=1)
            session.permanent = True
            currentuser = user
            session["currentuser"] = currentuser
            # currentuser = session.get("currentuser")

            if currentuser["admin"] == 1:
                userdata = get_database_data()
                adminuser = {"status": status, "message": message, "id": idx, "fullname": fullnamex, "firstname": firstnamex, "email": emailx, "phonenumber": phonenumberx, "password": passwordx, "profileimage": profileimagex, "membership": membershipx, "address": addressx, "purchases": purchasesx, "notifications": notificationsx, "registration": registrationx, "admin": adminx, "userdata": userdata}
                # app.permanent_session_lifetime = timedelta(days=1)
                # session.permanent = True
                session["currentuser"] = adminuser
                session.modified = True
                # print(session["currentuser"])
                # print(session.get("currentuser"))
                return adminuser
            else:
                return user

        elif status is False:
            return user

    else:
        return 'No form submitted.'


@app.route("/logout")
def logout():
    session.pop("currentuser", None)
    session.clear()
    app.permanent_session_lifetime = timedelta(hours=1)
    session.permanent = True
    temporaryuser = {"status": None, "message": None, "id": None, "fullname": None, "firstname": None, "email": None, "phonenumber": None, "password": None, "profileimage": None, "membership": None, "address": None, "purchases": None, "notifications": None, "registration": None, "admin": None, "userdata": None}
    session["currentuser"] = temporaryuser
    return redirect("/")



@app.route("/", methods=['GET', 'POST'])
def index():
    currentuser = session.get("currentuser")
    return render_template("index.html", currentuser=currentuser, services=SERVICES)


@app.route('/cart', methods=['GET', 'POST'])
def cart():
    return render_template('dynamiccart.html', services=SERVICES)


@app.route('/updatecart', methods=['POST'])
def updatecart():
    services=SERVICES
    if request.method == 'POST' and 'serviceid' in request.form:
        serviceid = int(request.form.get('serviceid'))

        return services[serviceid]





# @app.route('/cart', methods=['GET', 'POST'])
# def cart():
#     if 'cart' not in session:
#         session['cart'] = []
#         cart = session['cart']
#         cartitems = []
#         total = 0
#         print(f"cart: {session['cart']}")
#         return render_template('dynamiccart.html', services=SERVICES, cartitems=cartitems, total=total)
#     cart = session['cart']
#     if not cart:
#         print(f"cart: {session['cart']}")
#         return render_template('dynamiccart.html', services=SERVICES)
#     cart = session['cart']
#     cartitems = []
#     total = 0
#     # print(f"cart: {session['cart']}")
#     print("2")
#     for services in cart:
#         serviceid = int(services["serviceid"])
#         quantity = int(services["quantity"])
#         service = SERVICES[serviceid]
#         print("3")
#         if service:
#             print("4")
#             subtotal = service['price'] * quantity
#             total += subtotal
#             cartitems.append({
#                 'id': serviceid,
#                 'name': service['name'],
#                 'price': service['price'],
#                 'quantity': quantity,
#                 'subtotal': subtotal
#             })
#     return render_template('dynamiccart.html', services=SERVICES, cartitems=cartitems, total=total)


# @app.route('/addtocart/<serviceid>', methods=['GET', 'POST'])
# def addtocart(serviceid):
#     if 'cart' not in session:
#         session['cart'] = []

#     session['cart'] = session.get('cart')
#     cart = session['cart']

#     if not cart:
#         cartitem = {"serviceid": serviceid, "quantity": 1}
#         cart.append(cartitem)
#         # print(f"{serviceid} was added to your cart.")
#     else:
#         for service in cart:
#             if serviceid == service["serviceid"]:
#                 service["quantity"] += 1
#                 cartitem = {"serviceid": serviceid, "quantity": service["quantity"]}
#                 service = cartitem
#                 return redirect("/cart")
#         cartitem = {"serviceid": serviceid, "quantity": 1}
#         cart.append(cartitem)
#     return redirect("/cart")


@app.route("/services")
def services():
    return render_template("services.html", services=SERVICES)


@app.route('/clear_cart')
def clear_cart():
    session.pop('cart', None)
    return redirect("/cart")








# update userdata set profileimage = 'static/images/testpic1.jpg' where id = 1;

app.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024
app.config['UPLOAD_FOLDER'] = 'profileimages/'
UPLOAD_FOLDER = 'static/profileimages'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/updateprofile', methods=['GET', 'POST'])
def update_profile():
    currentuser = session.get("currentuser")
    userid = currentuser["id"]
    oldpasswordrecord = currentuser["password"]

    if request.method == 'POST' and 'fullnameupdate' or 'phonenumberupdate' or 'emailupdate' or 'addressupdate' or 'file' or 'oldpassword' or 'newpassword' or 'newpasswordconfirmation' in request.form or request.files:

        fullnameupdate = request.form.get('fullnameupdate')
        phonenumberupdateraw = request.form.get('phonenumberupdate')
        phonenumberupdate = phonenumberupdateraw.replace("-",'')
        emailupdate = request.form.get('emailupdate')
        addressupdate = request.form.get('addressupdate')
        file = request.files.get('file')
        oldpassword = request.form.get('oldpassword')
        newpassword = request.form.get('newpassword')
        newpasswordconfirmation = request.form.get('newpasswordconfirmation')

        if fullnameupdate:
            processcode = processfullname(fullnameupdate, userid)
            if processcode["status"] == True:
                # return processcode
                pass
            else:
                pass

        if phonenumberupdate:
            processcode = processphonenumber(phonenumberupdate, userid)
            if processcode["status"] == True:
                # return processcode
                pass
            else:
                pass

        if emailupdate:
            processcode = processemail(emailupdate, userid)
            if processcode["status"] == True:
                # return processcode
                pass
            else:
                pass

        if addressupdate:
            # 805 Bradyville Pike APT O3, Nashville, TN 37130
            processcode = processaddress(addressupdate, userid)
            if processcode["status"] == True:
                # return processcode
                pass
            else:
                pass

        if file:
            processcode = processprofileimage(file, userid)
            if processcode["status"] == True:
                # return processcode
                pass
            else:
                pass

        if oldpassword and oldpassword == oldpasswordrecord:
            if newpassword and newpasswordconfirmation:
                processcode = processpassword(oldpassword, newpassword, newpasswordconfirmation, userid, oldpasswordrecord)
                if processcode["status"] == True:
                    return processcode
                else:
                    return processcode
                    # pass
            else:
                errorcode = {"status": False, "message": 'Provide new password and/or new password confirmation.', "code": 501}
                return errorcode
        if oldpassword and oldpassword != oldpasswordrecord:
            errorcode = {"status": False, "message": 'Incorrect password.', "code": 501}
            return errorcode
        else:
            processcode = {"status": True, "message": 'Profile successfully updated.', "code": 201}
            return processcode
            # pass
    else:
        errorcode = {"status": False, "message": 'No submissions present', "code": 501}
        return errorcode
        # return redirect("/")
    # pass
    # return redirect("/")




def processfullname(fullnameupdate, userid):
    updatefullname(fullnameupdate, userid)
    returncode = {"status": True, "message": 'Full name updated successfully.', "code": 201}
    return returncode


def processphonenumber(phonenumberupdate, userid):
    updatephonenumber(phonenumberupdate, userid)
    returncode = {"status": True, "message": 'Phone number updated successfully.', "code": 201}
    return returncode


def processemail(emailupdate, userid):
    updateemail(emailupdate, userid)
    returncode = {"status": True, "message": 'Email updated successfully.', "code": 201}
    return returncode


def processaddress(addressupdate, userid):
    updateaddress(addressupdate, userid)
    returncode = {"status": True, "message": 'Address updated successfully.', "code": 201}
    return returncode


def processprofileimage(file, userid):
    # Secure and save the file
    filename = secure_filename(file.filename)
    file.save(os.path.join(UPLOAD_FOLDER, filename))
    filepath = f"static/images/{filename}"
    updateprofileimage(filepath, userid)
    returncode = {"status": True, "message": 'Profile image updated successfully.', "code": 201}
    return returncode


def processpassword(oldpassword, newpassword, newpasswordconfirmation, userid, oldpasswordrecord):
    if oldpassword == oldpasswordrecord:
        if newpassword == newpasswordconfirmation:
            updatepassword(newpassword, userid)
            returncode = {"status": True, "message": 'Password updated successfully.', "code": 500}
            return returncode
        else:
            errorcode = {"status": False, "message": 'Password confirmation does not match new password.', "code": 501}
            return errorcode

    else:
        errorcode = {"status": False, "message": 'Incorrect password.', "code": 501}
        return errorcode





# def newsession(sessionname, sessionperiod, sessioninformation):
#     session.pop("currentuser", None)
#     session.clear()
#     app.permanent_session_lifetime = timedelta(hours=1)
#     session.permanent = True
#     temporaryuser = {"status": None, "message": None, "id": None, "fullname": None, "firstname": None, "email": None, "phonenumber": None, "password": None, "profileimage": None, "membership": None, "address": None, "purchases": None, "notifications": None, "registration": None, "admin": None, "userdata": None}
#     session["currentuser"] = temporaryuser




def save_to_database(fullname, phonenumber, email, password):
    connection = sqlite3.connect(userdb)
    cursor = connection.cursor()

    try:
        # SQL statement with placeholders
        sql = "INSERT INTO userdata (fullname, phonenumber, email, password) VALUES (?, ?, ?, ?)"
        # Execute the statement with data as a tuple
        cursor.execute(sql, (fullname, phonenumber, email, password))

        # Commit the changes to the database
        connection.commit()
        print("Data committed successfully.")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # Handle the error appropriately
    finally:
        # Always close the connection
        connection.close()
        print("Connection closed successfully.")




def displayuserdata():
    connection = sqlite3.connect(userdb)
    cursor = connection.cursor()

    try:
        # SQL statement with placeholders
        sql = "SELECT * FROM userdata"
        # Execute the statement with data as a tuple
        cursor.execute(sql)

        # Commit the changes to the database
        connection.commit()
        print("Data committed successfully.")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # Handle the error appropriately
    finally:
        # Always close the connection
        connection.close()
        print("Connection closed successfully.")





def updatefullname(fullnameupdate, userid):
    connection = sqlite3.connect(userdb)
    cursor = connection.cursor()

    try:
        # SQL statement with placeholders
        sql = "UPDATE userdata SET fullname = ? WHERE id = ?"
        # Execute the statement with data as a tuple
        cursor.execute(sql, (fullnameupdate, userid))

        # Commit the changes to the database
        connection.commit()
        print("Data committed successfully.")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # Handle the error appropriately
    finally:
        # Always close the connection
        connection.close()
        print("Connection closed successfully.")



def updatephonenumber(phonenumberupdate, userid):
    connection = sqlite3.connect(userdb)
    cursor = connection.cursor()

    try:
        # SQL statement with placeholders
        sql = "UPDATE userdata SET phonenumber = ? WHERE id = ?"
        # Execute the statement with data as a tuple
        cursor.execute(sql, (phonenumberupdate, userid))

        # Commit the changes to the database
        connection.commit()
        print("Data committed successfully.")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # Handle the error appropriately
    finally:
        # Always close the connection
        connection.close()
        print("Connection closed successfully.")


def updateemail(emailupdate, userid):
    connection = sqlite3.connect(userdb)
    cursor = connection.cursor()

    try:
        # SQL statement with placeholders
        sql = "UPDATE userdata SET email = ? WHERE id = ?"
        # Execute the statement with data as a tuple
        cursor.execute(sql, (emailupdate, userid))

        # Commit the changes to the database
        connection.commit()
        print("Data committed successfully.")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # Handle the error appropriately
    finally:
        # Always close the connection
        connection.close()
        print("Connection closed successfully.")

def updateaddress(addressupdate, userid):
    connection = sqlite3.connect(userdb)
    cursor = connection.cursor()

    try:
        # SQL statement with placeholders
        sql = "UPDATE userdata SET address = ? WHERE id = ?"
        # Execute the statement with data as a tuple
        cursor.execute(sql, (addressupdate, userid))

        # Commit the changes to the database
        connection.commit()
        print("Data committed successfully.")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # Handle the error appropriately
    finally:
        # Always close the connection
        connection.close()
        print("Connection closed successfully.")


def updateprofileimage(filepath, userid):
    connection = sqlite3.connect(userdb)
    cursor = connection.cursor()

    try:
        # SQL statement with placeholders
        sql = "UPDATE userdata SET profileimage = ? WHERE id = ?"
        # Execute the statement with data as a tuple
        cursor.execute(sql, (filepath, userid))

        # Commit the changes to the database
        connection.commit()
        print("Data committed successfully.")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # Handle the error appropriately
    finally:
        # Always close the connection
        connection.close()
        print("Connection closed successfully.")



def updatepassword(newpassword, userid):
    connection = sqlite3.connect(userdb)
    cursor = connection.cursor()

    try:
        # SQL statement with placeholders
        sql = "UPDATE userdata SET password = ? WHERE id = ?"
        # Execute the statement with data as a tuple
        cursor.execute(sql, (newpassword, userid))

        # Commit the changes to the database
        connection.commit()
        print("Data committed successfully.")

    except sqlite3.Error as e:
        print(f"Database error: {e}")
        # Handle the error appropriately
    finally:
        # Always close the connection
        connection.close()
        print("Connection closed successfully.")



# def update_database(fullname, phonenumber, email, password, profileimage, membership, address, purchases, notifications, admin):
#     connection = sqlite3.connect(userdb)
#     cursor = connection.cursor()

#     try:
#         # SQL statement with placeholders
#         sql = "INSERT INTO userdata (fullname, phonenumber, email, password, profileimage, membership, address, purchases, notifications, admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
#         # Execute the statement with data as a tuple
#         cursor.execute(sql, (fullname, phonenumber, email, password, profileimage, membership, address, purchases, notifications, admin))

#         # Commit the changes to the database
#         connection.commit()
#         print("Data committed successfully.")

#     except sqlite3.Error as e:
#         print(f"Database error: {e}")
#         # Handle the error appropriately
#     finally:
#         # Always close the connection
#         connection.close()
#         print("Connection closed successfully.")



def check_user_credentials(usersignin, passwordsignin):
    connection = sqlite3.connect('userdata.db') # Connect to the database
    cursor = connection.cursor()

    # Use a prepared statement to safely query the database
    query = "SELECT * FROM userdata WHERE email = ? OR phonenumber = ?"
    # print([(user_input)])
    cursor.execute(query, (usersignin, usersignin))

    # Fetch the first matching row
    result = cursor.fetchone()
    connection.close()

    if result:
        # A user was found, now compare the password (e.g., using a secure hash comparison)
        # stored_password = result[4]
        id = result[0]
        fullname = result[1]
        email = result[2]
        phonenumber = result[3]
        password = result[4]
        profileimage = result[5]
        membership = result[6]
        address = result[7]
        purchases = result[8]
        notifications = result[9]
        registration = result[10]
        admin = result[11]
        # print(id, fullname, email, phonenumber, password, admin)

        # In a real application, you would use a secure library to compare hashes
        if password == passwordsignin: # Simplified comparison
            # print(id, fullname, email, phonenumber, password, admin)
            status = True
            # message = f"Signed in successfully. Welcome back, {fullname}!"
            idx = id
            fullnamex = fullname
            firstnamex = fullname.split()[0]
            emailx = email
            phonenumberx = phonenumber
            passwordx = password
            profileimagex = profileimage
            membershipx = membership
            addressx = address
            purchasesx = purchases
            notificationsx = notifications.split('--end--')
            registrationx = registration
            adminx = admin
            message = f"Welcome back, {firstnamex}!"
            # f"Signed in successfully.<br>Welcome back, {firstnamex}!"

            # print(idx, fullnamex, emailx, phonenumberx, passwordx, adminx)
            return status, message, idx, fullnamex, firstnamex, emailx, phonenumberx, passwordx, profileimagex, membershipx, addressx, purchasesx, notificationsx, registrationx, adminx  # Credentials match
        else:
            idx = "empty"
            fullnamex = "empty"
            firstnamex = "empty"
            emailx = "empty"
            phonenumberx = "empty"
            passwordx = "empty"
            profileimagex = "empty"
            membershipx = "empty"
            addressx = "empty"
            purchasesx = "empty"
            notificationsx = "empty"
            registrationx = "empty"
            adminx = "empty"
            status = False
            message = f"Incorrect password."
            # return status, message # Password incorrect
            return status, message, idx, fullnamex, firstnamex, emailx, phonenumberx, passwordx, profileimagex, membershipx, addressx, purchasesx, notificationsx, registrationx, adminx
    else:
        idx = "empty"
        fullnamex = "empty"
        firstnamex = "empty"
        emailx = usersignin
        phonenumberx = usersignin
        passwordx = "empty"
        profileimagex = "empty"
        membershipx = "empty"
        addressx = "empty"
        purchasesx = "empty"
        notificationsx = "empty"
        registrationx = "empty"
        adminx = "empty"
        status = False
        message = f"User ''{usersignin}'' not found."
        # return status, message # User not found
        return status, message, idx, fullnamex, firstnamex, emailx, phonenumberx, passwordx, profileimagex, membershipx, addressx, purchasesx, notificationsx, registrationx, adminx
    #     return render_template("index.html", name=session.get("name")) # Redirect to a dashboard or home page



def refresh_user_credentials(userid):
    connection = sqlite3.connect('userdata.db') # Connect to the database
    cursor = connection.cursor()

    # Use a prepared statement to safely query the database
    query = "SELECT * FROM userdata WHERE id = ?"
    # print([(user_input)])
    cursor.execute(query, (userid,))

    # Fetch the first matching row
    result = cursor.fetchone()
    connection.close()

    if result:
        # A user was found, now compare the password (e.g., using a secure hash comparison)
        # stored_password = result[4]
        status = True
        id = result[0]
        fullname = result[1]
        email = result[2]
        phonenumber = result[3]
        password = result[4]
        profileimage = result[5]
        membership = result[6]
        address = result[7]
        purchases = result[8]
        notifications = result[9]
        registration = result[10]
        admin = result[11]

        status = True
        # message = f"Signed in successfully. Welcome back, {fullname}!"
        idx = id
        fullnamex = fullname
        firstnamex = fullname.split()[0]
        emailx = email
        phonenumberx = phonenumber
        passwordx = password
        profileimagex = profileimage
        membershipx = membership
        addressx = address
        purchasesx = purchases
        notificationsx = notifications.split('--end--')
        registrationx = registration
        adminx = admin
        message = f"Welcome back, {firstnamex}!"

        return status, message, idx, fullnamex, firstnamex, emailx, phonenumberx, passwordx, profileimagex, membershipx, addressx, purchasesx, notificationsx, registrationx, adminx



def send_email(recipient_email, subject, body):
    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = recipient_email
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, recipient_email, msg.as_string())

        print("E-mail sent successfully. Return Code 200 OK Successful")
    except Exception as e:
        if e == "(334, b'UGFzc3dvcmQ6')":
            print(f"Error sending e-mail:{e}, failed authentication.")
        else:
            print(f"Error sending e-mail:{e}, failed authentication.")



def delete_user(useremail):
    connection = sqlite3.connect('userdata.db') # Connect to the database
    cursor = connection.cursor()

    # Use a prepared statement to safely query the database
    query = "DELETE FROM userdata WHERE email = ?"
    # print([(user_input)])
    cursor.execute(query, (useremail,))

    # Fetch the first matching row
    result = cursor.fetchone()
    connection.close()

    if result:
         return "User successfully deleted from database."
