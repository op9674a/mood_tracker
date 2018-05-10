class RecordsList extends React.Component{
    constructor(props){
        super(props)
        this.getChartRecords= this.getChartRecords.bind(this)
    }

    componentDidMount(){
        this.getChartRecords()
    }

    getChartRecords(){
    fetch('/records')
    .then((response)=>response.json())
    .then((data)=>{
        makeChart(data)
    }).catch((error)=>console.log(error))
}

    render(){
        console.log(this);
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

                        <div>

                        </div>
                        </div>
                    )
                })}
            </div>
)
}
}

const makeChart = (data)=> {
    console.log(data);
    const ctx = document.getElementById("myChart");
    //select unique moods es7 unique values form an array
    //create second array to count instance of each unique to replace idNum
    const recordMoodArr = data.map(record => record.mood)
    console.log(recordMoodArr);

    // const idNum = data.map(record => record.id)
    // console.log(idNum);
    const wordFreq = arr => {
        let wordCount = {};
        const freqMoodArr = arr.toString().toLowerCase().split(",")
        console.log(freqMoodArr);
        const moodNum = freqMoodArr.forEach( word => {
            // if the word doesn't exist in our object
            if (!wordCount[word]){
                wordCount[word] = 1;
            } else {
                wordCount[word]++;
            }
            console.log(wordCount);
  }) // closes forEach function
    return wordCount;
}

wordFreq(recordMoodArr)

const moodObjArr = [wordFreq(recordMoodArr)]
console.log(moodObjArr);
const moodVal= Object.values(moodObjArr[0])
console.log(moodVal);




    myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: recordMoodArr,
        datasets: [{
            label: 'All Moods',
            data: moodVal,
            backgroundColor: [
                'red','pink','blue','green','purple','orange'
            ]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}
