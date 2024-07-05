from flask import Flask, render_template, request, redirect

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('registration.html')

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    department = request.form['department']
    year = request.form['year']
    level = request.form['level']
    registration_number = request.form['registrationNumber']
    option = request.form['option']
    gender = request.form['gender']
    user_type = request.form['userType']
    
    # Add code here to save user details to a database or perform desired actions
    
    return redirect('/')  # Redirect to registration page after successful registration

if __name__ == '__main__':
    app.run(debug=True)
