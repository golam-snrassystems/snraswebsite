var flag9
var visibilityFlag = false;

document.addEventListener('DOMContentLoaded', async function() {

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
    if (typeof firebase !== 'undefined' && (!firebase.apps || firebase.apps.length === 0)) {
        try { firebase.initializeApp(firebaseConfig); } catch (e) { /* already initialized */ }
    }
    const auth = firebase.auth();

    keepAlive()
    async function keepAlive() {
        await firebase.database().ref('keepAlive/' + 'Y041653632892497/' + 'online').on('value', (deviceSattus) => {
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

            document.getElementById('bodyId').style.visibility = "visible";
            let body = document.getElementById('containerId');
            body.style.filter = 'blur(8px)';
            body.style.pointerEvents = 'none';

            flag9 = "firebase"
            document.getElementById("sqlTable").style.display = "none";

            firebase.database().ref('data/' + 'Y041653632892497/').orderByValue().limitToLast(50).on('child_added', (snapshot) => {

                var userValue = snapshot.val()
                let DO = Math.round(parseFloat(userValue.do) * 10) / 10;

                let TDS = userValue.tds
                let PH = Math.round(parseFloat(userValue.ph) * 10) / 10;
                let TEMPERATURE = Math.round(parseFloat(userValue.temperature) * 10) / 10;
                let PERIMETER = userValue.perimeter || '';
                var time = userValue.time
                var normaltime = new Date(Number(time))
                addItemToTable(normaltime, DO, TDS, PH, TEMPERATURE, PERIMETER)


            });

            window.onload = getData;
            var srNo = 1;

            function addItemToTable(normaltime, DO, TDS, PH, TEMPERATURE, perimeter) {

                var tbody = document.getElementById('tbody1')
                var firstRow = tbody.rows[0]
                var trow = document.createElement('tr')
                var td2 = document.createElement('td')
                var td3 = document.createElement('td')
                var td4 = document.createElement('td')
                var td5 = document.createElement('td')
                var td6 = document.createElement('td')
                var td7 = document.createElement('td')
                var td8 = document.createElement('td')

                td2.innerHTML = srNo
                td3.innerHTML = normaltime
                td4.innerHTML = DO
                td5.innerHTML = TDS
                td6.innerHTML = PH
                td7.innerHTML = TEMPERATURE
                td8.innerHTML = perimeter

                trow.appendChild(td2)
                trow.appendChild(td3)
                trow.appendChild(td4)
                trow.appendChild(td5)
                trow.appendChild(td6)
                trow.appendChild(td7)
                trow.appendChild(td8)

                tbody.insertBefore(trow, firstRow)
                srNo++;
                document.getElementById('loader').style.visibility = 'hidden';
                let body = document.getElementById('containerId');
                body.style.filter = 'none';
                body.style.pointerEvents = 'auto';

            }
        } else {
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

    if (typeof firebase !== 'undefined' && (!firebase.apps || firebase.apps.length === 0)) {
        try { firebase.initializeApp(firebaseConfig); } catch (e) { /* already initialized */ }
    }
    var xValues = []
    var doValues = []
    var tdsValues = []
    var phValues = []
    var tempValues = []

    firebase.database().ref('data/' + 'Y041653632892497').orderByValue().limitToLast(50).on('child_added', (snapshot) => {

        var userValue = snapshot.val()
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

    });

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
        document.getElementById("firebaseTable").style.display = "none";
        document.getElementById("viewPreviousDataButtonId").innerHTML = "Real Time Data";
        document.getElementById("oldData").style.visibility = "visible";
        document.getElementById("sqlTable").style.display = "inline-table";
        getAllData();
    } else {
        location.reload();
    }
}

async function getAllData() {
    document.getElementById('pagination').style.display = "inline-table";
    var currentPage = 1;
    var perPage = 50;
    var totalItems
    await fetch('http://34.100.201.70:8345/getMaxSize497').then(response => response.json()).then(data => {
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
        let fetchData = await fetch("http://34.100.201.70:8345/fetchData497", {
            method: "POST",
            body: JSON.stringify(data),
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
            let resdo = element.do
            let tds = element.tds
            let ph = element.ph
            let temp = element.temp
            let perimeter = element.perimeter || ''
            waterData(id, dateTime, resdo, tds, ph, temp, perimeter)
        });

        currentPage = page;
        showPageInfo();

        function waterData(id, dateTime, resdo, tds, ph, temp, perimeter) {
            var tbody = document.getElementById('tbody2')
            var trow = document.createElement('tr')
            var td1 = document.createElement('td')
            var td2 = document.createElement('td')
            var td4 = document.createElement('td')
            var td5 = document.createElement('td')
            var td6 = document.createElement('td')
            var td7 = document.createElement('td')
            var td8 = document.createElement('td')

            td1.innerHTML = id
            td2.innerHTML = dateTime
            td4.innerHTML = resdo
            td5.innerHTML = tds
            td6.innerHTML = ph
            td7.innerHTML = temp
            td8.innerHTML = perimeter

            trow.appendChild(td1)
            trow.appendChild(td2)
            trow.appendChild(td4)
            trow.appendChild(td5)
            trow.appendChild(td6)
            trow.appendChild(td7)
            trow.appendChild(td8)
            tbody.appendChild(trow)
        }
        document.getElementById('loader').style.visibility = 'hidden';
    }

    function initPagination() {
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

        loadData(1);
    }

    initPagination();
}

async function AllDataInCsv() {

    var myToast = new bootstrap.Toast(document.getElementById('myToast'), { autohide: false });
    myToast.show();
    let fetchData2 = await fetch("http://34.100.201.70:8345/fetchAllRecord497", {
        method: "GET",
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
            resdo: element.do,
            tds: element.tds,
            ph: element.ph,
            temp: element.temp,
            perimeter: element.perimeter || ''
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
}

getData();

}); // end DOMContentLoaded
