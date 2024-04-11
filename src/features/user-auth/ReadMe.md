# About
- Handles all of the user login information including resetting forgotten passwords, verification, login, and account disabling. 

---

# Logging In
- Nest the app or any appropriate components in the AuthHomeWrapper component to create the following logic:
    1. The app home page calls the `/users/me` endpont up to three times (React Query default) w the auth jwt stored in cookies to get the user object.
    2. If the auth fails, make a post call to the endpoint `/auth/jwt/refresh` with the refrsh token.
        - If a new auth is returned, replace the auth token and retry step 1.
        - If a 4xx error is returned (refresh token expired), continue as an unregistered user.

---

# Pages
- For proper data structures, don't reference but rather move these to or wrap these with the apps current page structure. 

## UserAuthForm
- The user auth form is formik wrapper around 3 sub components:

    **Login (default)**
    1. Shows the email and password fields.
    2. Sends a post request to the endpoint `/auth/jwt/create` to fetch a new auth token and refresh token 
    3. Saves the auth token and refresh tokens to cookies with the custom useCookie hook.
    4. Redirects to the home page upon success where calling users/me with the new auth token should log a user in.

    **Signup**
    1. Shows the email, password, and password verify fields.
    2. Sends a post request to the endpoint `/users` to create a new user.
    3. Upon success, repeat the Login process starting at step 2.

    **Forgot/Reset Password**
    1. Shows just the email field.
    2. Send a request to a link to reset a password to the user email.
    3. On success, prompts the user to check their email.

## Change Password
1. Shows the email, old password, new password, and verify new password fields *in a separate page*.
2. Sends a patch request to the endpoint `/users/me` to change the password.

## User Delete/Deactivation
- User delete accounts are overridden to change user's accounts to is_activated = False.
1. App should send to an deactivate account page.
2. Show's a prompt for a user to send to the endpoint `/users/activate` which will set a user's is_activated property to false.
3. Upon success, the component notifies the user and deletes the cookies

## User Activation
1. If a user's account is deactivated, app should send to an activation page.
2. Show's a prompt for a user to send to the endpoint `/users/activate` which will set a user's is_activated property to true.
3. Upon success, the component notifies the user.

---

# Dependencies
- mui/material
- formik
- yup
- useReactQuery hook from on-prem react-query lib wrapper
- useCookie hook from on-prem js-cookie lib wrapper

---

# Extra

## Backend
- This app's backend uses Djano with Django-Rest-Framework and Djoser dependencies for user auth. 
- If using the *appgen* tool, you will need to install both the core app and the userprofile app.

---

# User Auth Model

## Login
- Set the auth token and refresh token to cookies upon valid username and password

## Logout
- Deletes respective cookies from browser and reloads

## Verification
1)  verify auth token
2)  a. Auth token is verified, go to [get user](#get-user)
    b. Auth token is not verified, continue.
3)  verify refresh token
4)  a. Refresh token is verified, [refresh auth token](#refresh)
    b. Refresh token is not verified, do nothing. User stays logged out.

## Refresh {#refresh}
- Refreshes an auth token with a valid refresh token and saves it to cookies.
- Get User with fresh auth token [get user](#get-user)

## Get User {#get-user}
- Fetch user account info

## Create Account
- Sends a valid email and passwords to the server, creating a user object.

## Reset/Forgot Password
- Sends a valid email a link to recover password.

---
