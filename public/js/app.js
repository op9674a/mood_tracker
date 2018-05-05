class App extends React.Component {
  render () {
    return (
      <div>
        <SideNav />
        <Records />
        </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('main')
)
