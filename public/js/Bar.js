class Bar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mood: '',
            food: '',
            activity: '',
            foodwant: '',
            activitywant: '',
            grateful: '',
            date: ''
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
                date: this.props.record.date,
                id: this.props.record.id
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

render() {
    return (
        <div>
        
        </div>

    )
}
}
