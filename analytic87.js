
let data = {
    interval: ""
}

const firebaseConfig = {

    apiKey: "AIzaSyCbcICT3ZbfJWFPLXzbG4UUeWG7Q2OQEjg",
    authDomain: "water-quality-35a00.firebaseapp.com",
    databaseURL: "https://water-quality-35a00-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "water-quality-35a00",
    storageBucket: "water-quality-35a00.appspot.com",
    messagingSenderId: "138665105368",
    appId: "1:138665105368:web:0896a5e8062eb9e49844ad",
    measurementId: "G-NNCT5SYCJJ"
};
// Initialize Firebase//
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();

function updateRotation(command) {
    // let command = document.getElementById('batteryAlertInput').innerHTML
    // console.log(command)
    firebase.database().ref('messages/' + 'Y041653632892487/').update({
        message: command
    })
}

async function SixMonth() {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            // document.getElementById('analyticsBodyId').style.visibility = "visible";
            document.getElementById('chart').style.display = 'none';
            document.getElementById('tdschart').style.display = 'none';
            document.getElementById('phchart').style.display = 'none';
            document.getElementById('tempchart').style.display = 'none';
            document.getElementById('canvas1').style.display = 'block';
            document.getElementById('canvas2').style.display = 'block';
            document.getElementById('phcanvas').style.display = 'block';
            document.getElementById('tempcanvas').style.display = 'block';
            let body = document.getElementById('containerIdAnaylicts');
            body.style.filter = 'blur(10px)';
            body.style.pointerEvents = 'none';
            document.getElementById('loaderAnalytics').style.visibility = "visible";

            // document.getElementById('heading').innerHTML = "line Graph of Six months"
            document.getElementById('6Month').classList.add("active");
            document.getElementById('1Month').classList.remove("active");
            document.getElementById('Week').classList.remove("active");
            document.getElementById('Day').classList.remove("active");
            document.getElementById('realTime').classList.remove("active");
            // button
            data.interval = "6Month"
            let yValue = await getData(data)
            // const sampleInterval = 4320;
            // Get current month and year
            // Get current month and year
            // Get current date
            var currentDate = new Date();

            // Array of month names
            var monthNames = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            // Calculate the last six months with month names
            var xValue_Arr = [];

            for (var i = 0; i < 6; i++) {
                var monthIndex = currentDate.getMonth() - i;
                var year = currentDate.getFullYear();

                if (monthIndex < 0) {
                    // Adjust month index and year if it goes into the previous year
                    monthIndex += 12;
                    year--;
                }

                var monthName = monthNames[monthIndex];
                xValue_Arr.push(monthName + ' ' + year);
            }
            let xValue = xValue_Arr.reverse()
            // Display the last six months array with month names
            // console.log("---------xValue-------------", xValue);




            makeChart(yValue.doValues, yValue.tdsValues, yValue.phValues, yValue.tempValues, xValue)
        } else {
            window.location.href = "index.html"
        }
    })


}

async function OneMonth() {
    document.getElementById('chart').style.display = 'none';
    document.getElementById('tdschart').style.display = 'none';
    document.getElementById('phchart').style.display = 'none';
    document.getElementById('tempchart').style.display = 'none';
    document.getElementById('canvas1').style.display = 'block';
    document.getElementById('canvas2').style.display = 'block';
    document.getElementById('phcanvas').style.display = 'block';
    document.getElementById('tempcanvas').style.display = 'block';
    document.getElementById('6Month').classList.remove("active");
    document.getElementById('1Month').classList.add("active");
    document.getElementById('Week').classList.remove("active");
    document.getElementById('Day').classList.remove("active");
    document.getElementById('realTime').classList.remove("active");
    let body = document.getElementById('containerIdAnaylicts');
    body.style.filter = 'blur(10px)';
    body.style.pointerEvents = 'none';
    document.getElementById('loaderAnalytics').style.visibility = "visible";

    // document.getElementById('heading').innerHTML = "line Graph of One months"

    data.interval = "1Month"
    let yValue = await getData(data)
    // const sampleInterval = 720;

    // Array of month names
    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Get current date
    var currentDate = new Date();

    // Calculate the current date and the dates of the previous 30 days with date, month name, and year
    var last30Days = [];

    for (var i = 0; i < 30; i++) {
        var date = currentDate.getDate();
        var month = currentDate.getMonth();
        var year = currentDate.getFullYear();

        last30Days.push(date + ' ' + monthNames[month] + ' ' + year);

        // Move to the previous day
        currentDate.setDate(currentDate.getDate() - 1);
    }

    // Display the last 30 days array with date, month name, and year
    let xValue = last30Days.reverse()
    // console.log("----------------last 30 Days---------------------", xValue);

    // let xValue = ['Week 1', 'week 2', 'week 3', 'week 4']

    makeChart(yValue.doValues, yValue.tdsValues, yValue.phValues, yValue.tempValues, xValue)
}


