class App extends React.Component {
  render () {
    return (
      <div className="card-panel teal lighten-2">
        <h1> App Component </h1>
        <div>
        <Record />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
