import { useState } from 'react'
import MetricCard from './MetricCard'

type Profile = {
  name: string
  studentId: string
  program: string
  year: string
  role: string
  status: string
  feeBalance: string
  grade: string
}

const initialProfile: Profile = {
  name: 'Colkimi',
  studentId: 'PA-2027-001',
  program: 'Software Engineering',
  year: 'Year 4',
  role: 'Student',
  status: 'Enrolled',
  feeBalance: 'ksh. 1,240.00',
  grade: 'D',
}

const savedProfileKey = 'pkulel-demo-profile'

function loadSavedProfile(): Profile {
  const savedProfile = localStorage.getItem(savedProfileKey)

  if (!savedProfile) {
    return initialProfile
  }

  const savedValues = JSON.parse(savedProfile) as Partial<Profile>

  return {
    ...initialProfile,
    ...savedValues,
  }
}

function StudentPortal() {
  const [profile, setProfile] = useState<Profile>(loadSavedProfile)
  const [message, setMessage] = useState('')

  function resetDemo() {
    localStorage.removeItem(savedProfileKey)
    setProfile(initialProfile)
    setMessage('The original demo values have been restored.')
  }

  function simulateSave() {
      const readEditedField = (fields: string[], currentValue: string) => {
        const values = fields
          .map(
            (field) =>
              document
                .querySelector<HTMLElement>(`[data-demo-field="${field}"]`)
                ?.textContent?.trim() ?? '',
          )
          .filter(Boolean)

        return values.find((value) => value !== currentValue) ?? values[0]
      }

      const editedValues = {
        name: readEditedField(['student-name', 'profile-name'], profile.name),
        role: readEditedField(
          ['header-role', 'role'],
          profile.role,
        ),
        status: readEditedField(['status', 'enrollment'], profile.status),
        feeBalance: readEditedField(['fee-balance'], profile.feeBalance),
        grade: readEditedField(['grade'], profile.grade),
        studentId: readEditedField(['student-id'], profile.studentId),
        program: readEditedField(['program'], profile.program),
        year: readEditedField(['year'], profile.year),
      }

      if (Object.values(editedValues).some((value) => !value)) {
        setMessage('Could not read all demo fields. Please reload the page and try again.')
        return
      }

      const editedProfile = {
        name: editedValues.name ?? profile.name,
        studentId: editedValues.studentId ?? profile.studentId,
        program: editedValues.program ?? profile.program,
        year: editedValues.year ?? profile.year,
        role: editedValues.role ?? profile.role,
        status: editedValues.status ?? profile.status,
        feeBalance: editedValues.feeBalance ?? profile.feeBalance,
        grade: editedValues.grade ?? profile.grade,
      }

      localStorage.setItem(savedProfileKey, JSON.stringify(editedProfile))
      setProfile(editedProfile)
      setMessage(
        'Insecure demo save: edited DOM values were trusted and stored locally. Refresh to see them restored.',
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
          field="fee-balance"
          value={profile.feeBalance}
          detail="Due by October 30"
          accent="purple"
        />

        <MetricCard
          label="Current grade"
          field="grade"
          value={profile.grade}
          detail="CS-301 · Web Systems"
          accent="green"
        />

        <MetricCard
          label="Account role"
          field="role"
          value={profile.role}
          detail="Standard demo permissions"
          accent="orange"
        />

        <MetricCard
          label="Enrollment"
          field="enrollment"
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