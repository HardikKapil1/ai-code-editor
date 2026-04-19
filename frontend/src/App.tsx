import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import CodebaseGraph from './components/CodebaseGraph';

const BACKEND_URL = 'http://localhost:3000';

function App() {
  const [code, setCode] = useState('// Write your code here');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [explainResult, setExplainResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'optimize' | 'explain'>('optimize');

  const handleOptimize = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/ai/optimize`, { code });
      setResult(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleExplain = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/ai/explain`, {
        files: { 'current-file.ts': code },
      });
      setExplainResult(response.data);
      setActiveTab('explain');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#1e1e1e' }}>
      
      {/* Left Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
        
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', padding: '10px' }}>
          <button
            onClick={handleOptimize}
            disabled={loading}
            style={{
              background: loading ? '#555' : '#7c3aed',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Loading...' : '⚡ Optimize'}
          </button>

          <button
            onClick={handleExplain}
            disabled={loading}
            style={{
              background: loading ? '#555' : '#059669',
              color: '#fff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Loading...' : '🔍 Explain'}
          </button>
        </div>

        {/* Editor */}
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(val) => setCode(val ?? '')}
          theme="vs-dark"
        />
      </div>

      {/* Right Panel */}
      <div
        style={{
          width: '40%',
          background: '#252526',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
          <button
            onClick={() => setActiveTab('optimize')}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === 'optimize' ? '#7c3aed' : 'transparent',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            ⚡ Optimize
          </button>

          <button
            onClick={() => setActiveTab('explain')}
            style={{
              flex: 1,
              padding: '10px',
              background: activeTab === 'explain' ? '#059669' : 'transparent',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            🔍 Explain
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          
          {activeTab === 'optimize' && (
            <div style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
              
              {!result && (
                <p style={{ color: '#888', marginTop: '40px', textAlign: 'center' }}>
                  Write code and click Optimize ⚡
                </p>
              )}

              {result && (
                <>
                  <h3 style={{ color: '#7c3aed' }}>✅ Optimized Code</h3>
                  <pre
                    style={{
                      background: '#1e1e1e',
                      color: '#9cdcfe',
                      padding: '12px',
                      borderRadius: '8px',
                      overflowX: 'auto',
                    }}
                  >
                    {result.optimizedCode}
                  </pre>

                  <h3 style={{ color: '#7c3aed' }}>📋 Summary</h3>
                  <p style={{ color: '#ccc' }}>{result.summary}</p>

                  <h3 style={{ color: '#7c3aed' }}>🔧 Changes</h3>
                  {result.changes.map((change: any, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: '#1e1e1e',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <span
                        style={{
                          background: '#7c3aed',
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}
                      >
                        {change.type}
                      </span>

                      <p style={{ color: '#fff', fontWeight: 'bold' }}>
                        {change.title}
                      </p>

                      <p style={{ color: '#888', fontSize: '13px' }}>
                        {change.description}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {activeTab === 'explain' && (
            <div style={{ height: '100%' }}>
              
              {!explainResult && (
                <p style={{ color: '#888', marginTop: '40px', textAlign: 'center' }}>
                  Write code and click Explain 🔍
                </p>
              )}

              {explainResult && <CodebaseGraph data={explainResult} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;