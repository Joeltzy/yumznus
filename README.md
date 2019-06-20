# Project Summary
This project contains a submission for the NUS Orbital CP2106 project. YumzNUS is a all in one platform for users to check out the most efficient places to dine on NUS campus. It incudes a review/comments section and also a voting/recommended section for users to be well-informed of the best dining places. The link for the website can be found at this [link](https://yumznus18.herokuapp.com/). The website is deployed on Heroku App Services. 

## Built With
YumzNUS was built using MeteorJS. Meteor, or MeteorJS, is a free and open-source isomorphic JavaScript web framework written using Node.js. Meteor allows for rapid prototyping and produces cross-platform code. The database used at the back-end is MongoDB. MongoDB is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with schema.  

# Running the Project

## Mac
1. Open terminal and run the command `curl https://install.meteor.com/ | sh`

## Windows
1. We first install Chocolatey. To install with `cmd.exe`, run the following command. `@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`

2. To install Chocolatey with PowerShell instead, we must first ensure `Get-ExecutionPolicy` is not Restricted. Run `Get-ExecutionPolicy` and run `Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))`.

3. After Chocolatey is installed, one can simply run `choco install meteor` in Adminstrator command prompt.

# Installing Dependencies
1. Clone the repository.
`git clone https://github.com/Joeltzy/YumzNUS.git`

2. Enter the project directory by running `cd YumzNUS`.

3. Run the command `meteor npm install` to install dependencies.

4. Run the command `meteor` to and one should see `# Meteor server running on: http://localhost:3000/`. 

5. Open up `http://localhost:3000/` to see the project. 
