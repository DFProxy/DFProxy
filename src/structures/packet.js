class Packet {
  constructor (dfproxy, options) {
    /**
             * Spammy :)
             * @type {Spammy}
             */
    this.dfproxy = dfproxy

    this.name = options.name // Packet name
    this.canceled = false
  }

  cancelPacket () {
    this.canceled = true
  }
}

// Export the command class
module.exports = Packet
