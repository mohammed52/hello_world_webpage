@echo off
echo Setting up SSH connection to GitHub repository

:: Replace YOUR_USERNAME with your GitHub username
set GITHUB_USERNAME=mohammed52

:: Connect local repository to GitHub using SSH
echo Connecting to git@github.com:%GITHUB_USERNAME%/hello_world_webpage.git
"C:\Program Files\Git\cmd\git.exe" remote set-url origin git@github.com:%GITHUB_USERNAME%/hello_world_webpage.git

:: Check the remote URL
"C:\Program Files\Git\cmd\git.exe" remote -v

:: Push the code to GitHub
echo Pushing code to GitHub...
"C:\Program Files\Git\cmd\git.exe" push -u origin master

echo.
echo If you've set up SSH keys correctly, this should work without a password prompt.
echo If you haven't set up SSH keys, please see the setup_github_auth.md file.
echo.
echo Process completed. If successful, your code is now on GitHub.
pause