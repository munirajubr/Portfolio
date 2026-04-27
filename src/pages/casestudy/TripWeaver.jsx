import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { BackArrowIcon, ArrowUpRightIcon } from '../../utils/icons';

const TripWeaver = () => {
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
              TripWeaver A Tour Plan Guide Web App
            </h1>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #333', fontSize: '12px', fontWeight: 500 }}>Figma</span>
              <span style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #333', fontSize: '12px', fontWeight: 500 }}>Web App</span>
              <span style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid #333', fontSize: '12px', fontWeight: 500 }}>UI Design</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="reveal" style={{ width: '100%', borderRadius: '16px', border: '1px solid #222', overflow: 'hidden' }}>
          <img src="/images/TripWeaver.png" alt="TripWeaver Thumbnail" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>

        {/* Meta Info */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', padding: '32px', background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Timeline</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>2 Months</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Role</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>UI/UX Designer</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Outcome</span>
            <span style={{ fontSize: '18px', fontWeight: 500 }}>Web UI Design</span>
          </div>
        </div>

        {/* Overview */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>
          <SectionHeading>Overview</SectionHeading>
          <p style={{ fontSize: '20px', lineHeight: 1.6, color: '#ccc', fontWeight: 300 }}>
            A web-based tour planning guide that offers personalized recommendations and a user-friendly interface for travelers. The platform helps users discover destinations, plan itineraries, and book experiences seamlessly.
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div style={{ padding: '40px', background: 'linear-gradient(145deg, #0a0a0a, #050505)', border: '1px solid #222', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '24px', color: '#ff5c5c', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>The Problem</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#bbb' }}>
              Travelers often experience decision fatigue when planning a trip due to the sheer volume of fragmented information across blogs, booking sites, and forums. Organizing a coherent itinerary is a stressful and time-consuming process.
            </p>
          </div>
          <div style={{ padding: '40px', background: 'linear-gradient(145deg, #0a0a0a, #050505)', border: '1px solid #222', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '24px', color: '#5cff8a', fontWeight: 400, fontFamily: "'Playfair Display', serif" }}>The Solution</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#bbb' }}>
              TripWeaver centralizes the planning process by offering intuitive drag-and-drop itineraries, personalized recommendations based on travel style, and integrated booking, ensuring a frictionless travel planning experience.
            </p>
          </div>
        </div>

        {/* Design Process */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <SectionHeading>Design Process</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {['Discover', 'Define', 'Ideate', 'Design'].map((phase, i) => {
              const activities = [
                ['User Interviews', 'Surveys', 'Competitive Analysis'],
                ['User Personas', 'Empathy Mapping', 'Problem Statement'],
                ['User Flow', 'Information Architecture', 'Wireframing'],
                ['UI Design', 'Prototyping', 'Usability Testing'],
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
          <SectionHeading>Competitive Analysis</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { name: 'TripAdvisor', strength: 'Massive database of reviews and locations.', weakness: 'Cluttered UI, overwhelming for users trying to build a day-by-day itinerary.' },
              { name: 'Wanderlog', strength: 'Great mapping and collaborative features.', weakness: 'Steep learning curve; mobile app can feel overly complex.' },
              { name: 'Airbnb Experiences', strength: 'Excellent niche local tours.', weakness: 'Limited to activities; does not help with holistic trip scheduling.' },
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
          <SectionHeading>User Research & Empathy</SectionHeading>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ padding: '32px', border: '1px solid #222', borderRadius: '16px', background: '#0a0a0a', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>✈️</div>
                <div>
                  <h4 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Sarah Jenkins</h4>
                  <span style={{ fontSize: '14px', color: '#888' }}>Avid Solo Traveler</span>
                </div>
              </div>
              <p style={{ fontSize: '15px', color: '#ccc', lineHeight: 1.6, fontStyle: 'italic' }}>
                "Sarah travels internationally twice a year. She loves exploring hidden gems but hates juggling 15 different browser tabs to piece her itinerary together."
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <strong style={{ fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Goals</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '8px', color: '#bbb', fontSize: '14px', lineHeight: 1.5 }}>
                    <li>Create a seamless daily schedule</li>
                    <li>Discover authentic local experiences</li>
                    <li>Keep all reservations in one place</li>
                  </ul>
                </div>
                <div>
                  <strong style={{ fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Frustrations</strong>
                  <ul style={{ paddingLeft: '20px', marginTop: '8px', color: '#bbb', fontSize: '14px', lineHeight: 1.5 }}>
                    <li>Losing track of booking emails</li>
                    <li>Miscalculating travel times between spots</li>
                    <li>Generic tourist traps on major sites</li>
                  </ul>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
              <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Says</span>
                <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                  <li>"I need to visualize my route."</li>
                  <li>"Is this museum open on Tuesdays?"</li>
                </ul>
              </div>
              <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Thinks</span>
                <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                  <li>"I hope I didn't overpack my day."</li>
                  <li>"This planning is taking too long."</li>
                </ul>
              </div>
              <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Does</span>
                <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                  <li>Uses Excel for schedules</li>
                  <li>Pins locations on Google Maps</li>
                  <li>Reads extensive travel blogs</li>
                </ul>
              </div>
              <div style={{ padding: '24px', background: '#0a0a0a', border: '1px solid #222', borderRadius: '12px' }}>
                <span style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Feels</span>
                <ul style={{ paddingLeft: '16px', margin: 0, color: '#ddd', fontSize: '13px', lineHeight: 1.5 }}>
                  <li>Excited but stressed</li>
                  <li>Overwhelmed by choices</li>
                  <li>Relieved when the plan is set</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Explore Button */}
        <div className="reveal" style={{ marginTop: '60px', display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://www.behance.net/gallery/232306887/TripWeaver-A-Trip-Planner-Website-UI-Design-Figma?share=1"
            target="_blank"
            rel="noreferrer"
            style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '12px', 
              padding: '16px 32px', background: '#fff', color: '#000', 
              borderRadius: '100px', fontSize: '18px', fontWeight: 600, 
              textDecoration: 'none', transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(255,255,255,0.1)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,255,255,0.1)'; }}
          >
            Explore Full Project
            <ArrowUpRightIcon size={20} color="#000" />
          </a>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default TripWeaver;
