const request = require('request');
const pkg = require('../../package.json');

var options = {
  url: 'https://api.github.com/repos/DFProxy/DFProxy/releases/latest',
  headers: {
    'User-Agent': 'DFProxy'
  }
};

module.exports = async dfproxy => {
  request(options, async function (error, response, body) {
    const latestVersion = await JSON.parse(body).tag_name.replace('v', '');
    const currentVersion = pkg.version;
    if (currentVersion.includes('RC')) return dfproxy.client.write('chat', { message: `{"extra":[{"text":"Your version, ${currentVersion}, is a pre-release!"}],"text":""}`, position: 1 });
    const comparableLatestVersion = latestVersion.split('.');
    const comparableCurrentVersion = currentVersion.split('.');
    if (comparableCurrentVersion[0] < comparableLatestVersion[0]) return dfproxy.client.end('Your DFProxy is outdated! Download the latest version at https://github.com/DFProxy/DFProxy/releases/latest.');
    else if (comparableCurrentVersion[0] === comparableLatestVersion[0]) {
      if (comparableCurrentVersion[1] < comparableLatestVersion[1]) return dfproxy.client.end('Your DFProxy is outdated! Download the latest version at https://github.com/DFProxy/DFProxy/releases/latest.');
      else if (comparableCurrentVersion[1] === comparableLatestVersion[1]) {
        if (comparableCurrentVersion[2] < comparableLatestVersion[2]) return dfproxy.client.end('Your DFProxy is outdated! Download the latest version at https://github.com/DFProxy/DFProxy/releases/latest.');
        else return;
      }
    } else return;
  });
};
