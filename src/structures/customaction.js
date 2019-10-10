class CustomAction {
  constructor (dfproxy, options) {
    this.dfproxy = dfproxy;

    this.name = options.name || 'unset';
    this.description = options.description || 'No description provided.';
    this.usage = options.usage || '';
  }

  chat (text) {
    this.dfproxy.client.write('chat', { message: `{"extra":[{"text":"${text}"}],"text":""}`, position: 1 });
  }

  announce (text) {
    this.dfproxy.client.write('title', { action: 0, text: '{"extra":[{"color":"gray","text":"["},{"color":"green","text":"DFProxy"},{"color":"gray","text":"]"}],"text":""}' });
    this.dfproxy.client.write('title', { action: 1, text: `{"extra":[{"color":"aqua","text":"${text}"}],"text":""}` });
  }

  execute (command) {
    this.dfproxy.client.write('chat', { message: `{"extra":[{"text":"/${command}"}],"text":""}`, position: 1 })
  }
}

module.exports = CustomAction;
