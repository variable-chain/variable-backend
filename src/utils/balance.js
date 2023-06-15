// Class representing user balances
class UserBalances {
    constructor() {
      this.balances = {};
    }
  
    // Add or update user balance
    updateBalance(userId, asset, amount) {
      if (!this.balances[userId]) {
        this.balances[userId] = {};
      }
      if (!this.balances[userId][asset]) {
        this.balances[userId][asset] = 0;
      }
      this.balances[userId][asset] += amount;
    }
  
    // Deduct user balance
    deductBalance(userId, asset, amount) {
      if (!this.balances[userId] || !this.balances[userId][asset]) {
        throw new Error(`Insufficient balance for user ${userId}`);
      }
      if (this.balances[userId][asset] < amount) {
        throw new Error(`Insufficient balance for user ${userId}`);
      }
      this.balances[userId][asset] -= amount;
    }
  
    // Get user balance
    getBalance(userId, asset) {
      if (!this.balances[userId] || !this.balances[userId][asset]) {
        return 0;
      }
      return this.balances[userId][asset];
    }
  
    // Check if user has sufficient balance
    hasSufficientBalance(userId, asset, amount) {
      if (!this.balances[userId] || !this.balances[userId][asset]) {
        return false;
      }
      return this.balances[userId][asset] >= amount;
    }
  }

  module.exports = UserBalances;