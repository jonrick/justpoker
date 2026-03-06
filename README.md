# <a href="https://justpoker.games">JustPoker</a>
<img src="https://github.com/justpoker-team/justpoker/blob/master/docs/jp_koi.png?raw=true" alt="Image of JP Mascot" width="250"/>

### Stacks:

- **UI** React + TS 

- **Server** Node + TS + Express + Typedi (handles boh HTTPS + WS)


### Setting up a local development environment
Running docker is not necessary to develop locally.
The server and the UI are separate packages, with their own dependencies.
Due to a limitation in the configuration options of create-react-app, the shared TS interfaces/models are found in `ui/src/shared/models` as opposed to some other top-level directory.

After cloning repo, run
`npm run preinstall`

Running backend server:
```
cd server && npm run start
```

Running React UI server:
```
cd ui && npm run start
```

Afterwards, navigate to `http://localhost:3000/` to view the app (HTTPS is not enabled when running locally).
### Testing multiple players locally
Users are identified via the `jp-client-uuid` key in local storage, so to test with multiple users you need to use either a different browser, and/or incognito mode. For example, to test with four players, you can connect to the app from Chrome, Chrome (Incognito), Firefox, Firefox (incognito). You can also try deleting the local storage yourself, but that is probably more error-prone and gets harder to manage.

### Deployment Options

#### 1. Manual Production Build (No Docker)
To build the application for production on your host machine:

1. **Build the UI**:
   ```bash
   cd ui
   npm install
   npm run build
   ```
2. **Setup the Server**:
   ```bash
   cd ../server
   npm install
   ```
3. **Run**:
   Set `NODE_SERVER_ENVIRONMENT=PROD` and `ROOT_SERVER_DIR` (absolute path to the project root) and start the server:
   ```bash
   # Windows (PowerShell)
   $env:NODE_SERVER_ENVIRONMENT="PROD"; $env:ROOT_SERVER_DIR="$(Get-Location)\.."; npm start
   # Linux/macOS
   NODE_SERVER_ENVIRONMENT=PROD ROOT_SERVER_DIR=$(pwd)/.. npm start
   ```

#### 2. Containerized Deployment (Docker)
Docker is a convenient way to package the entire application.

- **Build**:
  ```bash
  docker build --build-arg build_env=PROD -t justpoker ./
  ```
- **Run**:
  ```bash
  docker run -d -p 8080:8080 justpoker
  ```

### Contributing
The `master` branch is protected. We strive to keep it stable and production-ready. Make changes on a separate branch, then create a PR. After review and approval, the PR can be merged into `master`.


