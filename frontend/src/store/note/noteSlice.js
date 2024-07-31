import { createSlice } from '@reduxjs/toolkit';

export const noteSlice = createSlice({
    name: 'note',
    initialState: {
        isSaving: false,
        messageSaved: "",
        notes: [],
        tags: [],
        filter: [],
        active: null,
    },
    reducers: {
        isSavingNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setActiveTag: (state, action) => {
            state.active.tag = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
            state.tags = action.payload.tags;
        },
        setSaving: (state,) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updatedNote: (state, action) => {

            state.isSaving = false;
            const index = state.notes.findIndex(e => e.id == action.payload.id);
            state.notes[index] = action.payload;

            state.messageSaved = `${action.payload.title}, updated successfully!`;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(note => note.id !== action.payload);
            state.isSaving = false;
        },
        archiveNoteById: (state, action) => {
            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }
                return note;
            });
            state.isSaving = false;
            state.messageSaved = `The note was archived!`;

        },
        unArchiveNoteById: (state, action) => {

            state.notes = state.notes.map(note => {
                if (note.id === action.payload.id) {
                    return action.payload;
                }

                return note;
            });
            state.isSaving = false;
            state.messageSaved = `The note was unarchived!`;
        },
        addNewTag: (state, action) => {
            state.active.tags = action.payload.tags;
            const index = state.notes.findIndex(e => e.id == action.payload.id);
            state.notes[index].tags = action.payload.tags;
            state.isSaving = false;
        },
        deleteTag: (state, action) => {
            state.active.tags = action.payload.tags;
            const index = state.notes.findIndex(e => e.id == action.payload.id);
            state.notes[index].tags = action.payload.tags;
            state.isSaving = false;
        },
        filterSearch: (state, action) => {
            state.active.search = action.payload;
            state.filter = action.payload;
        }
    }
});

export const {
    isSavingNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updatedNote,
    deleteNoteById,
    archiveNoteById,
    unArchiveNoteById,
    addNewTag,
    setActiveTag,
    deleteTag,
    filterSearch }
    = noteSlice.actions;