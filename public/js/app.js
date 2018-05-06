class App extends React.Component {
  render () {
    return (
      <div>
        <Records />
        </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
