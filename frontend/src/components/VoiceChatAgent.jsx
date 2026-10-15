import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Radio, 
  MessageSquare, 
  AudioWaveform as WaveformIcon,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  TrendingUp,
  CornerDownLeft
} from 'lucide-react';

export default function VoiceChatAgent({ stock }) {
  const [activeMode, setActiveMode] = useState('chat'); // 'chat' | 'voice'
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceVolume, setVoiceVolume] = useState(true);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      role: 'assistant',
      time: '10:30 AM',
      text: `Hello! I am your **Financial Market Copilot** powered by FinBERT and Vertex AI. I continuously monitor news sentiment, price momentum, and market perception for **${stock.symbol}**. How can I assist your research today?`,
      tags: ['FinBERT-L9', 'Active Monitor']
    },
    {
      id: 'm2',
      role: 'user',
      time: '10:32 AM',
      text: `Why is ${stock.symbol} sentiment currently rated as ${stock.sentiment.label} at ${stock.sentiment.score}%?`,
    },
    {
      id: 'm3',
      role: 'assistant',
      time: '10:32 AM',
      text: `NLP evaluated **${stock.corpus.volume} articles** across ${stock.corpus.outlets} institutional outlets in the rolling 24h window:\n\n* **Primary Bullish Catalysts (+0.82)**: Omnichannel retail expansion in Tier-2 Indian hubs and double-digit digital subscriber growth.\n* **Offsetting Headwinds (-0.45)**: Crude benchmark recalibrations affecting short-term domestic refining margins.\n\n$$\\text{Pearson Correlation } r = ${stock.priceVsSentiment.pearson}$$ indicating high positive alignment between sentiment and price trajectory.`,
      tags: ['Divergence Analysis', 'Confidence: 94.2%']
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const newMsg = {
      id: `m-${Date.now()}`,
      role: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText
    };

    setMessages((prev) => [...prev, newMsg]);
    setChatInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiReply = {
        id: `m-${Date.now() + 1}`,
        role: 'assistant',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Based on real-time NLP ingestion for **${stock.symbol}**, news sentiment is **${stock.sentiment.score}% Bullish** (Z-Score ${stock.polarity.zscore}).\n\nRecent institutional signals suggest volume stability index is solid at **${stock.velocityMix.hvsi}**, with strong negative floor absorption. Would you like a breakdown of specific sector headline sources?`,
        tags: ['Real-Time Analysis', 'NLP Engine']
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 800);
  };

  const handlePromptClick = (promptText) => {
    setChatInput(promptText);
  };

  const toggleVoiceListen = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate listening then response
      setTimeout(() => {
        setIsListening(false);
        setIsSpeaking(true);
        setTimeout(() => setIsSpeaking(false), 3500);
      }, 3000);
    }
  };

  const samplePrompts = [
    `Explain ${stock.symbol} bullish momentum`,
    `Summarize top 3 news catalysts`,
    `Check price vs sentiment divergence`,
    `What is the negative sentiment floor?`
  ];

  return (
    <div className="copilot-card">
      {/* Header with Title and Mode Switcher */}
      <div className="copilot-header">
        <div className="copilot-title-group">
          <div className="copilot-icon-badge">
            <Bot size={18} className="copilot-bot-icon" />
          </div>
          <div>
            <div className="copilot-title-row">
              <h2 className="copilot-title-text">Financial Copilot</h2>
              <span className="copilot-model-pill">Gemini & FinBERT</span>
            </div>
            <div className="copilot-status-sub">
              <span className="active-green-dot"></span>
              <span>Autonomous Market Intelligence</span>
            </div>
          </div>
        </div>

        {/* Mode Selector (Chat / Voice) */}
        <div className="copilot-mode-tabs">
          <button
            className={`mode-tab-btn ${activeMode === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveMode('chat')}
            title="Chat Assistant"
          >
            <MessageSquare size={13} />
            <span>Chat</span>
          </button>
          <button
            className={`mode-tab-btn ${activeMode === 'voice' ? 'active' : ''}`}
            onClick={() => setActiveMode('voice')}
            title="Voice Agent"
          >
            <Mic size={13} />
            <span>Voice</span>
          </button>
        </div>
      </div>

      {/* CONTENT AREA: CHAT OR VOICE */}
      {activeMode === 'voice' ? (
        /* ================= VOICE AGENT VIEW ================= */
        <div className="voice-agent-view">
          <div className="voice-status-banner">
            <div className="voice-pulse-ring">
              <div className={`voice-center-sphere ${isListening ? 'listening' : isSpeaking ? 'speaking' : ''}`}>
                <Mic size={28} className="voice-mic-hero" />
              </div>
            </div>

            <h3 className="voice-state-title">
              {isListening ? 'Listening to your query...' : isSpeaking ? 'Responding via Voice Agent...' : 'Voice Copilot Ready'}
            </h3>
            <p className="voice-state-desc">
              {isListening
                ? 'Speak clearly into your microphone about market sentiment, tickers, or trends.'
                : isSpeaking
                ? `Synthesizing market perception analysis for ${stock.name}...`
                : 'Tap the microphone below to start speaking or ask a query.'}
            </p>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="waveform-container">
            {[40, 65, 30, 85, 95, 60, 45, 75, 90, 50, 70, 85, 40, 60, 80, 55, 35, 70].map((h, i) => (
              <div
                key={i}
                className={`wave-bar ${isListening || isSpeaking ? 'animated' : ''}`}
                style={{
                  height: isListening || isSpeaking ? `${h}%` : '20%',
                  animationDelay: `${(i * 0.08).toFixed(2)}s`
                }}
              />
            ))}
          </div>

          {/* Audio Response Player Box */}
          <div className="voice-audio-card">
            <div className="audio-card-top">
              <div className="audio-info">
                <Volume2 size={15} className="audio-icon" />
                <span className="audio-title">Audio Briefing: {stock.name.split(' ')[0]} 24h Sentiment</span>
              </div>
              <span className="audio-duration">0:18 / 0:42</span>
            </div>
            <div className="audio-scrubber-track">
              <div className="audio-scrubber-progress" style={{ width: isSpeaking ? '65%' : '35%' }}></div>
            </div>
          </div>

          {/* Voice Prompt Suggestions */}
          <div className="voice-quick-prompts">
            <span className="quick-prompts-label">Try asking:</span>
            <div className="quick-prompt-chips">
              {samplePrompts.slice(0, 3).map((prompt, idx) => (
                <button
                  key={idx}
                  className="voice-chip-btn"
                  onClick={() => {
                    setIsListening(true);
                    setTimeout(() => {
                      setIsListening(false);
                      setIsSpeaking(true);
                      setTimeout(() => setIsSpeaking(false), 3000);
                    }, 1500);
                  }}
                >
                  <Sparkles size={11} className="chip-sparkle" />
                  <span>"{prompt}"</span>
                </button>
              ))}
            </div>
          </div>

          {/* Voice Action Controls */}
          <div className="voice-bottom-controls">
            <button
              className={`voice-action-btn ${isListening ? 'active-listening' : ''}`}
              onClick={toggleVoiceListen}
            >
              {isListening ? (
                <>
                  <MicOff size={16} />
                  <span>Stop Listening</span>
                </>
              ) : (
                <>
                  <Mic size={16} />
                  <span>Start Voice Query</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* ================= CHAT AGENT VIEW ================= */
        <div className="chat-agent-view">
          {/* Messages Container */}
          <div className="chat-messages-container">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chat-bubble-wrapper ${msg.role === 'user' ? 'user-msg' : 'assistant-msg'}`}
              >
                <div className="chat-avatar">
                  {msg.role === 'user' ? (
                    <span className="avatar-user">You</span>
                  ) : (
                    <Bot size={14} className="avatar-bot" />
                  )}
                </div>

                <div className="chat-bubble-content">
                  <div className="chat-msg-header">
                    <span className="chat-msg-author">
                      {msg.role === 'user' ? 'Investor' : 'Sentix Copilot'}
                    </span>
                    <span className="chat-msg-time">{msg.time}</span>
                  </div>

                  <div className="chat-msg-body">
                    {msg.text.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx}>
                        {para.startsWith('* ') ? (
                          <span className="bullet-point">{para}</span>
                        ) : (
                          para
                        )}
                      </p>
                    ))}
                  </div>

                  {msg.tags && (
                    <div className="chat-msg-tags">
                      {msg.tags.map((t, idx) => (
                        <span key={idx} className="msg-tag-pill">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="suggested-prompts-bar">
            {samplePrompts.slice(0, 2).map((prompt, idx) => (
              <button
                key={idx}
                className="prompt-suggestion-pill"
                onClick={() => handlePromptClick(prompt)}
              >
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Chat Input Box */}
          <form className="chat-input-box" onSubmit={handleSendMessage}>
            <button
              type="button"
              className="chat-voice-inline-btn"
              onClick={() => setActiveMode('voice')}
              title="Switch to Voice Mode"
            >
              <Mic size={15} />
            </button>

            <input
              type="text"
              className="chat-text-input"
              placeholder="Ask Copilot about sentiment, news, or price..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />

            <button
              type="submit"
              className="chat-send-btn"
              disabled={!chatInput.trim()}
              title="Send message"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
