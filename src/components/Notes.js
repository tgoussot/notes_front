import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiPlus, FiLogOut, FiFileText, FiTrash2, FiHelpCircle } from 'react-icons/fi';
import './Notes.css';
import MarkdownHelpModal from './MarkdownHelpModal';

function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const navigate = useNavigate();

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  const fetchNotes = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/notes`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
        return;
      }
      if (!response.ok) throw new Error('Impossible de charger les notes.');
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Force save when changing notes or unmounting
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  // Force save when changing selected note
  useEffect(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
  }, [selectedNoteId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleCreateNote = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/notes`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error('Impossible de créer la note.');
      const newNote = await response.json();
      setNotes(prevNotes => [newNote, ...prevNotes]);
      setSelectedNoteId(newNote.id);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateTimeoutRef = useRef(null);

  const handleUpdateNote = async (noteId, updatedFields) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/notes/${noteId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });
      if (!response.ok) throw new Error('Échec de la mise à jour de la note');
      const updatedNoteFromServer = await response.json();
      setNotes(prevNotes => prevNotes.map(n => n.id === noteId ? updatedNoteFromServer : n));
    } catch (err) {
      setError(err.message);
    }
  };
  
  const handleNoteChange = (noteId, updatedFields) => {
    // Update UI immediately for responsiveness
    setNotes(prevNotes => prevNotes.map(n => n.id === noteId ? { ...n, ...updatedFields } : n));
    
    // Clear previous timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current);
    }
    
    // Set new timeout to debounce the server update
    updateTimeoutRef.current = setTimeout(() => {
      handleUpdateNote(noteId, updatedFields);
    }, 500); // 500ms debounce delay
  };

  const handleDeleteNote = async (noteId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Échec de la suppression de la note');
      setNotes(prevNotes => prevNotes.filter(n => n.id !== noteId));
      setSelectedNoteId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="notes-container">
      <div className="notes-sidebar">
        <div className="sidebar-header">
          <h1>Mes Notes</h1>
          <div className="sidebar-actions">
            <button onClick={handleCreateNote} className="action-btn"><FiPlus /> Nouvelle</button>
            <button onClick={handleLogout} className="action-btn logout"><FiLogOut /> Déconnexion</button>
          </div>
        </div>
        <ul className="notes-list">
          {notes.map(note => (
            <li
              key={note.id}
              className={`note-item ${selectedNote?.id === note.id ? 'selected' : ''}`}
              onClick={() => setSelectedNoteId(note.id)}
            >
              <div className="note-item-content">
                <h2>{note.title}</h2>
                <p>{new Date(note.updated_at).toLocaleDateString('fr-FR')}</p>
              </div>
              <button
                className="note-delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(note.id);
                }}
              >
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="note-editor-container">
        {selectedNote ? (
          <>
            <div className="md-editor">
              <div className="editor-toolbar">
                <input
                  type="text"
                  className="note-title-input"
                  value={selectedNote.title}
                  onChange={(e) => handleNoteChange(selectedNote.id, { title: e.target.value })}
                  placeholder="Titre de la note..."
                />
                <button onClick={() => setHelpModalOpen(true)} className="help-btn">
                  <FiHelpCircle />
                  <span>Aide</span>
                </button>
              </div>
              <div className="editor-panes">
                <textarea
                  className="md-input"
                  value={selectedNote.content}
                  onChange={(e) => handleNoteChange(selectedNote.id, { content: e.target.value })}
                />
                <div className="md-preview">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedNote.content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-note-selected">
            <FiFileText />
            <span>Sélectionnez une note pour l'éditer ou créez-en une nouvelle.</span>
          </div>
        )}
      </div>
      <MarkdownHelpModal isOpen={isHelpModalOpen} onClose={() => setHelpModalOpen(false)} />
    </div>
  );
}

export default Notes;
