Requirements for development
----
- [Docker](https://www.docker.com/)
- [Node](https://nodejs.org/en/) (recommend installing via [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases) / [NVM for Mac](https://github.com/nvm-sh/nvm/releases))

Local development
----
Run `./start-dev.sh` to start up a local server at `http://localhost:8000/`. Note that you'll have to kill this process and restart to see changes.

Deployment
----
Bump the version number in the `package.json` file (I've been bumping that by 1 every time I deploy) and run `./deploy.sh`. Next, ssh into the host server run `./run.sh <VERSION IN PACKAGE.JSON>`