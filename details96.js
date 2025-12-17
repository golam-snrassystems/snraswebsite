var flag9
var visibilityFlag = false;

async function getData() {

    //check firebase authentication  if user authenticate continue else redirect to index,html///////////
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
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    keepAlive()
    async function keepAlive() {
        await firebase.database().ref('keepAlive/' + 'Y041653632892496/' + 'online').on('value', (deviceSattus) => {
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

            // console.log('------------user Uid', user.uid, user.email);
            // User is authenticated, serve main.html
            // window.location.href = "main.html";
            document.getElementById('bodyId').style.visibility = "visible";
            let body = document.getElementById('containerId');
            body.style.filter = 'blur(8px)';
            body.style.pointerEvents = 'none';

            flag9 = "firebase"
            document.getElementById("sqlTable").style.display = "none";

            let fetchData1 = await fetch("http://34.100.201.70:8345/getMaxSize96", {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            let resdata = await fetchData1.json()
            var reciveData = resdata[0]['MAX(id)']

            firebase.database().ref('data/' + 'Y041653632892496/').orderByValue().limitToLast(50).on('child_added', (snapshot) => {

                var userValue = snapshot.val()
                // console.log("-----------userValue----------", userValue)
                let DO = Math.round(parseFloat(userValue.do) * 10) / 10;

                let TDS = userValue.tds
                let PH = Math.round(parseFloat(userValue.ph) * 10) / 10;
                let TEMPERATURE = Math.round(parseFloat(userValue.temperature) * 10) / 10;
                var time = userValue.time
                var normaltime = new Date(Number(time))
                addItemToTable(normaltime, DO, TDS, PH, TEMPERATURE)
                // let time = userValue.time
                // var normaltime = new Date(Number(time))
                // addItemToTable(normaltime, DO, TDS, PH, TEMPERATURE)


            });

            window.onload = getData;
            var srNo = reciveData - 49;
            // var SerialNo = 50

            function addItemToTable(normaltime, DO, TDS, PH, TEMPERATURE) {


                var tbody = document.getElementById('tbody1')

                var firstRow = tbody.rows[0]
                var trow = document.createElement('tr')
                // var td1 = document.createElement('td')
                var td2 = document.createElement('td')
                var td3 = document.createElement('td')
                var td4 = document.createElement('td')
                var td5 = document.createElement('td')
                var td6 = document.createElement('td')
                var td7 = document.createElement('td')

                // td1.innerHTML = SerialNo
                td2.innerHTML = srNo
                td3.innerHTML = normaltime
                td4.innerHTML = DO
                td5.innerHTML = TDS
                td6.innerHTML = PH
                td7.innerHTML = TEMPERATURE


                // trow.appendChild(td1)
                trow.appendChild(td2)
                trow.appendChild(td3)
                trow.appendChild(td4)
                trow.appendChild(td5)
                trow.appendChild(td6)
                trow.appendChild(td7)

                tbody.insertBefore(trow, firstRow)
                srNo++;
                // SerialNo--
                document.getElementById('loader').style.visibility = 'hidden';
                let body = document.getElementById('containerId');
                body.style.filter = 'none';
                body.style.pointerEvents = 'auto';


            }
        } else {
            // User is not authenticated
            window.location.href = "index.html";
        }
    })

}


function getGraph() {

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


    firebase.initializeApp(firebaseConfig);
    var xValues = []
    var doValues = []
    var tdsValues = []
    var phValues = []
    var tempValues = []

    firebase.database().ref('data/' + 'Y041653632892496').orderByValue().limitToLast(50).on('child_added', (snapshot) => {


        var userValue = snapshot.val()

        // console.log("------userValue-------", userValue.do)
        // console.log("------userValue----tds---", userValue.tds)
        // console.log("------userValue----ph---", userValue.ph)
        // console.log("------userValue---temperature----", userValue.temperature)

        var DO = userValue.do
        var TDS = userValue.tds
        var PH = userValue.ph
        var TEMPERATURE = userValue.temperature
        var time = userValue.time
        var normaltime = new Date(Number(time))
        var newTime = normaltime.getHours()

        xValues.push(newTime)
        doValues.push(DO)
        tdsValues.push(TDS)
        phValues.push(PH)
        tempValues.push(TEMPERATURE)

        // let time = userValue.time
        // var normaltime = new Date(Number(time))
        // addItemToTable(normaltime, DO, TDS, PH, TEMPERATURE)


    });

    // var xValues = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
    new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: doValues,
                borderColor: "red",
                fill: false
            }, {
                data: tdsValues,
                borderColor: "green",
                fill: false
            }, {
                data: phValues,
                borderColor: "blue",
                fill: false
            },
            {
                data: tempValues,
                borderColor: "orange",
                fill: false
            }]
        },
        options: {
            legend: { display: false }
        }
    });

}


