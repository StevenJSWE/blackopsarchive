import { useState } from 'react';

const STATUS_CONFIG = {
  confirmed: { label: 'CONFIRMED', color: '#39ff14' },
  alleged: { label: 'ALLEGED', color: '#cc0000' },
  disputed: { label: 'DISPUTED', color: '#f59e0b' },
};

export default function ArchiveList({ articles }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = {
    all: articles.length,
    confirmed: articles.filter(a => a.status === 'confirmed').length,
    alleged: articles.filter(a => a.status === 'alleged').length,
    disputed: articles.filter(a => a.status === 'disputed').length,
  };

  const filtered = activeFilter === 'all'
    ? articles
    : articles.filter(a => a.status === activeFilter);

  const filters = [
    { key: 'all', label: 'ALL' },
    { key: 'confirmed', label: 'CONFIRMED' },
    { key: 'alleged', label: 'ALLEGED' },
    { key: 'disputed', label: 'DISPUTED' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
        {filters.map(f => {
          const isActive = activeFilter === f.key;
          const color = f.key === 'all' ? '#39ff14' : (STATUS_CONFIG[f.key]?.color || '#39ff14');
          return (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                fontSize: '10px',
                fontFamily: 'IBM Plex Mono, monospace',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                border: `1px solid ${isActive ? color : '#4a4a4a'}`,
                color: isActive ? color : '#707070',
                background: isActive ? `${color}18` : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = color;
                  e.currentTarget.style.color = color;
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#4a4a4a';
                  e.currentTarget.style.color = '#707070';
                }
              }}
            >
              {f.label} ({counts[f.key]})
            </button>
          );
        })}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.map((article, i) => {
          const statusCfg = STATUS_CONFIG[article.status] || STATUS_CONFIG.alleged;
          return (
            <li
              key={article.id}
              style={{
                borderTop: i === 0 ? '1px solid #4a4a4a' : 'none',
                borderBottom: '1px solid #4a4a4a',
              }}
            >
              <a
                href={`/articles/${article.id}`}
                style={{
                  display: 'block',
                  padding: '20px 16px',
                  borderLeft: '2px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderLeftColor = '#39ff14';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderLeftColor = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '10px',
                    color: '#39ff14',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontFamily: 'IBM Plex Mono, monospace',
                  }}>
                    {article.era} · {article.country.join(', ')}
                  </span>
                  <span style={{
                    fontSize: '9px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    letterSpacing: '0.15em',
                    padding: '2px 6px',
                    border: `1px solid ${statusCfg.color}`,
                    color: statusCfg.color,
                  }}>
                    {statusCfg.label}
                  </span>
                  {article.agency && article.agency.length > 0 && (
                    <span style={{
                      fontSize: '9px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      letterSpacing: '0.1em',
                      color: '#4a4a4a',
                    }}>
                      {article.agency.join(' / ')}
                    </span>
                  )}
                </div>
                <h2
                  style={{
                    fontSize: '20px',
                    fontFamily: 'Russo One, sans-serif',
                    color: '#e5e5e5',
                    margin: '0 0 4px 0',
                    letterSpacing: '0.05em',
                    transition: 'color 0.2s',
                  }}
                  className="archive-title"
                >
                  {article.title}
                </h2>
                <p style={{
                  fontSize: '13px',
                  color: '#707070',
                  fontFamily: 'IBM Plex Mono, monospace',
                  margin: 0,
                }}>
                  {article.summary}
                </p>
              </a>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '12px',
          color: '#4a4a4a',
          padding: '40px 0',
          textAlign: 'center',
          letterSpacing: '0.1em',
        }}>
          NO RECORDS FOUND
        </p>
      )}
    </div>
  );
}
