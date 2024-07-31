import { useEffect } from 'react';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

import { NoteLayout } from '../layout/NoteLayout';
import { useCreateNote } from '../../hooks';
import { useLoadingNotes } from '../../hooks/useLoadingNotes';
import { NoteView, NothingSelectedView } from '../views';

export const NotePage = () => {
  const { startNewNote, isSaving, active } = useCreateNote();
  const { startLoadingNotes } = useLoadingNotes();

  const onClickNewNote = () => {
    startNewNote();
  }

  useEffect(() => {
    startLoadingNotes();
  }, []);
  
  return (
    <NoteLayout>
      {
        (!!active) 
        ?  <NoteView /> 
        : <NothingSelectedView />
      }
      
      <IconButton 
      onClick={ onClickNewNote }
      size='large'
      disabled = { isSaving }
      sx={{ 
        color: 'primary.button', 
        backgroundColor: 'primary.details',
        ':hover': {backgroundColor: "secondary.hover", opacity: 0.9}, position: 'fixed', right: 50, 
        bottom: 50
      }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </NoteLayout>

  )
}
