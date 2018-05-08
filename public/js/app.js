class App extends React.Component {
  render () {
    return (
      <div>
        <Records />
        <Bar />
        </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
