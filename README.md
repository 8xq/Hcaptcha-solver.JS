# Hcaptcha-solver
This is a very basic JS project I made that uses the "Request" module to interact with 2captcha.com API , using 2captcha this program will simply be able to solve Hcaptcha and return the "Token" value , this is used mainly for web testing / automation. As I am fairly new to JS this is a very basic example and in the future I will make this into a module that will be easier to use.

# Hcaptcha JS usage
```
As you can see below there is 5 variables that needs to be provided to solve "Hcaptcha"
This project uses the 'Request' package for HTTP web requests
to install 'Request' run NPM install request

Line 1 - CaptchaAPIKey is your 2captcha.com API key
Line 2 - Domain is the website page URL with Hcaptcha
Line 3 - SiteKey is the Hcaptcha sitekey (unique per site)
Line 4 - Maximum retries is the amount of times to check for results
Line 5 - TimeoutWait is the delay between retries in milliseconds
```
![Alt text](https://i.imgur.com/escOg4L.png "Example")


# Dependecies / Resources
[Request (package)](https://www.npmjs.com/package/request "Request") <br>
[2captcha (API key)](https://2captcha.com?from=6752599 "2captcha.com")


```
Admin@hvh.site
```
