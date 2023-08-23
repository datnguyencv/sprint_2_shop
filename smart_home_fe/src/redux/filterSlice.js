import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        searchTerm: '',
        sortBy: null,
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        }
    },
});

export const { setSearchTerm, setSortBy } = filterSlice.actions;
export default filterSlice.reducer;
