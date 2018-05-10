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

    removeData(myChart) {
        myChart.data.labels.pop();
        myChart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        myChart.update();
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

                        <a onClick = {() => {this.props.deleteRecord(record, index); this.props.removeData(myChart)} } className="waves-effect waves-light btn"><i className="material-icons right">clear</i>Delete</a>

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
    //get Chart Element
    const ctx = document.getElementById("myChart");
    //map over record moods
    const recordMoodArr = data.map(record => record.mood)
    console.log(recordMoodArr);
    //count each instance of mood
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

//store count of each instance of mood
const moodArrObj = [wordFreq(recordMoodArr)]
console.log(moodArrObj);
//grab count of each instance of mood
//https://stackoverflow.com/questions/7391362/retrieving-keys-from-json-array-key-value-pair-dynamically-javascript
const moodVal= Object.values(moodArrObj[0])
console.log(moodVal);
//remove duplicates from moods for chart labels
//https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
const dup = [...new Set(recordMoodArr)];
console.log(dup);
console.log(dup.length);

    myChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: dup,
        datasets: [{
            label: 'All Moods',
            data: moodVal,
            backgroundColor:["#F7AEF8", "#B388EB", "#8093F1", "#72DDF7","#DE369D", "#FFDDE2", "#1DD3B0", "#BDADEA"]
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        events:["click"]
    }
});
myChart.update()
}
