const fetch = require('node-fetch');
const pkg = require('../../package.json');

module.exports = async dfproxy => {
  fetch('https://api.github.com/repos/DFProxy/DFProxy/releases/latest', {
    method: 'get',
    headers: {
      'User-Agent': 'DFProxy'
    }
  })
    .then(res => res.json())
    .then(json => {
      const latestVersion = json.tag_name.replace('v', '');
      const currentVersion = pkg.version;
      if (currentVersion.includes('RC')) return dfproxy.client.write('chat', { message: `{"extra":[{"text":"Your version, ${currentVersion}, is a pre-release!"}],"text":""}`, position: 1 });
      const comparableLatestVersion = latestVersion.split('.');
      const comparableCurrentVersion = currentVersion.split('.');
      if (comparableCurrentVersion[0] < comparableLatestVersion[0]) return dfproxy.client.end('Your DFProxy is outdated! Download the latest version at https://github.com/DFProxy/DFProxy/releases/latest.');
      else if (comparableCurrentVersion[0] === comparableLatestVersion[0]) {
        if (comparableCurrentVersion[1] < comparableLatestVersion[1]) return dfproxy.client.end('Your DFProxy is outdated! Download the latest version at https://github.com/DFProxy/DFProxy/releases/latest.');
        else if (comparableCurrentVersion[1] === comparableLatestVersion[1]) {
          if (comparableCurrentVersion[2] < comparableLatestVersion[2]) return dfproxy.client.end('Your DFProxy is outdated! Download the latest version at https://github.com/DFProxy/DFProxy/releases/latest.');
        }
      }
    })
    .catch(err => {
      console.log(err);
      dfproxy.client.end('Failed to fetch version. For security reasons we ended your connection.\nRead console for the error.');
    });
};
