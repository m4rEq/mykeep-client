import { EventEmitter } from 'events'

import AppDispatcher from '../dispatcher/AppDispatcher'
import AppConstants from '../constants/AppConstants'

const CHANGE_EVENT = 'change'

let _notes = []
let _loadingError = null
let _isLoading = true

function formatNote(note) {
  return {
    id: note._id,
    title: note.title,
    text: note.text,
    color: note.color || '#fff',
    createdAt: note.createdAt
  }
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
  isLoading() {
    return _isLoading
  },

  getNotes() {
    return _notes
  },

  // Произвести изменение с данными, что бы компноненты могли обновиться
  emitChange() {
    this.emit(CHANGE_EVENT)
  },

  // Подписка на событие
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  },

  // Отписка от события
  removeChangeListener(callback) {
    this.removeChangeListener(CHANGE_EVENT, callback)
  }
})

AppDispatcher.register(function(action) {
  switch(action.type) {
    case AppConstants.LOAD_NOTES_REQUEST: {
      console.log('Load Notes Request')
      _isLoading = true
      TasksStore.emitChange()
      break
    }

    case AppConstants.LOAD_NOTES_SUCCESS: {
      console.log('Load Notes Success')
      _isLoading = false
      _notes = action.notes.map(formatNote)
      _loadingError = null
      TasksStore.emitChange()
      break
    }

    case AppConstants.LOAD_NOTES_FAIL: {
      console.log('Load Notes fail')
      _loadingError = action.error 
      console.log(_loadingError)
      TasksStore.emitChange()
      break
    }

    default: {
      console.log('No such handler')
    }
  }
})

export default TasksStore