async function week() {
    document.getElementById('chart').style.display = 'none';
    document.getElementById('tdschart').style.display = 'none';
    document.getElementById('phchart').style.display = 'none';
    document.getElementById('tempchart').style.display = 'none';
    document.getElementById('canvas1').style.display = 'block';
    document.getElementById('canvas2').style.display = 'block';
    document.getElementById('phcanvas').style.display = 'block';
    document.getElementById('tempcanvas').style.display = 'block';
    document.getElementById('6Month').classList.remove("active");
    document.getElementById('1Month').classList.remove("active");
    document.getElementById('Week').classList.add("active");
    document.getElementById('Day').classList.remove("active");
    document.getElementById('realTime').classList.remove("active");
    let body = document.getElementById('containerIdAnaylicts');
    body.style.filter = 'blur(10px)';
    body.style.pointerEvents = 'none';
    document.getElementById('loaderAnalytics').style.visibility = "visible";

    // document.getElementById('heading').innerHTML = "line Graph of One Week"

    data.interval = "Week"
    let yValue = await getData(data)
    // const sampleInterval = 360;

    // Array of day names
    var dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    // Get current date
    var currentDate = new Date();

    // Calculate the current day and the last seven days with day names
    var lastSevenDays = [];
    for (var i = 0; i < 7; i++) {
        var date = new Date(currentDate);
        date.setDate(date.getDate() - i);

        var dayName = dayNames[date.getDay()];
        lastSevenDays.push(dayName);
    }
    let xValue = lastSevenDays.reverse()
    // Display the last seven days array with day names
    // console.log("------------lastsevendaty-------------",xValue);

    // let xValue = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    makeChart(yValue.doValues, yValue.tdsValues, yValue.phValues, yValue.tempValues, xValue)
}

async function day() {

    document.getElementById('chart').style.display = 'none';
    document.getElementById('tdschart').style.display = 'none';
    document.getElementById('phchart').style.display = 'none';
    document.getElementById('tempchart').style.display = 'none';
    document.getElementById('canvas1').style.display = 'block';
    document.getElementById('canvas2').style.display = 'block';
    document.getElementById('phcanvas').style.display = 'block';
    document.getElementById('tempcanvas').style.display = 'block';
    document.getElementById('analyticsBodyId').style.visibility = "visible";
    document.getElementById('6Month').classList.remove("active");
    document.getElementById('1Month').classList.remove("active");
    document.getElementById('Week').classList.remove("active");
    document.getElementById('Day').classList.add("active");
    document.getElementById('realTime').classList.remove("active");
    // document.getElementById('heading').innerHTML = "line Graph of One Day"

    let body = document.getElementById('containerIdAnaylicts');
    body.style.filter = 'blur(10px)';
    body.style.pointerEvents = 'none';
    document.getElementById('loaderAnalytics').style.visibility = "visible";


    data.interval = "Day"
    let yValue = await getData(data)
    // const sampleInterval = 180;

    // Get current time
    var currentTime = new Date();

    // Get starting time of the day
    var startingTime = new Date();
    startingTime.setHours(0, 0, 0, 0);

    // Create an array to store the times
    var xValue = [];

    // Loop through each hour
    for (var i = 0; i <= currentTime.getHours(); i++) {
        // Create a new date object for the current hour
        var hourTime = new Date(startingTime);
        hourTime.setHours(i);

        xValue.push(hourTime.toLocaleTimeString(),);

        // Break the loop if the current hour equals the current time's hour
        if (i === currentTime.getHours()) {
            break;
        }
    }

    // Display the array
    //console.log("-----------Time Array:-------------", xValue);


    // let xValue = ['01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am', '06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm', '12:00 am']
    makeChart(yValue.doValues, yValue.tdsValues, yValue.phValues, yValue.tempValues, xValue)

    // document.getElementById('6Month').classList.remove("active");
    // document.getElementById('1Month').classList.remove("active");
    // document.getElementById('Week').classList.remove("active");
    // document.getElementById('Day').classList.add("active");
    // // document.getElementById('heading').innerHTML = "line Graph of One Day"

    // document.getElementById('loaderAnalytics').style.visibility = "visible";

    // data.interval = "Day"
    // let yValue = await getData(data)
    // const sampleInterval = 1;
    // makeChart(yValue.doValues, yValue.tdsValues, yValue.phValues, yValue.tempValues, yValue.xValues, sampleInterval)
}

