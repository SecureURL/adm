var AllData = "";
var saveButton = document.getElementById("submitBTN");
var RefreshButton = document.getElementById("ReloadData");
var SearchTxtBox = document.getElementById("SearchBox");
var CheckModel;
var CrossModel;
var ModelNamesListSpan;
var SelectedModelID = "";
var CopyModelName;

var unpublishedLabel = document.getElementById("lbl_UnPublished");

var API_URL = "https://script.google.com/macros/s/AKfycbx-W-PBlgb2KmP9hQEF6UxPkuPD4tTU1fsG-oRq3XE7VSL2CkZecC5byx5XuJ0ryruXBQ/exec?";

function InitialLoad()
{
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
}

InitialLoad();

SearchTxtBox.addEventListener("keyup", () => {
    if (SearchTxtBox.value.length > 0) {
        ModelNamesListSpan.forEach(element => {
            if (element.innerText.toLowerCase().trim().includes(SearchTxtBox.value.toLowerCase()) == false)
                element.classList.add("hide");
        });        
    }
    else {
        ModelNamesListSpan.forEach(element => {
            element.classList.remove("hide");
        });
    }

})

RefreshButton.addEventListener("click", () => {
    InitialLoad();
    SelectedModelID = "";
    document.getElementById("P_Title").value = "";
    document.getElementById("toggle_Published").checked = false;
    saveButton.innerText = "Save";
})

saveButton.addEventListener("click", () => {
    if(saveButton.innerText == "Save")
    {
        if (document.getElementById("P_Title").value != "") {
            var data1 = document.getElementById("P_Title").value;
            var data2 = document.getElementById("toggle_Published").checked;
            fetch(API_URL + `addRowData=true&dt1=${data1}&dt2=${data2}`)
                .then(response => response.json())
                .then(data => {
                    alert(data.Data);
                    InitialLoad(); // Loading Data at the begining
                })
        }
    }
    else {
        var data1 = document.getElementById("P_Title").value;
        var data2 = document.getElementById("toggle_Published").checked;

        UpdateModelData(SelectedModelID, data1, data2);
        saveButton.innerText = "Save";
    }
});

function LoadData() {
    var unpublishedCount = 0;
    var dataTable = document.querySelector("#ModelsUndone");
    var dataTable2 = document.querySelector("#Modelsdone");
    dataTable.innerHTML = "";
    dataTable2.innerHTML = "";
    
    if (AllData.length > 0) {

        for (i = 0; i < AllData.length; i++) { 
            if (AllData[i][2] != true) {
                dataTable.insertAdjacentHTML("beforeend", `<span id="${AllData[i][0]}" class="Models active">${AllData[i][1]} <i class="far fa-check-circle"></i><i class="fas fa-copy"></i></span>`);
                unpublishedCount++;
            }
            else
                dataTable2.insertAdjacentHTML("beforeend", `<span id="${AllData[i][0]}" class="Models not-active">${AllData[i][1]} <i class="far fa-times-circle"></i></span>`);
                
        }

        unpublishedLabel.innerText = `All Models (${unpublishedCount})`;

        CheckModel = document.querySelectorAll(".Models.active .fa-check-circle");
        CrossModel = document.querySelectorAll(".Models.not-active .fa-times-circle");
        CopyModelName = document.querySelectorAll(".Models.active .fa-copy");
        ModelNamesListSpan = document.querySelectorAll(".ModelsContainer .Models");

        CheckModelFeature();
        CrossModelFeature();
        CopyModelNameFeature();
        ModelNameClick();
    }
}

function copyText(textToCopy) {

    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            //triggerMessage("success", "New URL Copied");
            alert("Text copied to clipboard!");
        })
        .catch((error) => {
            console.error("Error copying text: ", error);
        });
}

function CopyModelNameFeature() {
    CopyModelName.forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation();
            copyText(element.parentElement.innerText.trim());
        })
    });
}

function CrossModelFeature() {
    CrossModel.forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation();
            UpdateModelData(element.parentElement.getAttribute("id") , element.parentElement.innerText.trim(), 'false');
        })
    });
}

function CheckModelFeature() {
    CheckModel.forEach(element => {
        element.addEventListener("click", (e) => {
            e.stopPropagation();
            UpdateModelData(element.parentElement.getAttribute("id") , element.parentElement.innerText.trim(), 'true');
        })
    });
}

function ModelNameClick() {
    ModelNamesListSpan.forEach(element => {
        element.addEventListener("click", () => { 
            if (element.classList.contains("active"))
                document.getElementById("toggle_Published").checked = true;
            else
                document.getElementById("toggle_Published").checked = false;

            document.getElementById("P_Title").value = element.innerText.trim();
            SelectedModelID = element.getAttribute("id");
            saveButton.innerText = "Update";
        })
        
    });
}

function UpdateModelData(ModelID, ModelName, ModelStatus) {
    fetch(API_URL + `updateRowData=${ModelID}&dt1=${ModelName}&dt2=${ModelStatus}`)
                .then(response => response.json())
                .then(data => {
                    alert(data.Data);
                    InitialLoad(); // Loading Data at the begining
                })
}