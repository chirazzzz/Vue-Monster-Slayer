function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      gameActions: []
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttackEnabled() {
      return this.currentRound % 3 !== 2;
    },
    healPlayerHealth() {
      return this.currentRound % 3 !== 1;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player lost
        this.winner = "playerLost";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster lost
        this.winner = "monsterLost";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100,
      this.monsterHealth = 100,
      this.currentRound = 0,
      this.winner = null;
      this.gameActions = []
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monsterHealth -= attackValue;
      this.gameActions.push(`Player attacked Monster for ${attackValue} damage`)
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playerHealth -= attackValue;
      this.gameActions.push(`Monster attacked Player for ${attackValue} damage`)
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(12, 25);
      this.monsterHealth -= attackValue;
      this.gameActions.push(`Player special attacked Monster for ${attackValue} damage`)
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.gameActions.push(`Player healed for ${healValue} health`)
      this.attackPlayer();
    },
    surrender() {
      this.winner = "playerLost"
      this.gameActions.push(`Player surrendered!`)
    }
  },
});

app.mount("#game");
