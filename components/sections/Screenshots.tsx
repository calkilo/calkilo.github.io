import Image from 'next/image'

const Screenshots = () => {
  const screenshots = [
    {
      image: '/assest/Startup-1.png',
      title: 'Easy Photo Capture',
      description: 'Point, shoot, and let AI do the rest',
    },
    {
      image: '/assest/Startup-2.png',
      title: 'Instant Results',
      description: 'Get detailed nutrition info in seconds',
    },
    {
      image: '/assest/Startup-3.png',
      title: 'Progress Tracking',
      description: 'Monitor your daily nutrition goals',
    },
  ]

  return (
    <section id="screenshots" className="screenshots">
      <div className="container">
        <div className="section-header">
          <h2>See Calkilo in Action</h2>
          <p>Beautiful, intuitive interface designed for effortless calorie tracking</p>
        </div>
        <div className="screenshots-container">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="screenshot-item">
              <div className="phone-frame">
                <div className="screenshot-content">
                  <Image
                    src={screenshot.image}
                    alt={`Calkilo App - ${screenshot.title}`}
                    className="screenshot-img"
                    width={390}
                    height={844}
                    loading="lazy"
                  />
                </div>
              </div>
              <h4>{screenshot.title}</h4>
              <p>{screenshot.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Screenshots
