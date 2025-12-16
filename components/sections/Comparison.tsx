const Comparison = () => {
  const features = [
    { name: 'AI Photo Recognition', calkilo: true, others: false },
    { name: 'Instant Calorie Calculation', calkilo: true, others: false },
    { name: '99.2% Accuracy', calkilo: true, others: false },
    { name: 'Privacy-First Approach', calkilo: true, others: false },
    { name: 'No Ads (Free Version)', calkilo: true, others: false },
    { name: 'Wearable Integration', calkilo: true, others: true },
    { name: 'Monthly Price', calkilo: '$9.99', others: '$19.99+' },
  ]

  return (
    <section id="comparison" className="comparison">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Calkilo?</h2>
          <p>See how we compare to other calorie tracking apps</p>
        </div>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="highlight">
                  <div className="table-logo">Calkilo</div>
                </th>
                <th>MyFitnessPal</th>
                <th>Lose It!</th>
                <th>Noom</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index}>
                  <td>{feature.name}</td>
                  <td className="highlight">
                    {feature.calkilo === true ? (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    ) : (
                      <strong>{feature.calkilo}</strong>
                    )}
                  </td>
                  <td>
                    {feature.others === true ? (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    ) : feature.others === false ? (
                      <i className="bi bi-dash-circle text-muted"></i>
                    ) : (
                      feature.others
                    )}
                  </td>
                  <td>
                    {feature.others === true ? (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    ) : feature.others === false ? (
                      <i className="bi bi-dash-circle text-muted"></i>
                    ) : (
                      feature.others
                    )}
                  </td>
                  <td>
                    {feature.others === true ? (
                      <i className="bi bi-check-circle-fill text-success"></i>
                    ) : feature.others === false ? (
                      <i className="bi bi-x-circle text-danger"></i>
                    ) : (
                      feature.others
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Comparison