async function realTime() {
    keepAlive()
    async function keepAlive() {
        await firebase.database().ref('keepAlive/' + 'Y041653632892487/' + 'online').on('value', (deviceSattus) => {
            let status = deviceSattus.val()
            if (status == true) {
                document.getElementById('circle').style.backgroundColor = 'green'

            } else if (status == false) {
                document.getElementById('circle').style.backgroundColor = 'red'
            }
        })

    }
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            document.getElementById('analyticsBodyId').style.visibility = "visible";
            document.getElementById('loaderAnalytics').style.visibility = "visible";
            document.getElementById('6Month').classList.remove("active");
            document.getElementById('1Month').classList.remove("active");
            document.getElementById('Week').classList.remove("active");
            document.getElementById('realTime').classList.add("active");
            document.getElementById('Day').classList.remove("active");
            let body = document.getElementById('containerIdAnaylicts');
            body.style.filter = 'blur(10px)';
            body.style.pointerEvents = 'none';
            document.getElementById('canvas1').style.display = 'none';
            document.getElementById('canvas2').style.display = 'none';
            document.getElementById('phcanvas').style.display = 'none';
            document.getElementById('tempcanvas').style.display = 'none';
            document.getElementById('chart').style.display = 'block';
            document.getElementById('tdschart').style.display = 'block';

            document.getElementById('phchart').style.display = 'block';
            document.getElementById('tempchart').style.display = 'block';

            console.log("realtime function called")
            // const firebaseConfig = {

            //     apiKey: "AIzaSyCbcICT3ZbfJWFPLXzbG4UUeWG7Q2OQEjg",
            //     authDomain: "water-quality-35a00.firebaseapp.com",
            //     databaseURL: "https://water-quality-35a00-default-rtdb.asia-southeast1.firebasedatabase.app",
            //     projectId: "water-quality-35a00",
            //     storageBucket: "water-quality-35a00.appspot.com",
            //     messagingSenderId: "138665105368",
            //     appId: "1:138665105368:web:0896a5e8062eb9e49844ad",
            //     measurementId: "G-NNCT5SYCJJ"
            // };
            // // Initialize Firebase//
            // firebase.initializeApp(firebaseConfig);
            // let doData = [20, 40, 50, 60, 70, 80, 90, 10, 20, 60, 50, 40, 40, 35]
            // let phData = [30, 25, 35, 20, 15, 45, 20, 50, 15, 20, 30, 45, 50]
            // let tempData = [10, 15, 20, 10, 60, 10, 50, 10, 20, 35, 20, 15, 30, 35]

            let doData = []
            let phData = []
            let tempData = []
            let tdsData = []
            let realTimeXvalue = []
            firebase.database().ref('data/' + 'Y041653632892487/').orderByValue().limitToLast(10).on('child_added', (snapshot) => {

                var userValue = snapshot.val()
                console.log("-----------userValue----------", userValue)
                let DO = Math.round(parseFloat(userValue.do) * 10) / 10;
                let TDS = userValue.tds
                let PH = Math.round(parseFloat(userValue.ph) * 10) / 10;
                let TEMPERATURE = Math.round(parseFloat(userValue.temperature) * 10) / 10;
                let time = userValue.time
                const date = new Date(time);
                // Convert date to local time format
                const localDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
                let xaxis = date.toLocaleTimeString()

                // var normaltime = new Date(Number(time))

                console.log("all value:", localDate, DO, TDS, PH, TEMPERATURE)
                doData.push(DO)
                phData.push(PH)
                tempData.push(TEMPERATURE)
                tdsData.push(TDS)
                realTimeXvalue.push(localDate)
                if (doData.length > 10) {
                    doData.shift()
                    phData.shift()
                    tempData.shift()
                    tdsData.shift()
                    realTimeXvalue.shift()
                }
                // tdsData.push(TDS)

                // const XAXISRANGE = {
                //     min: 0,
                //     max: 10
                // };
                // let realTimeXvalue = ['01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am', '06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm', '12:00 am']
                let options = {
                    series: [
                        {
                            name: 'DO',
                            data: doData.slice()
                        },
                        // {
                        //     name: 'Ph',
                        //     data: phData.slice()
                        // },
                        // {
                        //     name: 'Temp',
                        //     data: tempData.slice()
                        // },
                        // {
                        //     name: 'tds',
                        //     data: tdsData.slice()
                        // },
                    ],
                    labels: realTimeXvalue,

                    chart: {
                        id: 'realtime',
                        height: 350,
                        type: 'area',
                        stacked: true,
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            dynamicAnimation: {
                                speed: 1000
                            }
                        },
                        toolbar: {
                            show: false
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: ['rgba(255, 13, 29, 0.6)'],
                    stroke: {
                        // curve: 'straight',
                        curve: 'monotoneCubic'
                        // width: 2
                        // colors: ['red', 'blue', 'yellow']
                    },
                    fill: {
                        // // type: 'gradient' / 'solid' / 'pattern' / 'image',
                        // type: ['solid', 'solid', 'solid'],
                        // colors: ['red', 'blue', 'yellow'],
                        // opacity: 0.5

                        // type: 'gradient',
                        // gradient: {
                        //     opacityFrom: 0.6,
                        //     opacityTo: 0.8,
                        // }
                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            stops: [0, 100]
                        }
                        // opacity: 0.9,
                        // colors: ['rgba(255, 0, 0, 0.1)', 'rgba(0, 0, 255, 0.1)', 'rgba(255, 165, 0, 0.1)'],
                    },
                    title: {
                        text: 'DISSOLVED OXYGEN (mgL)',
                        align: 'center',
                    },
                    markers: {
                        size: 0
                    },
                    // xaxis: {
                    //     // type: 'datetime',
                    //     // range: XAXISRANGE,
                    //     // min: normaltime,
                    //     // datetimeFormatter
                    //     labels: {
                    //         // datetimeFormatter: {
                    //         //     // year: '2024',
                    //         //     // month: "MMM 'yy",
                    //         //     // day: 'dd MMM',
                    //         //     hour: 'HH:mm:ss',
                    //         // },
                    //         format: 'HH:mm:ss',
                    //     },
                    // },
                    yaxis: {
                        // min: 0,
                        min: 0,
                    },
                    legend: {
                        show: false
                    },
                    xaxis: {
                        type: 'category', // Setting x-axis type to category
                        tickPlacement: 'on'
                    }
                };

                var chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();
                document.getElementById('loaderAnalytics').style.visibility = "hidden";
                let body = document.getElementById('containerIdAnaylicts');
                body.style.filter = 'none';
                body.style.pointerEvents = 'auto';

                chart.updateSeries([{
                    name: 'DO',
                    data: doData
                },
                    // {
                    //     name: 'PH',
                    //     data: phData
                    // },
                    // {
                    //     name: 'Temp',
                    //     data: tempData
                    // },
                    // {
                    //     name: 'TDS',
                    //     data: tdsData
                    // }
                ])

                //////////////// for PH chart ////////////////////
                let phOptions = {
                    series: [
                        {
                            name: 'PH',
                            data: phData.slice()
                        },
                    ],
                    labels: realTimeXvalue,

                    chart: {
                        id: 'realtime',
                        height: 350,
                        type: 'area',
                        stacked: true,
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            dynamicAnimation: {
                                speed: 1000
                            }
                        },
                        toolbar: {
                            show: false
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: [
                        'rgba(0,0,255,0.39)'
                        // '#008FFB',
                        // '#00FF00'
                    ],
                    stroke: {
                        // curve: 'straight',
                        curve: 'monotoneCubic'
                        // width: 2
                        // colors: ['red', 'blue', 'yellow']
                    },
                    fill: {

                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            stops: [0, 100]
                        }
                    },
                    title: {
                        text: 'PH',
                        align: 'center',
                    },
                    markers: {
                        size: 0
                    },

                    yaxis: {
                        min: 0,
                    },
                    legend: {
                        show: false
                    },
                };

                let phChart = new ApexCharts(document.querySelector("#phchart"), phOptions);
                phChart.render();
                // document.getElementById('loaderAnalytics').style.visibility = "hidden";
                // comment for dublicate operations

                // let body = document.getElementById('containerIdAnaylicts');
                // body.style.filter = 'none';
                // body.style.pointerEvents = 'auto';

                phChart.updateSeries([
                    {
                        name: 'PH',
                        data: phData
                    }
                ])


                //////////////// for temp chart ////////////////////
                let tempOptions = {
                    series: [
                        {
                            name: 'temp',
                            data: tempData.slice()
                        },
                    ],
                    labels: realTimeXvalue,

                    chart: {
                        id: 'realtime',
                        height: 350,
                        type: 'area',
                        stacked: true,
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            dynamicAnimation: {
                                speed: 1000
                            }
                        },
                        toolbar: {
                            show: false
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: [
                        '#FEB019',
                        // '#00FF00'
                    ],
                    stroke: {
                        // curve: 'straight',
                        curve: 'monotoneCubic'
                        // width: 2
                        // colors: ['red', 'blue', 'yellow']
                    },
                    fill: {

                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            stops: [0, 100]
                        }
                        // opacity: 0.9,
                        // colors: ['rgba(255, 0, 0, 0.1)', 'rgba(0, 0, 255, 0.1)', 'rgba(255, 165, 0, 0.1)'],
                    },
                    title: {
                        text: 'TEMPERATURE (°C)',
                        align: 'center',
                    },
                    markers: {
                        size: 0
                    },

                    yaxis: {
                        min: 0,
                    },
                    legend: {
                        show: false
                    },
                };

                let tempChart = new ApexCharts(document.querySelector("#tempchart"), tempOptions);
                tempChart.render();
                // document.getElementById('loaderAnalytics').style.visibility = "hidden";
                // comment for dublicate operations

                // let body = document.getElementById('containerIdAnaylicts');
                // body.style.filter = 'none';
                // body.style.pointerEvents = 'auto';

                tempChart.updateSeries([
                    {
                        name: 'TEMP',
                        data: tempData
                    }
                ])


                //////////////// for tds chart ////////////////////
                let tdsOptions = {
                    series: [
                        {
                            name: 'tds',
                            data: tdsData.slice()
                        },
                    ],
                    labels: realTimeXvalue,

                    chart: {
                        id: 'realtime',
                        height: 350,
                        type: 'area',
                        stacked: true,
                        animations: {
                            enabled: true,
                            easing: 'linear',
                            dynamicAnimation: {
                                speed: 1000
                            }
                        },
                        toolbar: {
                            show: false
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    colors: [
                        '#32CD32',
                        // '#00FF00'
                    ],
                    stroke: {
                        // curve: 'straight',
                        curve: 'monotoneCubic'
                        // width: 2
                        // colors: ['red', 'blue', 'yellow']
                    },
                    fill: {

                        type: 'gradient',
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            stops: [0, 100]
                        }
                        // opacity: 0.9,
                        // colors: ['rgba(255, 0, 0, 0.1)', 'rgba(0, 0, 255, 0.1)', 'rgba(255, 165, 0, 0.1)'],
                    },
                    title: {
                        text: 'TOTAL DISSOLVED SOLIDS (mg/L)',
                        align: 'center',
                    },
                    markers: {
                        size: 0
                    },

                    yaxis: {
                        min: 0,
                    },
                    legend: {
                        show: false
                    },
                };

                let tdsChart = new ApexCharts(document.querySelector("#tdschart"), tdsOptions);
                tdsChart.render();
                // document.getElementById('loaderAnalytics').style.visibility = "hidden";
                // comment for dublicate operations

                // let body = document.getElementById('containerIdAnaylicts');
                // body.style.filter = 'none';
                // body.style.pointerEvents = 'auto';

                tdsChart.updateSeries([
                    {
                        name: 'TDS',
                        data: tdsData
                    }
                ])
            });
        } else {
            window.location.href = "index.html"
        }

    })



}


