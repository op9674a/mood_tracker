class RecordsList extends React.Component{
    render(){
        return(
            <div>
                {this.props.records.map((record, index) => {
                    return(
                        <div>
                        <h3> {record.mood} </h3>
                        <p> {record.food} </p>
                        <p> {record.foodwant} </p>
                        <p> {record.activity} </p>
                        <p> {record.activitywant} </p>
                        <p> {record.grateful} </p>
                        <a onClick = {() => this.props.deleteRecord(record, index)} className="waves-effect waves-light btn"><i className="material-icons right">cloud</i>Delete</a>
                        </div>
                    )
                })}
            </div>
)
}
}
