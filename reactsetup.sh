#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Remove unnecessary boilerplate code from src
rm -rf src/*

# Clear files from public directory if it exists, otherwise create it
if [ -d "public" ]; then
  rm -rf public/*
else
  mkdir public
fi

# Create a minimal index.html file in the public folder
cat <<EOL > public/index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOL

# Create index.js file in the src folder
cat <<EOL > src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
EOL

# Create a minimal App.js file
cat <<EOL > src/App.js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to React</h1>
    </div>
  );
}

export default App;
EOL

# Create index.css file in the src folder
cat <<EOL > src/index.css
/* Add global styles here */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
EOL

# Create App.css file in the src folder
cat <<EOL > src/App.css
/* Add component specific styles here */
.App {
  text-align: center;
}
EOL

# Create assets folder if it doesn't exist
if [ ! -d "src/assets" ]; then
  mkdir src/assets
fi

# Create components folder and component subfolders with .jsx and .css files
COMPONENTS=("Nav" "Card" "Button" "Footer")

mkdir -p src/components
for COMPONENT in "${COMPONENTS[@]}"; do
  mkdir -p src/components/${COMPONENT}
  touch src/components/${COMPONENT}/${COMPONENT}.jsx
  touch src/components/${COMPONENT}/${COMPONENT}.css

  # Add import statements to .jsx files
  cat <<EOL > src/components/${COMPONENT}/${COMPONENT}.jsx
import React from 'react';
import './${COMPONENT}.css';

function ${COMPONENT}() {
  return (
    <div className="${COMPONENT}">
      {/* ${COMPONENT} content goes here */}
    </div>
  );
}

export default ${COMPONENT};
EOL
done

# Create containers folder and container subfolders with .jsx and .css files
CONTAINERS=("LandingPage" "Dashboard" "SignInSignUp")

mkdir -p src/containers
for CONTAINER in "${CONTAINERS[@]}"; do
  mkdir -p src/containers/${CONTAINER}
  touch src/containers/${CONTAINER}/${CONTAINER}.jsx
  touch src/containers/${CONTAINER}/${CONTAINER}.css

  # Add import statements to .jsx files
  cat <<EOL > src/containers/${CONTAINER}/${CONTAINER}.jsx
import React from 'react';
import './${CONTAINER}.css';

function ${CONTAINER}() {
  return (
    <div className="${CONTAINER}">
      {/* ${CONTAINER} content goes here */}
    </div>
  );
}

export default ${CONTAINER};
EOL
done

echo "React project setup complete!"
