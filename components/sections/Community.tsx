const Community = () => {
  const communityFeatures = [
    { icon: 'bi-trophy', title: 'Weekly Challenges', description: 'Join community challenges to stay motivated and earn rewards' },
    { icon: 'bi-people', title: 'Support Groups', description: 'Connect with others on similar health journeys' },
    { icon: 'bi-share', title: 'Share Progress', description: 'Share your achievements and inspire others' },
    { icon: 'bi-star', title: 'Leaderboards', description: 'Compete with friends and climb the rankings' },
  ]

  return (
    <section id="community" className="community">
      <div className="container">
        <div className="section-header">
          <h2>Join a Thriving Community</h2>
          <p>Connect, share, and get motivated with thousands of health-conscious users</p>
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
