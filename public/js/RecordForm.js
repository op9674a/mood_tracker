class RecordForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            mood: '',
            food: '',
            activity: '',
            foodwant: '',
            activitywant: '',
            grateful: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        if(this.props.record){
            this.setState({
                mood: this.props.record.mood,
                food: this.props.record.food,
                activity: this.props.record.activity,
                foodwant: this.props.record.foodwant,
                activitywant: this.props.record.activitywant,
                grateful: this.props.record.grateful,
                id: this.props.person.id
            })
        }
    }

    handleChange(event){
      this.setState({[event.target.id]: event.target.value})
      console.log(event.target.id, this);
  }

    handleSubmit (event){
      event.preventDefault()
      console.log(this.state);
      this.props.handleSubmit(this.state)
  }

render () {
    return (
        <div className="card-panel pink lighten-2">
            <h2> RecordForm Component</h2>
            <h3>Navbar</h3>

        <div className="row">

        <div className="card-panel grey  col s12 m4 l3">
            <h1> sideNav </h1>
        </div>

        <div className="col s12 m8 l9">
            <h1 className="center-align">How are you feeling today?</h1>

        <div className="row">
            <form className="col s12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <input  id="mood" type="text" placeholder="Mood"
                            className="validate center-align"
                            onChange={this.handleChange}
                            value={this.state.mood}/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="food" type="text" className="validate"
                            onChange={this.handleChange}
                            value={this.state.food}/>
                        <label for="food">What did you eat today?</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="foodwant" type="text" className="validate"
                            onChange={this.handleChange}
                            value={this.state.foodwant}/>
                        <label for="foodwant">What did you want to eat today?</label>
                    </div>
                    </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="activity" type="text" className="validate"
                            onChange={this.handleChange}
                            value={this.state.activity}/>
                            <label for="activity">What did you do today?</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="activitywant" type="text" className="validate"
                            onChange={this.handleChange}
                            value={this.state.activitywant}/>
                        <label for="activitywant">What did you want to do today?</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col">
                        <button className="left-align btn waves-effect waves-light" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
               </form>
              </div>
             </div>
            </div>
           </div>
        )
    }
}
