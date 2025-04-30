@echo off
echo Setting up connection to GitHub repository

:: Replace YOUR_USERNAME with your GitHub username
set GITHUB_USERNAME=YOUR_USERNAME

:: Connect local repository to GitHub
echo Connecting to https://github.com/%GITHUB_USERNAME%/hello_world_webpage.git
"C:\Program Files\Git\cmd\git.exe" remote add origin https://github.com/%GITHUB_USERNAME%/hello_world_webpage.git

:: Push the code to GitHub
echo Pushing code to GitHub...
"C:\Program Files\Git\cmd\git.exe" push -u origin master

echo.
echo If you see an authentication prompt, please enter your GitHub credentials.
echo.
echo Process completed. If successful, your code is now on GitHub.
pause