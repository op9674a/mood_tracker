class Records extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          recordsList: true,
          recordForm: false,
          showRecord: false,
          editRecord: false,
          records: [],
          record: {}
      }
      this.toggleState = this.toggleState.bind(this);
      this.deleteRecord=this.deleteRecord.bind(this);
      this.getRecords = this.getRecords.bind(this);
      this.getRecord = this.getRecord.bind(this);
      this.handleCreate = this.handleCreate.bind(this)
      this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
      this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
      this.closeEdit = this.closeEdit.bind(this)
  }

  componentDidMount(){
        this.getRecords()
  }

  toggleState (st1, st2){
      this.setState({
          [st1]: !this.state[st1],
          [st2]: !this.state[st2]
      })
  }

  getRecords(){
      fetch('/records')
      .then((response)=>response.json()).then((data)=>{
          this.setState({
              records:data
          })
      }).catch((error)=>console.log(error))
  }

  getRecord(record){
      this.setState({record:record})
  }

  handleCreate(record){
      const updateRecord = this.state.records
      updateRecord.unshift(record)
      this.setState({
        records: updateRecord
      })
  }

  handleCreateSubmit(record){
      fetch('/records', {
        method: 'POST',
        body: JSON.stringify(record),
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json()
    }).then(newRecord => {
        this.handleCreate(newRecord)
        this.toggleState('recordForm', 'recordsList')
      }).catch(error => console.log(error))
    }

    handleUpdateSubmit (record, index){
          fetch('/records/' + record.id, {
              body: JSON.stringify(record),
              method: 'PUT',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
              }
          }).then(updateRecord => {
              return updateRecord.json()
          }).then(jsonedRecord => {
              this.getRecords()
              this.toggleState('recordsList', 'editRecord')
          }).catch(error => console.log(error))
    }

    closeEdit(x){
      this.setState({
          editRecord: x
      })
    }

    deleteRecord(record, index){
      fetch('records/' + record.id,
        {method: 'DELETE'}).then(data => {
            this.setState({
                records: [
                    ...this.state.records.slice(0, index),
                    ...this.state.records.slice(index +1)
                ]
            })
        })
  }

  render () {
    return (
      <div>

      {this.state.recordsList ? <button onClick = {() => this.toggleState('recordForm','recordsList')} className="waves-effect waves-light btn">
      <i className="material-icons right">gesture</i>
      How are you feeling today? </button> : ''}

      {this.state.recordsList ?
          <RecordsList
          toggleState = {this.toggleState}
          records = {this.state.records}
          getRecord= {this.getRecord}
          deleteRecord = {this.deleteRecord}/> : ''}

          {this.state.recordForm ?
              <RecordForm
                  toggleState={this.toggleState}
                  handleCreate = {this.handleCreate}
                  handleSubmit = {this.handleCreateSubmit}
                  /> : ''
          }


        {this.state.editRecord ?
            <EditRecordForm
            toggleState={this.toggleState}
            record={this.state.record}
            records={this.state.records}
            handleCreate = {this.handleCreate}
            handleUpdateSubmit={this.handleUpdateSubmit}
            handleSubmit={this.handleSubmit}
            closeEdit={this.closeEdit}
            editRecord={this.state.editRecord}/> : ''
            }
    </div>

    )
  }
}
