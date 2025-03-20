import { defineStore } from 'pinia';
import type { IPlayer } from '~/types/player';

export const useGameStore = defineStore('game', {
    state: () => ({
        playersList: [] as IPlayer[],
        totalRoundsNumber: 3,
        currentRound: 0
    }),
    getters: {
        getPlayersList: (state) => state.playersList,
        getPlayer: (state) => (playerId: string) => state.playersList.find(player => player.name === playerId),
        getPlayersCount: (state) => state.playersList.length,
        getTotalRoundsNumber: (state) => state.totalRoundsNumber,
        getCurrentRound: (state) => state.currentRound
    },
    actions: {
        /* --- PLAYERS --- */
        addPlayer(player: IPlayer) {
            this.playersList.push(player);
        },
        removePlayer(playerId: string) {
            this.playersList = this.playersList.filter(player => player.name !== playerId);
        },
        savePlayerList(playersList: IPlayer[]) {
            this.playersList = playersList;
        },
        resetPlayersList() {
            this.playersList = [];
        },
        /* --- ROUNDS --- */
        nextRound() {
            this.currentRound++;
        },
        /* --- GAME --- */
        resetGame() {
            this.currentRound = 0;
        }
    }
});