function showMessage() {
    alert("Network Issue");
    document.getElementById('startdate').value = 'dd-mm-yyyy --:--'
    document.getElementById('startdate').value = 'dd-mm-yyyy --:--'

}
function DownloadPDF() {
    var pdf = new jsPDF("p", "pt", "a4");
    var table
    if (flag9 == "firebase") {
        table = document.querySelector("#firebaseTable");
    } else if (flag9 == "sql") {
        table = document.querySelector("#sqlTable");
    } else {
        alert("load Data first")
        return
    }
    pdf.autoTable({
        html: table,
        head: table.getElementsByTagName("thead")[0],
        body: table.getElementsByTagName("tbody")[0]
    });
    pdf.save("waterQuality.pdf");
    // var downloadPdfButton = document.getElementById("download-pdf");
    //  downloadPdfButton.addEventListener("click", function () {
    // pdf.save("waterQaulity.pdf");
    // });
}

function downloadCsv() {

    var table;
    if (flag9 == "firebase") {
        table = document.querySelector("#firebaseTable");
    } else if (flag9 == "sql") {
        table = document.querySelector("#sqlTable");
    } else {
        alert("load Data first");
        return;
    }

    // Generate CSV data
    const rows = [];
    const headers = Array.from(table.getElementsByTagName("th")).map(th => th.textContent.trim());
    rows.push(headers);
    const tbodyRows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    for (let i = 0; i < tbodyRows.length; i++) {
        const row = [];
        const cells = tbodyRows[i].getElementsByTagName("td");
        for (let j = 0; j < cells.length; j++) {
            row.push(cells[j].textContent.trim());
        }
        rows.push(row);
    }
    const csv = rows.map(row => row.join(",")).join("\n");

    // Download CSV file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "waterQuality.csv");
    document.body.appendChild(link);
    link.click();
}

function viewPreviousData() {
    visibilityFlag = !visibilityFlag
    if (visibilityFlag) {
        flag9 = "sql"
        // document.getElementById('loader').style.visibility = 'visible';
        document.getElementById("firebaseTable").style.display = "none";
        // document.getElementById('loadButtonId').style.display = "initial";
        document.getElementById("viewPreviousDataButtonId").innerHTML = "Real Time Data";
        document.getElementById("oldData").style.visibility = "visible";
        document.getElementById("sqlTable").style.display = "inline-table";
        // document.getElementById("firebaseButton").style.visibility = "hidden";
        getAllData();
    } else {
        location.reload();
    }
}



