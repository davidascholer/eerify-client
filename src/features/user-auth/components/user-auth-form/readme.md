# User Log-In Tests

This document outlines a variety of tests to verify the functionality of the user log-in feature.

## Test 1: Successful Sign-up

### Description
Verify that a user can successfully create an account with valid credentials.

### Steps
1. Navigate to the sign-in page.
2. Enter valid username and password.
3. Click on the "Submit" button.
4. Verify that the user is redirected to the home page.
5. Verify that the user is logged in and their username is displayed.

### Expected Result
The user should be able to sign in successfully.

## Test 2: Invalid Credentials

### Description
Verify that a user cannot sign in with invalid credentials.

### Steps
1. Navigate to the sign-in page.
2. Enter invalid password.
3. Click on the "Submit" button.
4. Verify that an error message is displayed indicating invalid credentials.
5. Verify that the user is not logged in and remains on the sign-in page.

### Expected Result
The user should not be able to sign in with invalid credentials and should see an error message.

## Test 3: User Does Not Exist

### Description
Verify that a user cannot sign in with invalid credentials.

### Steps
1. Navigate to the sign-in page.
2. Enter invalid username.
3. Click on the "Submit" button.
4. Verify that an error message is displayed indicating invalid credentials.
5. Verify that the user is not logged in and remains on the sign-in page.

### Expected Result
The user should not be able to sign in with invalid credentials and should see an error message.


# User Sign-Up Tests

This document outlines a variety of tests to verify the functionality of the user sign-up feature.

## Test 1: Successful Log-in

### Description
Verify that a user can successfully sign up with valid credentials and be sent and email confirmation.

### Steps
1. Navigate to the sign-in page.
2. Click the "Sign Up" button.
2. Enter valid username, password, and matching password.
3. Click on the "Submit" button.
4. Verify that the user is redirected to the home page.
5. Verify that the user is logged in and their username is displayed.

### Expected Result
The user should be able be sent a confirmation email and sign up successfully.

## Test 2: Invalid Credentials

### Description
Verify that a user cannot sign in with invalid credentials.

### Steps
1. Navigate to the sign-in page.
2. Enter invalid password.
3. Click on the "Submit" button.
4. Verify that an error message is displayed indicating invalid credentials.
5. Verify that the user is not logged in and remains on the sign-in page.

### Expected Result
The user should not be able to sign in with invalid credentials and should see an error message.

## Test 3: User Does Not Exist

### Description
Verify that a user cannot sign in with invalid credentials.

### Steps
1. Navigate to the sign-in page.
2. Enter invalid username.
3. Click on the "Submit" button.
4. Verify that an error message is displayed indicating invalid credentials.
5. Verify that the user is not logged in and remains on the sign-in page.

### Expected Result
The user should not be able to sign in with invalid credentials and should see an error message.


# User Forgotten Password Tests

This document outlines a variety of tests to verify the functionality of the user password reset feature.

## Test 1: Send Email to Valid Email Address

### Description
Verify that a user can reset their password if they have forgotten it.

### Steps
1. Navigate to the sign-in page.
2. Click on the "Forgot Password" link.
3. Enter the email associated with the user account.
4. Click on the "Submit" button.
5. Verify that a password reset email is sent to the user's email address.
6. Follow the instructions in the email to reset the password.
7. Verify that the user can sign in with the new password.

### Expected Result
The user should be able to reset their password and sign in with the new password.

## Test 2: Send Email to Invalid Email Address

### Description
Verify that a user cannot send a password to an email address not in the system.

### Steps
1. Navigate to the sign-in page.
2. Click on the "Forgot Password" link.
3. Enter an email not associated with any user account.
4. Click on the "Submit" button.
5. Verify that an error message appears that the email does not exist.

### Expected Result
The user shouldn't be able to send a reset password email to a non-existent account.

