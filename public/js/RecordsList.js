class RecordsList extends React.Component{
    render(){
        return(
            <div>
                {this.props.records.map((record, index) => {
                    return(
                        <div>
                        <h3 onClick={() => {this.props.toggleState('recordsList','editRecord');
                            this.props.getRecord(record)}}>
                            {record.mood} </h3>
                        <p> {record.food} </p>
                        <p> {record.foodwant} </p>
                        <p> {record.activity} </p>
                        <p> {record.activitywant} </p>
                        <p> {record.grateful} </p>
                        <p> {record.date} </p>


                        <a onClick = {() => this.props.deleteRecord(record, index)} className="waves-effect waves-light btn"><i className="material-icons right">clear</i>Delete</a>
                        </div>
                    )
                })}
            </div>
)
}
}
