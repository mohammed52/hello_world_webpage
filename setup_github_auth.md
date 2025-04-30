# Setting Up GitHub Authentication

Before you can push code to GitHub, you need to set up authentication. GitHub offers multiple authentication methods:

## Option 1: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
   https://github.com/settings/tokens/new

2. Give your token a name (e.g., "Git on my PC")

3. Set the expiration period

4. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `workflow` (optional, if you'll use GitHub Actions)

5. Click "Generate token"

6. **IMPORTANT**: Copy the token immediately and save it somewhere secure, as you won't be able to see it again.

7. When you run the `connect_to_github.bat` script and are prompted for a password, use this token instead of your GitHub password.

## Option 2: Set up SSH Keys

If you prefer using SSH instead of HTTPS, follow these steps:

1. Open Git Bash and generate an SSH key:
   ```
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. Add the SSH key to the ssh-agent:
   ```
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Copy the SSH key to your clipboard:
   ```
   clip < ~/.ssh/id_ed25519.pub
   ```

4. Go to GitHub → Settings → SSH and GPG keys → New SSH key
   https://github.com/settings/keys

5. Paste your key and give it a title.

6. Update your repository to use SSH instead of HTTPS:
   ```
   git remote set-url origin git@github.com:YOUR_USERNAME/hello_world_webpage.git
   ```

## Option 3: GitHub CLI

You can also use GitHub CLI for a simpler authentication experience:

1. Download and install GitHub CLI from https://cli.github.com/

2. Run `gh auth login` and follow the prompts

3. After authentication, you can use `gh` commands or regular git commands which will use the stored credentials.