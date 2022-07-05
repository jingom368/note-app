import React, { useState, useEffect, useCallback } from 'react'
import { ReactComponent as ChevronLeft } from '../assets/chevron-left.svg'

const NotePage = ({ match, history }) => {

    let noteId = match.params.id
    let [note, setNote] = useState(null)

    let createNote = async () => {
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/`, {
            method: "DELETE",
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        history.push('/')
    }

    let getNote = useCallback(async () => {
        if (noteId === 'new') return
        
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)
    }, [noteId]);

    useEffect(() => {
        getNote()
    }, [getNote, noteId])

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === '') {
            deleteNote()
        } else if (noteId !== 'new') {
            updateNote()
        } else if (noteId === 'new' && note.body !== null) {
            createNote()
        }
        history.push('/')
    }

    let handelChange = (value) => {
        setNote(note => ({...note, 'body': value}))
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ChevronLeft onClick={handleSubmit} />
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            <textarea onChange={(e) => { handelChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage
