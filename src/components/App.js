import React, { Component } from 'react';
import Note from './Note'
import NoteEditor from './NoteEditor'
import NotesGrid from './NotesGrid'

import NotesStore from '../stores/NotesStore'
import NotesActions from '../actions/NotesActions'

import "./App.css"

function getStateFromFlux() {
  return {
    isLoading: NotesStore.isLoading(),
    notes: NotesStore.getNotes()
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = getStateFromFlux()
    this.handleNoteAdd = this.handleNoteAdd.bind(this)
    this.handleNoteDelete = this.handleNoteDelete.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount() {
    NotesActions.loadNotes()
  }

  // Подписаться на изменение store
  componentDidMount() {
    NotesStore.addChangeListener(this._onChange)
  }

  // Отписаться от изменения store
  componentWillUnmount() {
    NotesStore.removeChangeListener(this._onChange)
  }
  
  handleNoteAdd(data) {
    NotesActions.createNote(data)
  }

  handleNoteDelete(note) {
    NotesActions.deleteNote(note.id)
  }
  
  _onChange() {
    this.setState(getStateFromFlux())
  }

  render() {
    return ( <div className="App">
      <h2 className="App__header">NotesApp</h2>
      <Note />
      <NoteEditor onNoteAdd={this.handleNoteAdd} /> 
      <NotesGrid 
        notes={this.state.notes}
        onNoteDelete={this.handleNoteDelete}
      />
    </div>
    );
  }
}

export default App;
