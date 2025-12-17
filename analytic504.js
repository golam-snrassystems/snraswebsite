let data = { interval: "" }
const firebaseConfig = { apiKey: "AIzaSyCbcICT3ZbfJWFPLXzbG4UUeWG7Q2OQEjg", authDomain: "water-quality-35a00.firebaseapp.com", databaseURL: "https://water-quality-35a00-default-rtdb.asia-southeast1.firebasedatabase.app", projectId: "water-quality-35a00", storageBucket: "water-quality-35a00.appspot.com", messagingSenderId: "138665105368", appId: "1:138665105368:web:0896a5e8062eb9e49844ad", measurementId: "G-NNCT5SYCJJ" };
if (typeof firebase !== 'undefined' && (!firebase.apps || firebase.apps.length === 0)) { firebase.initializeApp(firebaseConfig); }
var auth = firebase.auth();
function updateRotation(command) { firebase.database().ref('messages/' + 'Y041653632892504/').update({ message: command }) }
async function SixMonth() { auth.onAuthStateChanged(async (user) => { if (user) { document.getElementById('6Month').classList.add("active"); data.interval = "6Month"; let yValue = await getData(data); let currentDate = new Date(); var monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"]; var xValue_Arr = []; for (var i = 0; i < 6; i++) { var monthIndex = currentDate.getMonth() - i; var year = currentDate.getFullYear(); if (monthIndex < 0) { monthIndex += 12; year--; } var monthName = monthNames[monthIndex]; xValue_Arr.push(monthName + ' ' + year); } let xValue = xValue_Arr.reverse(); makeChart(yValue.doValues, yValue.tdsValues, yValue.phValues, yValue.tempValues, xValue) } else { window.location.href = "index.html" } }) }
async function OneMonth() { data.interval = "1Month"; let yValue = await getData(data); var monthNames = ["January","February","March","April","May","June"]; var currentDate = new Date(); var last30Days = []; for (var i = 0; i < 30; i++) { var date = currentDate.getDate(); var month = currentDate.getMonth(); var year = currentDate.getFullYear(); last30Days.push(date + ' ' + monthNames[month] + ' ' + year); currentDate.setDate(currentDate.getDate() - 1); } let xValue = last30Days.reverse(); makeChart(yValue.doValues, yValue.tdsValues, yValue.phValues, yValue.tempValues, xValue) }
async function week() { data.interval = "Week"; let yValue = await getData(data); var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]; var currentDate = new Date(); var lastSevenDays = []; for (var i = 0; i < 7; i++) { var date = new Date(currentDate); date.setDate(date.getDate() - i); var dayName = dayNames[date.getDay()]; lastSevenDays.push(dayName); } let xValue = lastSevenDays.reverse(); makeChart(yValue.doValues, yValue.tdsValues, yValue.phValues, yValue.tempValues, xValue) }
async function day() { data.interval = "Day"; let yValue = await getData(data) }
async function realTime() { keepAlive(); async function keepAlive() { await firebase.database().ref('keepAlive/' + 'Y041653632892504/' + 'online').on('value', (deviceSattus) => { let status = deviceSattus.val(); if (status == true) { document.getElementById('circle').style.backgroundColor = 'green' } else if (status == false) { document.getElementById('circle').style.backgroundColor = 'red' } }) } auth.onAuthStateChanged(async (user) => { if (user) { document.getElementById('analyticsBodyId').style.visibility = "visible"; document.getElementById('loaderAnalytics').style.visibility = "visible"; document.getElementById('realTime').classList.add("active"); let doData = []; let phData = []; let tempData = []; let tdsData = []; let realTimeXvalue = []; firebase.database().ref('data/' + 'Y041653632892504/').orderByValue().limitToLast(10).on('child_added', (snapshot) => { var userValue = snapshot.val(); let DO = Math.round(parseFloat(userValue.do) * 10) / 10; let TDS = userValue.tds; let PH = Math.round(parseFloat(userValue.ph) * 10) / 10; let TEMPERATURE = Math.round(parseFloat(userValue.temperature) * 10) / 10; let time = userValue.time; const date = new Date(time); const localDate = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); doData.push(DO); phData.push(PH); tempData.push(TEMPERATURE); tdsData.push(TDS); realTimeXvalue.push(localDate); if (doData.length > 10) { doData.shift(); phData.shift(); tempData.shift(); tdsData.shift(); realTimeXvalue.shift(); } var chart = new ApexCharts(document.querySelector("#chart"), { series: [{ name: 'DO', data: doData.slice() }], labels: realTimeXvalue, chart: { id: 'realtime', height: 350, type: 'area', stacked: true, animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 1000 } }, toolbar: { show: false }, zoom: { enabled: false } }, dataLabels: { enabled: false }, colors: ['rgba(255, 13, 29, 0.6)'], stroke: { curve: 'monotoneCubic' }, fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.9, stops: [0, 100] } }, title: { text: 'DISSOLVED OXYGEN (mgL)', align: 'center', }, markers: { size: 0 }, yaxis: { min: 0, }, legend: { show: false }, xaxis: { type: 'category', tickPlacement: 'on' } }); chart.render(); document.getElementById('loaderAnalytics').style.visibility = "hidden"; let body = document.getElementById('containerIdAnaylicts'); body.style.filter = 'none'; body.style.pointerEvents = 'auto'; chart.updateSeries([{ name: 'DO', data: doData }]); }); } else { window.location.href = "index.html" } }) }
async function getData(data) {
	let fetchData = await fetch("http://34.100.201.70:8345/analytics504", {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-type": "application/json; charset=UTF-8" }
	})
	const resdata = await fetchData.json();

	let doValues = [];
	let tdsValues = [];
	let phValues = [];
	let tempValues = [];
	let perimeterValues = [];
	let xValues = [];

	resdata.map((element) => {
		doValues.push(element.do);
		tdsValues.push(element.tds);
		phValues.push(element.ph);
		tempValues.push(element.temp);
		perimeterValues.push(element.perimeter === undefined ? null : element.perimeter);
		xValues.push(element.dateTime);
	})
	return { doValues, tdsValues, phValues, tempValues, perimeterValues, xValues }
}

