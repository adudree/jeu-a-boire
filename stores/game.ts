import { defineStore } from 'pinia';
import type { IPlayer } from '~/types/player';

export const useGameStore = defineStore('game', {
    state: () => ({
        playersList: [] as IPlayer[],
    }),
    getters: {
        getPlayersList: (state) => {
            return state.playersList;
        },
        getPlayer: (state) => {
            return (playerId: string) => state.playersList.find(player => player.name === playerId);
        },
        getPlayersCount: (state) => state.playersList.length
    },
    actions: {
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
        }
    }
});