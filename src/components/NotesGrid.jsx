import React, {Component} from 'react'
import Masonry from 'react-masonry-component'
import Note from './Note'
import './NotesGrid.css'


class NotesGrid extends Component {
  render() {
    const masonryOptions = {
      itemSelector: '.Note',
      columnWidth: 250,
      gutter: 10,
      isFitWidth: true
    }
    return (
      <Masonry
        className='NoteGrid'
        options={masonryOptions}
      >
      { 
        this.props.notes.map(note => 
          <Note
            key={note.id}
            title={note.title}
            onDelete={this.props.onNoteDelete.bind(null, note)}
            color={note.color}
          >
            {note.text}
          </Note>)
      }
      </Masonry>
    )
  }
}

export default NotesGrid