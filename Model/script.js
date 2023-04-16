var AllData = "";
var saveButton = document.getElementById("submitBTN");
var API_URL = "https://script.google.com/macros/s/AKfycbzy1vovLcOd8RXm4jknw7s8sH_NSNd4NqrI_rerE3v6-ZJsdK9teDAyGn_Vm0CpRnprOQ/exec?";

fetch(API_URL + `getFullData=true`)
.then(response => response.json())
.then(data => {
    try {
        if (data.Data.toLowerCase() == "No Data Found".toLowerCase()) {
        }
    } catch (error) {
        AllData = Object.values(data.Data);
        console.log(AllData);
    }
    LoadData(); // Loading Data at the begining
})

saveButton.addEventListener("click", () => {
    if (document.getElementById("P_Title").value != "") {
        var data1 = document.getElementById("P_Title").value;
        var data2 = document.getElementById("toggle_Published").checked;
        fetch(API_URL + `addRowData=true&dt1=${data1}&dt2=${data2}`)
            .then(response => response.json())
            .then(data => {
                alert(data.Data);
                LoadData(); // Loading Data at the begining
            })
    }

});

function LoadData() {
    var dataTable = document.querySelector("#ModelsUndone");
    var dataTable2 = document.querySelector("#Modelsdone");
    dataTable.innerHTML = "";
    
    if (AllData.length > 0) {

        for (i = 0; i < AllData.length; i++) { 
            if(AllData[i][2] != true)
                dataTable.insertAdjacentHTML("beforeend", `<span class="Models active">${AllData[i][1]} <i class="far fa-check-circle"></i></span>`);
            else
                dataTable2.insertAdjacentHTML("beforeend", `<span class="Models not-active">${AllData[i][1]} <i class="far fa-times-circle"></i></span>`);
                
        }
            
    }
}
