import { useState, useContext } from 'react';
import BackgroundThemeContext from '../../../contexts/BackgroundTheme/BackgroundThemeContext';
import './UniversalSmartRenderer.css';

function getType(val) {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (Array.isArray(val)) return 'array';
  return typeof val;
}

function formatKey(key) {
  if (!key) return '';
  return key.replace(/([A-Z])/g, ' $1').replace(/[_-]/g, ' ').replace(/^./, str => str.toUpperCase());
}

// Safely format code strings containing literal "\n" or real newlines
const formatCode = (codeStr) => {
  if (!codeStr) return '';
  return String(codeStr).replace(/\\n/g, '\n');
};

function DataNode({ label, data }) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const dataType = getType(data);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(formatCode(text));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. PRIMITIVES & CODE SNIPPETS
  if (['string', 'number', 'boolean', 'null', 'undefined'].includes(dataType)) {
    const lowerLabel = label?.toLowerCase() || '';
    const isCodeField = lowerLabel === 'code' || (typeof data === 'string' && data.includes('\n') && (data.includes('class ') || data.includes('function ') || data.includes('import ') || data.includes('public ')));
    const isBadgeField = ['status', 'difficulty', 'confidence', 'emoji'].includes(lowerLabel);

    if (isCodeField) {
      return (
        <div className="usr-code-wrapper">
          <div className="usr-code-header">
            <span className="usr-key">{formatKey(label)}</span>
            <button className="usr-copy-btn" onClick={() => handleCopy(data)}>
              {copied ? '✓ Copied' : '📋 Copy Code'}
            </button>
          </div>
          <pre className="usr-code-block">
            <code>{formatCode(data)}</code>
          </pre>
        </div>
      );
    }

    return (
      <div className={`usr-leaf-row ${typeof data === 'string' && data.length > 80 ? 'usr-leaf-block' : ''}`}>
        {label && <span className="usr-key">{formatKey(label)}:</span>}
        {isBadgeField ? (
          <span className={`usr-badge usr-badge-${String(data).toLowerCase()}`}>{String(data)}</span>
        ) : (
          <span className={`usr-value usr-value-${dataType}`}>
            {dataType === 'string' ? `"${data}"` : String(data)}
          </span>
        )}
      </div>
    );
  }

  // 2. ARRAYS
  if (dataType === 'array') {
    const isPrimitiveArray = data.every((item) =>
      ['string', 'number', 'boolean', 'null', 'undefined'].includes(getType(item))
    );

    return (
      <div className="usr-node-container">
        <div className="usr-header" onClick={() => setIsOpen(!isOpen)}>
          <span className={`usr-chevron ${isOpen ? 'usr-open' : ''}`}>▶</span>
          {label && <span className="usr-key usr-container-key">{formatKey(label)}</span>}
          <span className="usr-counter-pill">{data.length} items</span>
        </div>

        {isOpen && (
          <div className="usr-content">
            {isPrimitiveArray ? (
              <div className="usr-tag-list">
                {data.map((item, idx) => (
                  <div key={idx} className="usr-tag-item">
                    <span className="usr-bullet">•</span> {String(item)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="usr-sub-stack">
                {data.map((item, idx) => (
                  <div key={idx} className="usr-sub-card">
                    <div className="usr-sub-card-header">Item #{idx + 1}</div>
                    <DataNode data={item} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // 3. OBJECTS
  if (dataType === 'object') {
    const entries = Object.entries(data);

    return (
      <div className="usr-node-container">
        {label && (
          <div className="usr-header usr-object-header" onClick={() => setIsOpen(!isOpen)}>
            <span className={`usr-chevron ${isOpen ? 'usr-open' : ''}`}>▶</span>
            <span className="usr-key usr-container-key">{formatKey(label)}</span>
            <span className="usr-counter-pill">{entries.length} fields</span>
          </div>
        )}

        {isOpen && (
          <div className={`usr-content ${label ? 'usr-nested-block' : ''}`}>
            {entries.length === 0 ? (
              <span className="usr-empty">Empty object</span>
            ) : (
              entries.map(([subKey, subVal]) => (
                <DataNode key={subKey} label={subKey} data={subVal} />
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default function UniversalSmartRenderer({ data, title = "Analysis completed successfully!" }) {
  const { isDarkModeOn } = useContext(BackgroundThemeContext);

  return (
    <div className={`usr-wrapper ${isDarkModeOn ? 'usr-dark' : 'usr-light'}`}>
      <div className="usr-main-card">
        <div className="usr-card-top">
          <h3>⚡ {title}</h3>
        </div>
        <div className="usr-card-body">
          <DataNode data={data} />
        </div>
      </div>
    </div>
  );
}