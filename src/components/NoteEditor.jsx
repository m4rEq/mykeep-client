import React, {Component} from 'react'
import "./NoteEditor.less"
import "./tmp.css"


class NoteEditor extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      text: '',
      color: '#fff'
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleNoteAdd = this.handleNoteAdd.bind(this)
  }

  handleTextChange(event) {
    this.setState({text: event.target.value})
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    })
  }

  handleNoteAdd() {
    const newNote = {
      title: this.state.title,
      text: this.state.text,
      color: this.state.color
    }
    //debug
    console.log(newNote)
    
    this.props.onNoteAdd(newNote)
    this.setState({
      text: '', 
      title: '', 
      color: '#fff'
    })
  }

  render() {
    return (
      <div className='NoteEditor'>
        <input type='text'
          className='NoteEditor__title'
          placeholder='Enter title'
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea
          placeholder='Enter note text'
          rows={5}
          className='NoteEditor__text'
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className='NoteEditor__footer'>
          <button
            className='NoteEditor__button'
            disabled={!this.state.text}
            onClick={this.handleNoteAdd}
          >
            Add
          </button>
        </div>
      </div>
    )
  }
}

export default NoteEditor