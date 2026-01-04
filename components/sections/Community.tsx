const Community = () => {
  const communityFeatures = [
    { icon: 'bi-trophy', title: 'Challenges', description: 'Join challenges to stay motivated and earn rewards!' },
    { icon: 'bi-share', title: 'Share', description: 'Share your achievements and inspire others.' },
    { icon: 'bi-trophy', title: 'LeaderBoard', description: 'Compare with friends and climb the rankings!' },
    { icon: 'bi-person-plus', title: 'Invite your Friends', description: 'Compete health data synchronization.' },
  ]

  return (
    <section id="community" className="community">
      <div className="container">
        <div className="section-header">
          <h2>Join a Thriving Community</h2>
          <p>Invite, share, and get motivated with thousands of health-conscious users.</p>
        </div>
        <div className="community-grid">
          {communityFeatures.map((feature, index) => (
            <div key={index} className="community-card">
              <div className="community-icon">
                <i className={`bi ${feature.icon}`}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Community
