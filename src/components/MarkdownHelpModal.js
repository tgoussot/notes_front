import React from 'react';
import { FiX } from 'react-icons/fi';
import './MarkdownHelpModal.css';

function MarkdownHelpModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Guide Markdown Complet</h2>
          <button onClick={onClose} className="modal-close-btn">
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          <p>Formatez vos notes avec la syntaxe Markdown pour un rendu professionnel.</p>
          
          <div className="help-section">
            <h3>🎯 Titres et Structure</h3>
            <div className="help-item">
              <code># Titre Principal</code>
              <span className="help-result">→ Titre de niveau 1 (le plus grand)</span>
            </div>
            <div className="help-item">
              <code>## Sous-titre</code>
              <span className="help-result">→ Titre de niveau 2</span>
            </div>
            <div className="help-item">
              <code>### Section</code>
              <span className="help-result">→ Titre de niveau 3</span>
            </div>
            <div className="help-item">
              <code>---</code>
              <span className="help-result">→ Ligne de séparation horizontale</span>
            </div>
          </div>

          <div className="help-section">
            <h3>✨ Mise en Forme du Texte</h3>
            <div className="help-item">
              <code>**texte en gras**</code>
              <span className="help-result">→ <strong>texte en gras</strong></span>
            </div>
            <div className="help-item">
              <code>*texte en italique*</code>
              <span className="help-result">→ <em>texte en italique</em></span>
            </div>
            <div className="help-item">
              <code>***gras et italique***</code>
              <span className="help-result">→ <strong><em>gras et italique</em></strong></span>
            </div>
            <div className="help-item">
              <code>~~texte barré~~</code>
              <span className="help-result">→ <del>texte barré</del></span>
            </div>
            <div className="help-item">
              <code>`code en ligne`</code>
              <span className="help-result">→ Code surligné</span>
            </div>
          </div>

          <div className="help-section">
            <h3>📝 Listes</h3>
            <div className="help-item">
              <code>
                - Élément de liste<br />
                - Autre élément<br />
                &nbsp;&nbsp;- Sous-élément
              </code>
              <span className="help-result">→ Liste à puces avec indentation</span>
            </div>
            <div className="help-item">
              <code>
                1. Premier élément<br />
                2. Deuxième élément<br />
                3. Troisième élément
              </code>
              <span className="help-result">→ Liste numérotée</span>
            </div>
            <div className="help-item">
              <code>
                - [x] Tâche terminée<br />
                - [ ] Tâche à faire
              </code>
              <span className="help-result">→ Liste de tâches (checkbox)</span>
            </div>
          </div>

          <div className="help-section">
            <h3>🔗 Liens et Citations</h3>
            <div className="help-item">
              <code>[Texte du lien](https://exemple.com)</code>
              <span className="help-result">→ Lien cliquable</span>
            </div>
            <div className="help-item">
              <code>
                &gt; Ceci est une citation<br />
                &gt; Sur plusieurs lignes
              </code>
              <span className="help-result">→ Bloc de citation indenté</span>
            </div>
          </div>

          <div className="help-section">
            <h3>💻 Code</h3>
            <div className="help-item">
              <pre><code>{`\`\`\`javascript
function exemple() {
  console.log("Hello World!");
}
\`\`\``}</code></pre>
              <span className="help-result">→ Bloc de code avec coloration syntaxique</span>
            </div>
          </div>

          <div className="help-section">
            <h3>📊 Tableaux</h3>
            <div className="help-item">
              <pre><code>{`| Nom | Âge | Ville |
|-----|-----|-------|
| Jean | 25 | Paris |
| Marie | 30 | Lyon |`}</code></pre>
              <span className="help-result">→ Tableau formaté</span>
            </div>
          </div>

          <div className="help-section">
            <h3>💡 Conseils Pratiques</h3>
            <ul className="tips-list">
              <li>Utilisez des titres pour structurer vos notes</li>
              <li>Laissez une ligne vide entre les paragraphes</li>
              <li>Utilisez les listes pour organiser l'information</li>
              <li>Les citations sont parfaites pour les références</li>
              <li>Combinez plusieurs éléments pour un rendu riche</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkdownHelpModal; 