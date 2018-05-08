class EditRecordForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            mood: '',
            food: '',
            activity: '',
            foodwant: '',
            activitywant: '',
            grateful: '',
            date:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
            this.setState({
                mood: this.props.record.mood,
                food: this.props.record.food,
                activity: this.props.record.activity,
                foodwant: this.props.record.foodwant,
                activitywant: this.props.record.activitywant,
                grateful: this.props.record.grateful,
                date: this.props.record.date,
                id: this.props.record.id
            })
    }

    handleChange(event){
      this.setState({[event.target.id]: event.target.value})
      console.log(event.target.id, this);
    }

    handleSubmit (event){
      event.preventDefault()
      console.log(this.state);
      this.props.handleUpdateSubmit(this.state)
      this.setState({
          mood: '',
          food: '',
          activity: '',
          foodwant: '',
          activitywant: '',
          grateful: '',
          date: ''
      })
    }


render () {
    return (
        <div className="card-panel pink lighten-2">
            <h2> EditRecordForm Component</h2>
        <div className="row">

        <div className="col s12 m8 l9">
            <h1 className="center-align">How are you feeling today?</h1>

        <div className="row">
            <form className="col s12"
            onSubmit={this.handleSubmit}>
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
                    </div>

                    <div className="input-field col s6">
                        <input id="foodwant" type="text" className="validate"
                            onChange={this.handleChange}
                            value={this.state.foodwant}/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="activity" type="text" className="validate"
                            onChange={this.handleChange}
                            value={this.state.activity}/>
                    </div>

                    <div className="input-field col s6">
                        <input id="activitywant" type="text" className="validate"
                            onChange={this.handleChange}
                            value={this.state.activitywant}/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="grateful" type="text" className="validate"
                        onChange={this.handleChange}
                        value={this.state.grateful}/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input id="date" type="text" className="validate"
                        onChange={this.handleChange}
                        value={this.state.date}/>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col">
                        <button className="left-align btn waves-effect waves-light" type="submit" name="action">
                        <i className="material-icons right"></i>Submit Edits
                        </button>
                    </div>
                </div>
               </form>

               <button onClick = {() => this.props.toggleState('recordsList','editRecord')} className="waves-effect waves-light btn">
               Back to all Records</button>
              </div>
             </div>
            </div>
           </div>
        )
    }
}
