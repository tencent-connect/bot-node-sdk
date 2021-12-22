const { execSync } = require('child_process');

try {
  execSync('npm link');
  execSync('cd example && npm link @tencent-connect/bot-node-sdk');
} catch (error) {}
