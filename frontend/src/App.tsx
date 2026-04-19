import { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import CodebaseGraph from './components/CodebaseGraph';

const BACKEND_URL = 'https://ai-code-editor-zkso.onrender.com/';

function App() {
  const [code, setCode] = useState('// Write your code here');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [explainResult, setExplainResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'optimize' | 'explain' | 'memory'>('optimize');
  const [memories, setMemories] = useState<any[]>([])
  const [reason, setReason] = useState('')

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

  const handleAddMemory = async () => {
  if (!reason.trim()) return
  setLoading(true)
  try {
    const response = await axios.post(`${BACKEND_URL}/ai/memory`, {
      code,
      reason,
      fileName: 'current-file.ts'
    })
    setMemories(prev => [response.data, ...prev])
    setReason('')
    setActiveTab('memory')
  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#1e1e1e' }}>
      
      {/* Left Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
        
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px', padding: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleOptimize}
            disabled={loading}
            style={{
              background: loading ? '#555' : '#7c3aed',
              color: '#fff', border: 'none',
              padding: '8px 20px', borderRadius: '6px',
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
              color: '#fff', border: 'none',
              padding: '8px 20px', borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            {loading ? 'Loading...' : '🔍 Explain'}
          </button>

          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Why did you write this code?"
            style={{
              background: '#3d3d3d', color: '#fff',
              border: '1px solid #555', borderRadius: '6px',
              padding: '8px 12px', width: '220px',
              outline: 'none', fontSize: '13px'
            }}
          />

          <button
            onClick={handleAddMemory}
            disabled={loading}
            style={{
              background: loading ? '#555' : '#b45309',
              color: '#fff', border: 'none',
              padding: '8px 20px', borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
            }}
          >
            📌 Remember
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
              flex: 1, padding: '10px',
              background: activeTab === 'optimize' ? '#7c3aed' : 'transparent',
              color: '#fff', border: 'none', cursor: 'pointer'
            }}
          >
            ⚡ Optimize
          </button>

          <button
            onClick={() => setActiveTab('explain')}
            style={{
              flex: 1, padding: '10px',
              background: activeTab === 'explain' ? '#059669' : 'transparent',
              color: '#fff', border: 'none', cursor: 'pointer'
            }}
          >
            🔍 Explain
          </button>

          <button
            onClick={() => setActiveTab('memory')}
            style={{
              flex: 1, padding: '10px',
              background: activeTab === 'memory' ? '#b45309' : 'transparent',
              color: '#fff', border: 'none', cursor: 'pointer'
            }}
          >
            📌 Memory
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

{activeTab === 'memory' && (
  <div style={{ padding: '16px', overflowY: 'auto', height: '100%' }}>
    {memories.length === 0 && (
      <p style={{ color: '#888', marginTop: '40px', textAlign: 'center' }}>
        Write a reason and click Remember 📌
      </p>
    )}
    {memories.map((mem, i) => (
      <div key={i} style={{
        background: '#1e1e1e', borderRadius: '8px',
        padding: '12px', marginBottom: '12px',
        borderLeft: '3px solid #b45309'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#b45309', fontWeight: 'bold', fontSize: '13px' }}>
            {mem.fileName}
          </span>
          <span style={{
            background: '#b45309', color: '#fff',
            padding: '2px 8px', borderRadius: '4px', fontSize: '11px'
          }}>
            {mem.category}
          </span>
        </div>
        <p style={{ color: '#fff', margin: '8px 0 4px', fontSize: '14px' }}>
          {mem.summary}
        </p>
        <p style={{ color: '#888', fontSize: '12px' }}>
          💬 {mem.reason}
        </p>
      </div>
    ))}
  </div>
)}
        </div>
      </div>
    </div>
  );
}

export default App;