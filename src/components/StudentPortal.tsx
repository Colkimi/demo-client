import { useState } from 'react'
import MetricCard from './MetricCard'

const initialProfile = {
  name: 'Colkimi',
  studentId: 'PA-2027-001',
  program: 'Software Engineering',
  year: 'Year 4',
  role: 'Student',
  status: 'Enrolled',
  feeBalance: 'ksh. 1,240.00',
  grade: 'D',
}

function StudentPortal() {
  const [profile, setProfile] = useState(initialProfile)
  const [message, setMessage] = useState('')

  function resetDemo() {
    setProfile(initialProfile)
    setMessage('The original demo values have been restored.')
  }

  function simulateSave() {
    setMessage(
      'For educational purposes only: changes made in DevTools are not saved or sent to a server.',
    )
  }

  return (
    <main className="portal-shell">
      <header className="portal-header">
        <div className="brand-mark" aria-hidden="true">
          CM
        </div>

        <div>
          <p className="portal-eyebrow">Pkulel University</p>
          <h1>Student Portal</h1>
        </div>

        <div className="portal-role">
          <span className="status-dot" aria-hidden="true" />
          <span data-demo-field="header-role">{profile.role}</span>
        </div>
      </header>

      <section className="welcome-section">
        <div>
          <p className="section-eyebrow">Academic overview</p>
          <h2>
            Welcome back,{' '}
            <span data-demo-field="student-name">{profile.name}</span>
          </h2>
          <p className="muted-text">
            Review your student account information below.
          </p>
        </div>

        <span className="enrollment-badge" data-demo-field="status">
          {profile.status}
        </span>
      </section>

      <section className="profile-card" aria-labelledby="profile-heading">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Profile</p>
            <h2 id="profile-heading">Student information</h2>
          </div>
        </div>

        <div className="profile-grid">
          <div>
            <span className="field-label">Student name</span>
            <strong data-demo-field="profile-name">{profile.name}</strong>
          </div>

          <div>
            <span className="field-label">Student ID</span>
            <strong data-demo-field="student-id">{profile.studentId}</strong>
          </div>

          <div>
            <span className="field-label">Program</span>
            <strong data-demo-field="program">{profile.program}</strong>
          </div>

          <div>
            <span className="field-label">Academic year</span>
            <strong data-demo-field="year">{profile.year}</strong>
          </div>
        </div>
      </section>

      <section className="metrics-grid" aria-label="Account summary">
        <MetricCard
          label="Fee balance"
          value={profile.feeBalance}
          detail="Due by October 30"
          accent="purple"
        />

        <MetricCard
          label="Current grade"
          value={profile.grade}
          detail="CS-301 · Web Systems"
          accent="green"
        />

        <MetricCard
          label="Account role"
          value={profile.role}
          detail="Standard demo permissions"
          accent="orange"
        />

        <MetricCard
          label="Enrollment"
          value={profile.status}
          detail="Spring 2027 semester"
          accent="blue"
        />
      </section>

      <section className="lesson-card" aria-labelledby="lesson-heading">
        <div className="lesson-icon" aria-hidden="true">
          &lt;/&gt;
        </div>

        <div>
          <p className="section-eyebrow">DevTools exercise</p>
          <h2 id="lesson-heading">Try changing a displayed value</h2>
          <p>
            Open Chrome DevTools, choose the Elements panel, and edit the text
            inside any value marked with <code>data-demo-field</code>. This
            changes only your local browser display.
          </p>
        </div>
      </section>

      <section className="actions-section" aria-label="Demo controls">
        <button type="button" className="secondary-button" onClick={resetDemo}>
          Reset demo values
        </button>

        <button type="button" className="primary-button" onClick={simulateSave}>
          Simulate save
        </button>

        {message && (
          <p className="action-message" role="status">
            {message}
          </p>
        )}
      </section>

      <footer className="portal-footer">
        <span>Fictional interface for client-side trust education</span>
        <span>Local demo · No data is transmitted</span>
      </footer>
    </main>
  )
}

export default StudentPortal