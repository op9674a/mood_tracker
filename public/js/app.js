class App extends React.Component {
  render () {
    return (
      <div>
        <Records />
        <Chart />
    </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
