class App extends React.Component {
  render () {
    return (
      <div>
        <RecordForm />
        </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
