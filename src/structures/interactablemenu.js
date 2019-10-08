class InteractableMenu {
    constructor (dfproxy, options) {
        this.dfproxy = dfproxy;
    
        this.name = options.name || 'unset';
        this.description = options.description || 'No description provided.';
        this.usage = options.usage || '';
      }
}
module.exports = InteractableMenu;