class App extends React.Component {
  render () {
    return (
      <div>
        <Records />
        <Kairos />
        </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