function makeChart(doValues, tdsValues, phValues, tempValues, perimeterValuesOrX, xValuesMaybe) {
	// support both signatures: (do,tds,ph,temp,xValues) and (do,tds,ph,temp,perimeterValues,xValues)
	let perimeterValues = null;
	let xValues = [];
	if (xValuesMaybe === undefined) {
		// called with five args where fifth is xValues
		xValues = perimeterValuesOrX || [];
	} else {
		perimeterValues = perimeterValuesOrX;
		xValues = xValuesMaybe || [];
	}

	if (window.myChart && window.myChart.controller) window.myChart.controller.destroy();
	if (window.phChart && window.phChart.controller) window.phChart.controller.destroy();
	if (window.tempChart && window.tempChart.controller) window.tempChart.controller.destroy();
	if (window.myChart1 && window.myChart1.controller) window.myChart1.controller.destroy();
	if (window.perimeterChart && window.perimeterChart.controller) window.perimeterChart.controller.destroy();

	window.myChart = new Chart("myChart", { type: "line", data: { labels: xValues, datasets: [{ label: 'DISSOLVED OXYGEN (mgL)', data: doValues, borderColor: "red", fill: true, backgroundColor: 'rgba(255, 0, 0, 0.1)', tension: 0.1 }] }, options: { legend: { display: true, padding: 10 } } });
	window.phChart = new Chart("phChart", { type: "line", data: { labels: xValues, datasets: [{ label: 'PH', data: phValues, borderColor: "blue", backgroundColor: 'rgba(0, 0, 255, 0.1)', fill: true }] }, options: { legend: { display: true, padding: 10 } } });
	window.tempChart = new Chart("tempChart", { type: "line", data: { labels: xValues, datasets: [{ label: 'TEMPERATURE (°C)', data: tempValues, borderColor: "orange", backgroundColor: 'rgba(255, 165, 0, 0.1)', fill: true }] }, options: { legend: { display: true, padding: 10 } } });
	window.myChart1 = new Chart("myChart1", { type: "line", data: { labels: xValues, datasets: [{ label: 'TOTAL DISSOLVED SOLIDS (mg/L)', data: tdsValues, borderColor: "green", fill: true, backgroundColor: 'rgba(0, 128, 0, 0.1)', tension: 0.1 }] }, options: { legend: { display: true, padding: 10 } } });

	if (perimeterValues) {
		try {
			window.perimeterChart = new Chart("perimeterChart", { type: "line", data: { labels: xValues, datasets: [{ label: 'PERIMETER', data: perimeterValues, borderColor: "#8A2BE2", fill: true, backgroundColor: 'rgba(138,43,226,0.08)', tension: 0.1 }] }, options: { legend: { display: true, padding: 10 } } });
		} catch (e) { }
	}
	document.getElementById('loaderAnalytics').style.visibility = "hidden";
	let body = document.getElementById('containerIdAnaylicts');
	body.style.filter = 'none';
	body.style.pointerEvents = 'auto';
}
function homePage() { window.location.href = "main504.html" }
async function selectFun(id) { let buttons = document.querySelectorAll('.b1button'); for (let button of buttons) { button.classList.remove('selected'); } let selectedButton = document.getElementById(id) selectedButton.classList.add('selected'); }
document.addEventListener("DOMContentLoaded", function () { const motorSelectButton = document.getElementById("motorSelectButton"); const rotationSelectButton = document.getElementById("rotationSelectButton"); const submitButton = document.getElementById("submitButton"); const output = document.getElementById("output"); let motorId = null; let rotation = null; document.getElementById("motorDropdown").addEventListener("click", function (event) { event.preventDefault(); const motorText = event.target.textContent; motorId = parseInt(motorText.split(' ')[1]) - 1; motorSelectButton.textContent = motorText; }); document.getElementById("rotationDropdown").addEventListener("click", function (event) { event.preventDefault(); const rotationText = event.target.textContent; rotation = parseInt(rotationText.split(' ')[1]); rotationSelectButton.textContent = rotationText; }); submitButton.addEventListener("click", function () { if (motorId === null || rotation === null) { output.textContent = "Please select both motor and rotation values."; return; } const generatedCode = `Z${motorId}1${rotation}F`; updateRotation(generatedCode) alert("Code generated successfully"); }); });