# <a href="https://justpoker.games">JustPoker</a>
<img src="https://github.com/justpoker-team/justpoker/blob/master/docs/jp_koi.png?raw=true" alt="Image of JP Mascot" width="250"/>

### Stacks:

- **UI** React + TS 

- **Server** Node + TS + Express + Typedi (handles boh HTTPS + WS)


### Setting up a local development environment
Running docker is not necessary to develop locally.
The server and the UI are separate packages, with their own dependencies.
Due to a limitation in the configuration options of create-react-app, the shared TS interfaces/models are found in `ui/src/shared/models` as opposed to some other top-level directory.

After cloning repo, run:
`npm run preinstall -- --legacy-peer-deps`

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

#### 1. Local Build & Push (FASTEST) - RECOMMENDED for small servers
If your server takes too long to build (e.g. 40+ mins), build locally on your dev machine:
1. **On your local machine**: 
   ```bash
   cd ui
   npm run build  # Builds in seconds/minutes
   git add build -f 
   git commit -m "chore: production build"
   git push
   ```
2. **On your production server**:
   ```bash
   git pull
   # No build needed! Just run:
   ./run_prod.sh
   ```

#### 2. Manual Build (Helper Scripts)
Use these scripts to automate the production process on your server (Warning: slow on small servers):
```bash
# Make them executable first
chmod +x deploy_prod.sh run_prod.sh

# Run the build (UI + Server deps)
./deploy_prod.sh

# Start the application
./run_prod.sh
```

#### 2. Manual Build (Step-by-Step)
If you prefer to run steps individually:

1. **Build the UI**:
   ```bash
   cd ui
   npm install --legacy-peer-deps
   # If you hit "out of memory" errors during build, increase Node heap limit:
   export NODE_OPTIONS=--max-old-space-size=4096
   npm run build
   ```
2. **Setup the Server**:
   ```bash
   cd ../server
   npm install --legacy-peer-deps
   ```
3. **Run Production Server**:
   Navigate to the `server` directory and start it. **Do not use the root `npm start` for production.**
   
   Set `NODE_SERVER_ENVIRONMENT=PROD` and `ROOT_SERVER_DIR` (the path to the project root) and start the server:
   ```bash
   # Linux/macOS (from justpoker/server directory)
   # ROOT_SERVER_DIR should point to the parent 'justpoker' folder
   NODE_SERVER_ENVIRONMENT=PROD ROOT_SERVER_DIR=$(pwd)/.. npm start

   # Windows (PowerShell - from justpoker/server directory)
   $env:NODE_SERVER_ENVIRONMENT="PROD"; $env:ROOT_SERVER_DIR="$(get-location)\.."; npm start
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


