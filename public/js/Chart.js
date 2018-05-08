class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['one', 'two', 'three'],
                datasets:[
                    {label: 'Population',
                data:[
                    1, 2, 3
                ]}
                ]
            }
        }
    }
  render() {

    return (
        <div className="chart">
        <h1>Chart</h1>
            <Bar
                data={this.state.chartData}
                options={{
                    maintainAspectRatio: false
                }}/>
        </div>
    )
  }
}

export default Chart;
