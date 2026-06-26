'use client'

import Image from 'next/image'
import './AboutPageContent.scss'

const AboutPageContent = ({ teacherData, locale = 'uk', labels }) => {
  if (!teacherData || !labels) return null

  return (
    <section className="about-page">
      <div className="container">
        {/* Header */}
        <div className="about-page__header">
          <h1 className="about-page__page-title">{teacherData.title}</h1>
          <p className="about-page__teacher-name">{teacherData.fullName}</p>
        </div>

        {/* Introduction Section */}
        <div className="about-page__intro-section">
          <div className="about-page__photo-wrapper">
            <Image
              src="/img/about/1.jpg"
              alt={teacherData.fullName}
              width={400}
              height={400}
              className="about-page__photo"
              priority
            />
          </div>
          <div>
            <p className="about-page__intro-text">{teacherData.intro}</p>
          </div>
        </div>

        {/* Personal Information Section */}
        <section className="about-page__section">
          <h2 className="about-page__section-title">{labels.personalInfo}</h2>
          <div className="about-page__info-item">
            <div className="about-page__info-label">{labels.fullName}</div>
            <div className="about-page__info-value">{teacherData.fullName}</div>
          </div>
          <div className="about-page__info-item">
            <div className="about-page__info-label">{labels.birthDate}</div>
            <div className="about-page__info-value">
              {teacherData.birthDate}, {teacherData.birthPlace}
            </div>
          </div>
          <div className="about-page__info-item">
            <div className="about-page__info-label">{labels.education}</div>
            <div className="about-page__info-value">
              {teacherData.education}, {labels.speciality}:{' '}
              {teacherData.specialty}
            </div>
          </div>
          <div className="about-page__info-item">
            <div className="about-page__info-label">{labels.workplace}</div>
            <div className="about-page__info-value">
              {teacherData.workplace}
            </div>
          </div>
          <div className="about-page__info-item">
            <div className="about-page__info-label">{labels.experience}</div>
            <div className="about-page__info-value">
              {teacherData.workExperienceTotal} {labels.totalExperienceLabel} –{' '}
              {teacherData.workExperiencePedagogical}
            </div>
          </div>
          <div className="about-page__info-item">
            <div className="about-page__info-label">{labels.qualification}</div>
            <div className="about-page__info-value">
              {teacherData.qualification}
            </div>
          </div>
          <div className="about-page__info-item">
            <div className="about-page__info-label">
              {labels.methodicalProblem}
            </div>
            <div className="about-page__info-value">
              «{teacherData.methodicalProblem}»
            </div>
          </div>
        </section>

        {/* Pedagogical Idea Section */}
        <section className="about-page__section">
          <h2 className="about-page__section-title">
            {labels.pedagogicalIdea}
          </h2>
          <p className="about-page__text-block">
            {teacherData.pedagogicalIdeaIntro}
          </p>
          <p className="about-page__text-block about-page__text-block--highlight">
            {teacherData.pedagogicalIdea}
          </p>

          <p className="about-page__text-block">
            {teacherData.crossSkillsIntro}
          </p>
          <ul className="about-page__skills-list">
            {teacherData.crossSkills?.map((skill, index) => (
              <li key={index} className="about-page__skill-item">
                <p className="about-page__skill-text">{skill}</p>
              </li>
            ))}
          </ul>

          <p className="about-page__text-block about-page__text-block--highlight">
            {teacherData.pedagogicalGoal}
          </p>
        </section>

        {/* Teaching Methods Section */}
        <section className="about-page__section">
          <h2 className="about-page__section-title">
            {labels.teachingMethods}
          </h2>

          <div className="about-page__methods-grid">
            <div className="about-page__method-subsection">
              <h3 className="about-page__method-title">
                {labels.technologies}
              </h3>
              <ul className="about-page__method-list">
                {teacherData.technologies?.map((tech, index) => (
                  <li key={index} className="about-page__method-list-item">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-page__method-subsection">
              <h3 className="about-page__method-title">{labels.methods}</h3>
              <ul className="about-page__method-list">
                {teacherData.methods?.map((method, index) => (
                  <li key={index} className="about-page__method-list-item">
                    {method}
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-page__method-subsection">
              <h3 className="about-page__method-title">
                {labels.teachingForms}
              </h3>
              <ul className="about-page__method-list">
                {teacherData.teachingForms?.map((form, index) => (
                  <li key={index} className="about-page__method-list-item">
                    {form}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Effectiveness Section */}
        <section className="about-page__section">
          <h2 className="about-page__section-title">{labels.effectiveness}</h2>
          <p className="about-page__text-block about-page__text-block--highlight">
            {teacherData.effectiveness}
          </p>
        </section>

        {/* Conclusion Section */}
        <section className="about-page__section">
          <h2 className="about-page__section-title">{labels.conclusion}</h2>
          {teacherData.conclusion?.split('\n\n').map((paragraph, index) => (
            <p key={index} className="about-page__text-block">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Credo Section */}
        <section className="about-page__section">
          <h2 className="about-page__section-title">{labels.credo}</h2>
          <p className="about-page__credo">{teacherData.credo}</p>
        </section>

        {/* Contacts Section */}
        <section className="about-page__section">
          <h2 className="about-page__section-title">{labels.contacts}</h2>
          <p className="about-page__email">
            <a
              href={`mailto:${teacherData.email}`}
              className="about-page__email-link"
            >
              {teacherData.email}
            </a>
          </p>
        </section>
      </div>
    </section>
  )
}

export default AboutPageContent
