//=============================================================================\\
//                              Hcaptcha solver                                 \\
//                             made by nullcheats                                \\
//================================================================================\\

/*
These are the varaibles we will be using to use 2captcha API to solve Hcaptcha
As you can see we use the "Request" package for out HTTP web requests
We have a variable for the 2captcha API key | www.2captcha.com
We have the Hcaptcha site key as you can also see (this is unique per site)
We also have the "Domain" variable this needs to be from the site with Hcaptcha , this should match site key
We also have "Maximum retries" , this is when checking task ID for captcha value / how many times to check
We also have "TimeoutWait" this is how long the program will wait between retrying to check for captcha result
*/
const { Console } = require('console');
const request = require('request');
const CaptchaAPIkey = "";
const Domain = "";
const SiteKey = "";
const MaximumRetries = 8; 
const TimeoutWait = 10500;

/*
As you can see this is the main function that will submit a new task on 2captcha.com via the API
To start with it will make a request using the "Request" package to 2captcha API and wait for a response
If the response was accepted with no issues a "TaskID" / "Captcha ID" will be returned
Assuming there is no issues this function will then pass the task ID to the function "GetSolvedCapthcaID"
*/
const GetCaptchaToken = () =>
{
    console.log('Attempting to grab 2captcha task ID');
    request("https://2captcha.com/in.php?key=" + CaptchaAPIkey + "&method=hcaptcha&sitekey=" + SiteKey + "&pageurl=" + Domain + "&soft_id=2640", (error, response, body) => {
        if(!error == true)
        {
            if(body.substring(0, 3)  == "OK|")
            {
                var CaptchaID = body.replace("OK|", "");;
                console.log('2captcha ID -> ' + CaptchaID);
                GetSolvedCaptchaID(CaptchaID);
            }
            else if(body.includes("ERROR_WRONG_USER_KEY"))
            {
                console.warn("Bad API key - please ensure key is correct");
            }
            else
            {
                console.warn("Error with response");
            }
        }
        else
        {
            Console.log("Error getting 2captcha task ID");
        }
    });
}

/*
This function simply checks if 2captcha.com has solved the capthca and returned the value yet
As you can see this function contains a loop and this is depending on how many retries are allowed before exceeding attempts set
Within the loop there is also a timer function that will sleep / wait for a set amount of milliseconds between "retries"
Both the Maximum attempts & Sleep time can be adjusted via the variables
MaximumRetries = How many times to re-check API for a captcha response / output
TimeoutWait = How long to wait before each retry for captcha result checks (MS)
Within each itteration of the loop a simple request will be made to check if 2captcha has a response and if so how to handle it
If there is a response it will return the end result , if not it will return an error !
*/
const GetSolvedCaptchaID = (CaptchaID) =>
{
    for (let i = 1; i < MaximumRetries; i++) {
        setTimeout(function timer() {
            request("https://2captcha.com/res.php?key=" + CaptchaAPIkey + "&action=get&id=" + CaptchaID, (error, response, body) => {
                if(!error == true)
                {
                    if(body.substring(0, 3)  == "OK|")
                    {
                        var CaptchaResult = body.replace("OK|", "");;
                        console.log('Captcha result ->' + CaptchaResult);
                    }
                    else if(body.includes("ERROR_WRONG_USER_KEY"))
                    {
                        console.warn("Bad API key - please ensure key is correct");
                    }
                    else if(body.includes("CAPCHA_NOT_READY"))
                    {
                        console.log("Captcha is not ready - attempting to retry after " + TimeoutWait + "ms");
                    }
                    else
                    {
                        console.warn("Error with response" + body);
                    }
                }
                else
                {
                    Console.log("Error getting 2captcha task ID");
                }
            });
        }, TimeoutWait);
      }
}


GetCaptchaToken();