async function getData(data) {
    let fetchData = await fetch("http://34.100.201.70:8345/analytics87", {
        method: "POST",
        body: JSON.stringify(data),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const resdata = await fetchData.json();
    console.log("-----resdata------87-----", resdata)


    let doValues = [];

    // Define dummy data for tdsValues
    let tdsValues = [];

    // Define dummy data for phValues
    let phValues = [];

    // Define dummy data for tempValues
    let tempValues = [];

    let xValues = [];

    resdata.map((element) => {

        // console.log("--------elements ----------", element.id)
        doValues.push(element.do)
        tdsValues.push(element.tds)
        phValues.push(element.ph)
        tempValues.push(element.temp)
        xValues.push(element.dateTime)
    })
    return { doValues, tdsValues, phValues, tempValues, xValues }
}


function makeChart(doValues, tdsValues, phValues, tempValues, xValues) {

    // let doValuesNew = [];
    // let tdsValuesNew = [];
    // let phValuesNew = [];
    // let tempValuesNew = [];

    // let xValuesNew = [];
    // for (let i = 0; i < doValues.length; i += sampleInterval) {
    //     doValuesNew.push(doValues[i]);
    // }
    // for (let i = 0; i < tdsValues.length; i += sampleInterval) {
    //     tdsValuesNew.push(tdsValues[i]);
    // } for (let i = 0; i < phValues.length; i += sampleInterval) {
    //     phValuesNew.push(phValues[i]);
    // } for (let i = 0; i < tempValues.length; i += sampleInterval) {
    //     tempValuesNew.push(tempValues[i]);
    // }
    // for (let i = 0; i < xValues.length; i += sampleInterval) {
    //     xValuesNew.push(xValues[i]);
    // }
    // console.log("-------------new do value ------------", doValuesNew)

    // document.getElementById('loader').style.visibility = 'hidden';

    if (window.myChart) {
        if (window.myChart.controller) {
            window.myChart.controller.destroy();
        }
    }
    if (window.phChart) {
        if (window.phChart.controller) {
            window.phChart.controller.destroy();
        }
    }
    if (window.tempChart) {
        if (window.tempChart.controller) {
            window.tempChart.controller.destroy();
        }
    }
    if (window.myChart1) {
        if (window.myChart1.controller) {
            window.myChart1.controller.destroy();
        }
    }

    window.myChart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,

            datasets: [{
                label: 'DISSOLVED OXYGEN (mgL)',
                data: doValues,
                borderColor: "red",
                fill: true,
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                tension: 0.1
            },
                // {
                //     label: 'pH',
                //     data: phValues,
                //     borderColor: "blue",
                //     fill: true,
                //     backgroundColor: 'rgba(0, 0, 255, 0.1)',
                // },
                // {
                //     label: 'Temperature',
                //     data: tempValues,
                //     borderColor: "orange",
                //     fill: true,
                //     backgroundColor: 'rgba(255, 165, 0, 0.1)',
                // }
            ]
        },
        options: {
            legend: {
                display: true,
                padding: 10
            }
        }
    });

    window.phChart = new Chart("phChart", {
        type: "line",
        data: {
            labels: xValues,

            datasets: [
                {
                    label: 'PH',
                    data: phValues,
                    borderColor: "blue",
                    backgroundColor: 'rgba(0, 0, 255, 0.1)',
                    fill: true
                },
            ]
        },
        options: {
            legend: {
                display: true,
                padding: 10
            }
        }
    });

    window.tempChart = new Chart("tempChart", {
        type: "line",
        data: {
            labels: xValues,

            datasets: [
                {
                    label: 'TEMPERATURE (°C)',
                    data: tempValues,
                    borderColor: "orange",
                    backgroundColor: 'rgba(255, 165, 0, 0.1)',
                    fill: true
                }]
        },
        options: {
            legend: {
                display: true,
                padding: 10
            }
        }
    });
    window.myChart1 = new Chart("myChart1", {
        type: "line",
        data: {
            labels: xValues,

            datasets: [{
                label: 'TOTAL DISSOLVED SOLIDS (mg/L)',
                data: tdsValues,
                borderColor: "green",
                fill: true,
                backgroundColor: 'rgba(0, 128, 0, 0.1)',
                tension: 0.1

            }]
        },
        options: {
            legend: {
                display: true,
                padding: 10
            }
        }
    })

    document.getElementById('loaderAnalytics').style.visibility = "hidden";
    let body = document.getElementById('containerIdAnaylicts');
    body.style.filter = 'none';
    body.style.pointerEvents = 'auto';
}


