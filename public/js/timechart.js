class timeChart extends React.Component {
        constructor(props) {
            super(props)

            this.getRecords = this.getRecords.bind(this);
            this.getRecord = this.getRecord.bind(this);
            this.handleCreate = this.handleCreate.bind(this)
            this.handleCreateSubmit = this.handleCreateSubmit.bind(this)
            this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this)
            this.getChartRecords = this.getChartRecords.bind(this)
        }

        componentDidMount() {
            this.getRecords()
        }

        getRecords() {
            fetch('/records')
                .then((response) => response.json()).then((data) => {
                    this.setState({
                        records: data
                    })
                }).catch((error) => console.log(error))
        }

        getRecord(record) {
            this.setState({
                record: record
            })
        }

        handleCreate(record) {
            const updateRecord = this.state.records
            updateRecord.unshift(record)
            this.setState({
                records: updateRecord
            })
        }

        handleCreateSubmit(record) {
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

        handleUpdateSubmit(record, index) {
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


        componentDidMount() {
            this.getChartRecords()
        }

        getChartRecords() {
            fetch('/records')
                .then((response) => response.json())
                .then((data) => {
                    makeChart(data)
                    timeChart(data)
                }).catch((error) => console.log(error))
        }


        render() {
            return <div > Hi < /div>
        }



        const timeChart = (data) => {
            console.log(data);
            //get Chart Element
            const ctx = document.getElementById("timeChart");
            //map over record moods
            const recordMoodArr = data.map(record => record.mood)
            console.log(recordMoodArr);

            //count each instance of mood
            const wordFreq = arr => {
                let wordCount = {};
                const freqMoodArr = arr.toString().toLowerCase().split(",")
                console.log(freqMoodArr);
                const moodNum = freqMoodArr.forEach(word => {
                    // if the word doesn't exist in our object
                    if (!wordCount[word]) {
                        wordCount[word] = 1;
                    } else {
                        wordCount[word]++;
                    }
                    console.log(wordCount);
                }) // closes forEach function
                return wordCount;
            }

            wordFreq(recordMoodArr)

            //store count of each instance of mood
            const moodArrObj = [wordFreq(recordMoodArr)]
            console.log(moodArrObj);
            //grab count of each instance of mood
            //https://stackoverflow.com/questions/7391362/retrieving-keys-from-json-array-key-value-pair-dynamically-javascript
            const moodVal = Object.values(moodArrObj[0])
            console.log(moodVal);
            //remove duplicates from moods for chart labels
            //https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
            const dup = [...new Set(recordMoodArr)];
            console.log(dup);
            console.log(dup.length);

            timeChart = new Chart(ctx, {
                type: 'line',
                data: dup,
                options: {
                    scales: {
                        xAxes: [{
                            type: 'time',
                            distribution: 'linear'
                        }]
                    }
                }
            })
            timeChart.update()
        }