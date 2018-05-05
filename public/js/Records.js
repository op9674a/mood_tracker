class Records extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          editRecord: null,
          records: [],
          record: {}
      }
      this.getRecords = this.getRecords.bind(this);
      this.getRecord = this.getRecord.bind(this);
      this.handleCreate = this.handleCreate.bind(this)
      this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
      this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
      this.deleteRecord=this.deleteRecord.bind(this);
      this.closeEdit = this.closeEdit.bind(this)
      this.toggleState = this.toggleState.bind(this);
  }

  componentDidMount(){
        this.getRecords()
  }

  toggleState(index, post){
      this.setState({
      editRecord: index,
      record: record
    })
  }

  closeEdit(x){
    this.setState({
        editRecord: x
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

  handleCreateSubmit(post){
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
        this.getRecords()
      }).catch(error => console.log(error))
    }

    handleUpdateSubmit (post, index){
          fetch('/records/' + record.id, {
              body: JSON.stringify(record),
              method: 'PUT',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
              }
          }).then(updatedRecord => {
              return updatedRecord.json()
          }).then(jsonedPost => {
              this.setState({editRecord: null})
              this.getRecords()
          }).catch(error => console.log(error))
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

  toggleState (st1, st2){
      this.setState({
          [st1]: !this.state[st1],
          [st2]: !this.state[st2]
      })
  }


  render () {
    return (
      <div>
        <h2>Records</h2>


        <RecordForm handleCreate={this.handleCreate} handleSubmit={this.handleCreateSubmit}/>
            <RecordsList
            getRecords={this.getRecords}
            closeEdit = {this.closeEdit}
            handleUpdateSubmit={this.handleUpdateSubmit}
            record={this.state.record}
            editRecord={this.state.editRecord}
            toggleState={this.toggleState}
            records={this.state.records}
            deleteRecord={this.deleteRecord}/>
    </div>

    )
  }
}