function homePage() {
    console.log("homePage button clicked");
    window.location.href = "main87.html"
    // window.location.href =  'http://34.100.201.70:8083/main.html'
}
async function selectFun(id) {
    // let buttons = document.querySelectorAll('.b1button');
    // buttons.forEach(function (button) {
    //     button.classList.remove('selected');
    // });
    // console.log('---button---', buttons)
    // // Add 'selected' class to the clicked button
    // let selectedButton = document.getElementById(id);
    // selectedButton.classList.add('selected');

    let buttons = document.querySelectorAll('.b1button');
    for (let button of buttons) {
        button.classList.remove('selected');
    }
    console.log('buttons', buttons)
    let selectedButton = document.getElementById(id)
    selectedButton.classList.add('selected');
}






















////////////////////////////////////////

{/* <script> */ }
document.addEventListener("DOMContentLoaded", function () {
    const motorSelectButton = document.getElementById("motorSelectButton");
    const rotationSelectButton = document.getElementById("rotationSelectButton");
    const submitButton = document.getElementById("submitButton");
    const output = document.getElementById("output");

    let motorId = null;
    let rotation = null;

    document.getElementById("motorDropdown").addEventListener("click", function (event) {
        event.preventDefault();
        const motorText = event.target.textContent;
        motorId = parseInt(motorText.split(' ')[1]) - 1;
        motorSelectButton.textContent = motorText;
    });

    document.getElementById("rotationDropdown").addEventListener("click", function (event) {
        event.preventDefault();
        const rotationText = event.target.textContent;
        // rotation = rotationText.split(' ')[1] ;
        rotation = parseInt(rotationText.split(' ')[1]);
        rotationSelectButton.textContent = rotationText;
    });

    submitButton.addEventListener("click", function () {
        if (motorId === null || rotation === null) {
            output.textContent = "Please select both motor and rotation values.";
            return;
        }

        const generatedCode = `Z${motorId}1${rotation}F`;
        // output.textContent = `Generated Code: ${generatedCode}`; //print generated code on display
        updateRotation(generatedCode)
        alert("Code generated successfully");
        // Export the generated code for use in another file
        // exportGeneratedCode(generatedCode);


        // Store the generated code in localStorage
        // localStorage.setItem('generatedCode', generatedCode);
    });

    // Function to export generated code
    // function exportGeneratedCode(code) {
    //     module.exports.generatedCode = code;
    // }

});
{/* </script> */ }

