import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BackArrowIcon } from '../../utils/icons';

const WhatsappPainpoints = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
      { threshold: 0.08 }
    );
    pageRef.current?.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const SectionHeading = ({ children }) => (
    <h2 className="reveal" style={{ fontSize: '32px', fontWeight: 300, fontFamily: "'Playfair Display', serif", color: '#fff', borderBottom: '1px solid #333', paddingBottom: '16px', marginBottom: '32px' }}>
      {children}
    </h2>
  );

  return (
    <div ref={pageRef} style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fff' }}>
      <Navbar />

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', width: '100%', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'none', border: '1px solid #333', padding: '10px 20px', borderRadius: '100px', cursor: 'pointer', alignSelf: 'flex-start', color: '#fff', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#111'; e.currentTarget.style.borderColor = '#555'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = '#333'; }}
          >
            <BackArrowIcon size={20} color="#fff" />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Back to Projects</span>
          </button>

          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 300, fontFamily: "'Playfair Display', serif", lineHeight: 1.1, margin: 0 }}>
              WhatsApp Channel Update
            </h1>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #333', fontSize: '12px', fontWeight: 500 }}>User Research</span>
              <span style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #333', fontSize: '12px', fontWeight: 500 }}>UX Audit</span>
              <span style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #333', fontSize: '12px', fontWeight: 500 }}>Case Study</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="reveal" style={{ width: '100%', borderRadius: '16px', border: '1px solid #222', overflow: 'hidden' }}>
          <img src="/images/whatsappchannelupdate.png" alt="WhatsApp Painpoints Thumbnail" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        {/* Meta Info */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', padding: '32px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Timeline</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>1 Month</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Role</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>UX Researcher</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Outcome</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>Research Report</span>
          </div>
        </div>

        {/* Overview */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
          <SectionHeading>Overview</SectionHeading>
          <p style={{ fontSize: '20px', lineHeight: 1.6, color: '#ccc', fontWeight: 300 }}>
            While exploring WhatsApp's Channels feature, I identified a key usability issue for non-tech-savvy users. This study explores the confusion caused by sudden UI layout changes when unintentionally following a channel, and proposes a streamlined integration of Channels and Communities to enhance usability for everyday users.
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div style={{ padding: '40px', background: 'linear-gradient(145deg, #0a0a0a, #050505)', border: '1px solid #222', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '24px', color: '#ff5c5c', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>The Problem Space</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#bbb' }}>
              When a user unintentionally follows a channel from the Updates tab, the entire UI layout changes. This can lead to significant confusion and disorientation, especially for users who are unfamiliar with platform navigation and rely on WhatsApp primarily for simple communication.
            </p>
          </div>
          <div style={{ padding: '40px', background: 'linear-gradient(145deg, #0a0a0a, #050505)', border: '1px solid #222', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '24px', color: '#5cff8a', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>The Proposed Solution</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#bbb' }}>
              Since both Channels and Communities function similarly in terms of restricted messaging (only admins can post), I proposed integrating them into a unified interface. By adding a simplified in-page structure with a mini navigation bar, users can easily switch between Channels and Communities, maintaining a consistent and intuitive experience.
            </p>
          </div>
        </div>

        {/* Design Process */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <SectionHeading>Research Process</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {['Plan', 'Conduct', 'Analyze', 'Report'].map((phase, i) => {
              const activities = [
                ['Define Objectives', 'Screener Surveys', 'Discussion Guide'],
                ['Contextual Inquiry', '1-on-1 Interviews', 'Usability Testing'],
                ['Affinity Mapping', 'Thematic Analysis', 'Painpoint Scoring'],
                ['Insights Generation', 'Redesign Proposals', 'Presentation'],
              ][i];
              return (
                <div key={i} style={{ padding: '24px', border: '1px solid #222', borderRadius: '12px', background: '#0a0a0a' }}>
                  <h4 style={{ fontSize: '18px', fontWeight: 500, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: '#222', borderRadius: '4px', color: '#888' }}>0{i + 1}</span>
                    {phase}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activities.map((act, j) => (
                      <li key={j} style={{ fontSize: '14px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '4px', height: '4px', background: '#555', borderRadius: '50%' }}></span>
                        {act}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competitive Analysis */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <SectionHeading>Competitive Benchmarking</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'Telegram Channels', strength: 'Clean separation of personal chats and broadcast channels. Intuitive search and discoverability.', weakness: 'Can still feel overwhelming if subscribed to too many active channels.' },
              { name: 'Instagram Broadcasts', strength: 'Integrated natively into DMs but visually distinct. Highly engaging for followers.', weakness: 'Clutters the primary messaging inbox instead of having a dedicated tab.' },
            ].map((comp, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', padding: '24px', border: '1px solid #222', borderRadius: '12px', background: '#0a0a0a' }}>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center' }}>{comp.name}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#5cff8a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Strengths</span>
                  <span style={{ fontSize: '14px', color: '#bbb', lineHeight: 1.5 }}>{comp.strength}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#ff5c5c', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Weaknesses</span>
                  <span style={{ fontSize: '14px', color: '#bbb', lineHeight: 1.5 }}>{comp.weakness}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Persona & Empathy Map */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          <SectionHeading>User Profile & Empathy</SectionHeading>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ padding: '32px', border: '1px solid #222', borderRadius: '16px', background: '#0a0a0a', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>📱</div>
                <div>
                  <h4 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Priya Sharma</h4>
                  <span style={{ fontSize: '14px', color: '#888' }}>Everyday WhatsApp User</span>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: '#ccc', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Priya uses WhatsApp primarily to keep up with family and close friends. She loved the old Status feature because it felt intimate and personal."
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <strong style={{ fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Goals</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '8px', color: '#bbb', fontSize: '14px', lineHeight: 1.5 }}>
                    <li>View friends' status updates easily</li>
                    <li>Avoid irrelevant brand content</li>
                    <li>Maintain a clean, simple interface</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Frustrations</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '8px', color: '#bbb', fontSize: '14px', lineHeight: 1.5 }}>
                    <li>The new horizontal status scrolling</li>
                    <li>Accidental clicks on celebrity channels</li>
                    <li>Feeling like her personal space was invaded by ads</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Says</span>
                <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                  <li>"Where did the old statuses go?"</li>
                  <li>"I don't care about these news channels."</li>
                </ul>
              </div>
              <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Thinks</span>
                <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                  <li>"WhatsApp is turning into Instagram."</li>
                  <li>"This interface is too cluttered now."</li>
                </ul>
              </div>
              <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Does</span>
                <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                  <li>Ignores the Updates tab entirely</li>
                  <li>Searches settings to disable channels</li>
                  <li>Complains to friends about the UI</li>
                </ul>
              </div>
              <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Feels</span>
                <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                  <li>Nostalgic for the old design</li>
                  <li>Annoyed by forced features</li>
                  <li>Disconnected from personal updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default WhatsappPainpoints;
