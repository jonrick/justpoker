import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCleanGame, UiGameState, TestGame } from '../shared/models/ui/uiState';

const gameSlice = createSlice({
    name: 'game',
    initialState: getCleanGame(),
    reducers: {
        setTestGame: () => TestGame,
        setGameState: (_state, action: PayloadAction<UiGameState>) => action.payload,
    },
});

export const { setTestGame, setGameState } = gameSlice.actions;
export default gameSlice.reducer;