async function getAllData() {
    document.getElementById('pagination').style.display = "inline-table";
    // var fromWhereToStart = document.getElementById("idWhereToStart").value;
    // var numberOfData = document.getElementById("numberOfData").value;

    var currentPage = 1; // current page number
    var perPage = 50; // number of items per page
    var totalItems // total number of items in the database
    await fetch('http://34.100.201.70:8345/getMaxSize96').then(response => response.json()).then(data => {
        // console.log("------------------responsemax value-------", data[0]['MAX(id)'])
        totalItems = data[0]['MAX(id)']
    }).catch(error => console.error(error));


    function showPageInfo() {
        var start = (currentPage - 1) * perPage + 1;
        var end = Math.min(start + perPage - 1, totalItems);
        document.getElementById('pageInfo').innerHTML = 'Showing ' + start + ' to ' + end + ' of ' + totalItems + ' items';
    }

    async function loadData(page) {
        let data = {
            "page": page,
            "size": perPage
        }
        let fetchData = await fetch("http://34.100.201.70:8345/fetchData96", {
            method: "POST",
            body: JSON.stringify(data),

            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const resdata = await fetchData.json();

        var tbody = document.getElementById('tbody2')
        tbody.innerHTML = ''
        resdata.forEach(element => {
            let id = element.id
            let dateTime = element.dateTime
            let deviceId = element.deviceId
            let resdo = element.do
            let tds = element.tds
            let ph = element.ph
            let temp = element.temp
            waterData(id, dateTime, deviceId, resdo, tds, ph, temp)
        });

        totalItems = totalItems++;
        currentPage = page;
        showPageInfo();


        function waterData(id, dateTime, deviceId, resdo, tds, ph, temp) {
            var tbody = document.getElementById('tbody2')
            // var firstRow = tbody.rows[0]
            var trow = document.createElement('tr')
            var td1 = document.createElement('td')
            var td2 = document.createElement('td')
            // var td3 = document.createElement('td')
            var td4 = document.createElement('td')
            var td5 = document.createElement('td')
            var td6 = document.createElement('td')
            var td7 = document.createElement('td')


            td1.innerHTML = id
            td2.innerHTML = dateTime
            // td3.innerHTML = deviceId
            td4.innerHTML = resdo
            td5.innerHTML = tds
            td6.innerHTML = ph
            td7.innerHTML = temp


            trow.appendChild(td1)
            trow.appendChild(td2)
            // trow.appendChild(td3)
            trow.appendChild(td4)
            trow.appendChild(td5)
            trow.appendChild(td6)
            trow.appendChild(td7)
            // tbody.insertBefore(trow, firstRow)
            tbody.appendChild(trow)
            // srNo++;

        }
        document.getElementById('loader').style.visibility = 'hidden';

    }

    function initPagination() {
        // add event listeners to pagination buttons
        document.getElementById("pageInput").max = `${Math.ceil(totalItems / perPage)}`
        document.getElementById('prevBtn').addEventListener('click', function () {
            if (currentPage > 1) {
                loadData(currentPage - 1);
            }
        });
        document.getElementById('nextBtn').addEventListener('click', function () {
            if (currentPage < Math.ceil(totalItems / perPage)) {
                loadData(currentPage + 1);
            }
        });
        document.getElementById('goToPageBtn').addEventListener('click', function () {
            var page = parseInt(document.getElementById('pageInput').value);
            if (page >= 1 && page <= Math.ceil(totalItems / perPage)) {
                loadData(page);
            }
            else {
                document.getElementById('errorMessage').innerHTML = `Page range between 1 to ${Math.ceil(totalItems / perPage)}`
                setTimeout(() => {
                    document.getElementById('errorMessage').innerHTML = "";

                }, 2500);
            }
        });

        // load data for the first page
        loadData(1);
    }

    // call initPagination on page load
    initPagination();


}


async function AllDataInCsv() {

    var myToast = new bootstrap.Toast(document.getElementById('myToast'), { autohide: false });
    myToast.show();
    let fetchData2 = await fetch("http://34.100.201.70:8345/fetchAllRecord96", {
        method: "GET",
        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    let resdata = await fetchData2.json()

    const data = [];
    resdata.map(element => {
        data.push({
            id: element.id,
            dateTime: element.dateTime,
            // deviceId: element.deviceId,
            resdo: element.do,
            tds: element.tds,
            ph: element.ph,
            temp: element.temp
        });
    });
    const csv = Papa.unparse(data);
    const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const csvURL = URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'SnrasCsv.csv');
    tempLink.click();
    myToast.hide();
}


async function DownloadPdfAllData() {
    var myToast = new bootstrap.Toast(document.getElementById('myToast'));
    myToast.show();
    await fetch("http://34.100.201.70:8345/generatePdf", {
        method: "GET",
        headers: {
            // "Content-type": "application/json; charset=UTF-8"
            "Content-Type": "application/pdf"
        }
    }).then(response => response.blob())
        .then(blob => {
            const pdfUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = pdfUrl;
            link.download = "Snras-data.pdf";
            link.click();
        })
        .catch(error => {
            console.error("PDF download failed: ", error);
        });





    // .then(response => {
    //         console.log("-----------------pdf------fetch-----from---------------server")
    //         const pdfUrl = URL.createObjectURL(response);
    //         const link = document.createElement('a');
    //         link.href = pdfUrl;
    //         link.download = 'Snras-data.pdf';
    //         link.click();
    //         console.log("---------------pdf--------download--------End----")


    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });








}


// async function testAllData() {

//     document.getElementById("firebaseTable").style.visibility = "hidden";
//     console.log("---------------pdf start dwonloading ----------------")


//     const openDialogBtn = document.getElementById("openDialogBtn");
//     const closeDialogBtn = document.getElementById("closeDialogBtn");
//     const closeDialogBtnStart = document.getElementById("closeDialogBtnStart");
//     const myDialog = document.getElementById("myDialog");
//     const myDialogStart = document.getElementById("myDialogStart");

//     myDialogStart.showModal();
//     closeDialogBtnStart.addEventListener("click", function () {
//         myDialogStart.close();
//     });



//     // openDialogBtn.addEventListener("click", function () {
//     //     myDialog.showModal();
//     // });

//     // closeDialogBtn.addEventListener("click", function () {
//     //     myDialog.close();
//     // });
//     await fetch("http://localhost:8345/generatePdf", {
//         method: "GET",
//         headers: {
//             // "Content-type": "application/json; charset=UTF-8"
//             "Content-Type": "application/pdf"
//         }
//     }).then(response => response.blob())
//         .then(blob => {
//             // Create a new blob URL for the PDF
//             const pdfUrl = URL.createObjectURL(blob);

//             // Create a link element to download the PDF
//             const link = document.createElement("a");
//             link.href = pdfUrl;
//             link.download = "Snras-data.pdf";

//             // Simulate a click on the link to start the download
//             link.click();

//             // Show the dialog box after the download is complete
//             myDialog.showModal();
//             closeDialogBtn.addEventListener("click", function () {
//                 myDialog.close();
//             });
//         })
//         .catch(error => {
//             console.error("PDF download failed: ", error);
//         });




//     // let fetchData = await
//     // let resdata = await fetchData.json()

// }




