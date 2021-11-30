const { execSync } = require('child_process');

try {
  execSync("npm link")
  execSync("cd example && npm link @tencent/bot-node-sdk")
} catch (error) {

}

