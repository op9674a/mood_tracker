class RecordsList extends React.Component{
    render(){
        return(
            <div>
                {this.props.records.map((record, index) => {
                    return(
                        <h3>{record.mood}</h3>
                    )
                })}
            </div>
)
}
}
