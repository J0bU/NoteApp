import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToQueue, ArchiveOutlined, DeleteOutlined, SaveOutlined, UnarchiveOutlined } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, List, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/note';
import { useSaveNote } from '../../hooks/useSaveNote';
import { useDeleteNote } from '../../hooks/useDeleteNote';
import { useArchiveNote } from '../../hooks/useArchiveNote';
import { useUnArchiveNote } from '../../hooks/useUnArchiveNote';
import { useCreateTag } from '../../hooks/useCreateTag';
import { SidebarTag } from '../components';
import { useDeleteTag } from '../../hooks/useDeleteTag';
import { NoteFilter } from '../components/NoteFilter';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector(state => state.note);
    const { title, description, onInputChange, formState } = useForm(note);
    const { startSaveNote } = useSaveNote();
    const { startDeletingNote } = useDeleteNote();
    const { startArchivingNote } = useArchiveNote();
    const { startUnArchiveNote } = useUnArchiveNote();
    const { startNewTag } = useCreateTag();
    const { startDeletingTag } = useDeleteTag()

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSaved.length > 0) {
            Swal.fire('Message!', messageSaved, 'success');
        }
    }, [messageSaved]);

    const onSaveNote = () => {
        startSaveNote();
    }

    const onDelete = () => {
        startDeletingNote();
    }

    const onArchive = () => {
        startArchivingNote();
    }

    const unArchive = () => {
        startUnArchiveNote();
    }

    const onClickNewTag = () => {
        startNewTag();
    }

    const onClickDeleteTag = () => {
        startDeletingTag();
    }

    return (
        <Grid container direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ marginBottom: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight={"light"} marginTop={1} marginBottom={2}>
                    Welcome!
                </Typography>
            </Grid>
            <Grid item>
                <Button sx={{ color: 'primary.save', padding: 2 }}
                    onClick={onSaveNote}
                    disabled={isSaving} >
                    <SaveOutlined sx={{ fontSize: 30, marginRight: 1 }} />
                    Save Note
                </Button>
            </Grid>
            <Grid container>
                <TextField type='text'
                    name='title'
                    fullWidth
                    placeholder='Write a title for your note...'
                    label='Write a title for your note...'
                    value={title}
                    onChange={onInputChange}
                    sx={{
                        border: 'none', mb: 1, color: 'black'
                    }}
                />
                <TextField type='text'
                    name='description'
                    fullWidth
                    multiline
                    placeholder='What happened today?'
                    label='Description'
                    minRows={5}
                    value={description}
                    onChange={onInputChange}
                    sx={{
                        border: 'none', mb: 1, color: 'black'
                    }} />
            </Grid>
            <Grid container justifyContent='space-between'>
                <Grid item >
                    <Grid item sx={{ m: 2, }}>
                        <TextField
                            type='text'
                            name='tag'
                            fullWidth
                            multiline
                            placeholder='Add new tag'
                            label='Add tag'
                            minRows={2}
                            onChange={onInputChange}
                            sx={{
                                border: 'none', color: 'black',
                            }} />
                    </Grid>
                </Grid>
                <Grid item >
                    {/* TagsList */}
                    <Box >
                        {<List sx={{ display: 'flex', flexDirection: 'row' }} >
                            {
                                note.tags.map((note, index) => (
                                    <SidebarTag key={index} value={note} id={index} />
                                ))
                            }
                        </List>}
                    </Box>
                </Grid>
                <Grid item >
                    <Grid item>
                        <Button onClick={unArchive}
                            sx={{ color: "primary.archive" }}>
                            <UnarchiveOutlined />
                            Unarchive Note
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={onArchive}
                            sx={{ color: "primary.icon" }}>
                            <ArchiveOutlined />
                            Archive Note
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={onDelete}
                            sx={{ color: "primary.delete" }}>
                            <DeleteOutlined />
                            Delete Note
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container direction={"row"} alignItems={'center'} marginLeft={2} marginTop={-3}>
                <Grid item sx={{ mr: 1, ml: 1 }} >
                    <IconButton
                        onClick={onClickNewTag}
                        size='medium'
                        disabled={isSaving}
                        sx={{
                            color: 'primary.strong',
                            backgroundColor: 'primary.icon',
                            mt: 2,
                            ':hover': { backgroundColor: "primary.strong", opacity: 0.9, color: "white" }
                        }}
                    >
                        <AddToQueue sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
                <Grid item sx={{ mr: 1, ml: 1 }}>
                    <IconButton
                        onClick={onClickDeleteTag}
                        size='medium'
                        disabled={isSaving}
                        sx={{
                            color: 'primary.strong',
                            backgroundColor: 'primary.delete',
                            mt: 2,
                            ':hover': { backgroundColor: "secondary.hover", opacity: 0.9 }
                        }}
                    >
                        <DeleteOutlined sx={{ fontSize: 30 }} />
                    </IconButton>
                </Grid>
            </Grid>
            <NoteFilter onChange={onInputChange} />
        </Grid>
    )
}
