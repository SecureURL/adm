var SaveBtn = document.getElementById("submitBTN");
var ImgSetBtn = document.getElementById("imgFetch");
var postDtToggle = document.getElementById("toggle_Post");
var showDataButton = document.getElementById("showDatabtn");

var btnUnPublished = document.getElementById("toggle_UnPublished");
var btnSearchConsole = document.getElementById("toggle_SearchConsole");
var btnwithoutThumb = document.getElementById("toggle_withoutThumb");
var searchTxtBox = document.getElementById("SearchBox");

var btnCopyTitle;

var EditDataButton;
var DeleteDataButton;
var BlogNamesList = new Array();
var ImgThumbValue = "";
var tableRows;
var AllData = "";
var selectedPostID = "";
var API_URL = "https://script.google.com/macros/s/AKfycbz_aSftsT_yOnhlHKr9OL6kF5ywznzZilkc5ovzODHo3p4iI7dSvaiaIIpBbXEar9b3bQ/exec?";

document.getElementById("thumbImg").addEventListener("click", () => { 
    document.getElementById("filePicker").click();
});

ImgSetBtn.addEventListener("click", () => {
    //console.log("Set Btn Clicked")
    ImgThumbValue = document.getElementById("Img_URL").value;
        document.getElementById("thumbImg").setAttribute("src", document.getElementById("Img_URL").value );
});

postDtToggle.addEventListener("change", () => {
    if (postDtToggle.checked == true)
        document.getElementById("publishingDate").style.display = "block";
    else
        document.getElementById("publishingDate").style.display = "none";
})

showDataButton.addEventListener("click", () => {
    fetch(API_URL + `getFullData=true`)
        .then(response => response.json())
        .then(data => {
            try {
                if (data.Data.toLowerCase() == "No Data Found".toLowerCase()) {
                }
            } catch (error) {
                AllData = Object.values(data.Data);
                //console.log(AllData);
            }

            LoadData(); // Loading Data at the begining
        })
});

document.getElementById("AddLinksBtn").addEventListener("click", () => { 
    var elmntToView = document.querySelector(".container .formInputs");
    elmntToView.scrollIntoView();
})

SaveBtn.addEventListener("click", () => {
    var value_P_Title = document.getElementById("P_Title").value;
    var value_P_URL = document.getElementById("P_URL").value;
    var value_Blog = document.getElementById("Blog").value;
    var value_PostDt = document.getElementById("publishingDate").value;
    var value_SConsole = document.getElementById("toggle_SConsole").checked;
    var value_Pinterest = document.getElementById("toggle_Pinterest").checked;
    var value_Twitter = document.getElementById("toggle_Twitter").checked;
    var value_Reels = document.getElementById("toggle_Reels").checked;
    //thumbnailImg
    if (SaveBtn.innerText != "Update") {
        if (value_P_Title != "") {

            var APIString = API_URL + `addRowData=true&dt1=${value_P_Title}&dt2=${value_P_URL}&dt3=${value_Blog}&dt4=${value_PostDt}&dt5=${value_SConsole}&dt6=${value_Pinterest}&dt7=${value_Twitter}&dt8=${value_Reels}&dt9=${ImgThumbValue}`;
            //console.log(APIString);
            fetch(APIString)
                    .then(response => response.json())
                    .then(data => {
                        
                        alert(data.Data);
                        document.getElementById("P_Title").value = "";
                        document.getElementById("P_URL").value = "";
                        document.getElementById("Blog").value = "";
                        document.getElementById("publishingDate").value = "";
                        document.getElementById("Img_URL").value = "";
                        document.getElementById("toggle_SConsole").checked = false;
                        document.getElementById("toggle_Pinterest").checked = false;
                        document.getElementById("toggle_Twitter").checked = false;
                        document.getElementById("toggle_Reels").checked = false;
                        document.getElementById("thumbImg").setAttribute("src", "https://ssl.gstatic.com/docs/templates/thumbnails/sheets-blank-googlecolors.png");
                        SaveBtn.innerText = "Save";
                        return;
                    });
        }
        else
            alert("Please enter the Post Title");
    }
    else
    {
        var APIString = API_URL + `updateRowData=${selectedPostID}&dt1=${value_P_Title}&dt2=${value_P_URL}&dt3=${value_Blog}&dt4=${value_PostDt}&dt5=${value_SConsole}&dt6=${value_Pinterest}&dt7=${value_Twitter}&dt8=${value_Reels}&dt9=${ImgThumbValue}`;
            //console.log(APIString);
        fetch(APIString)
            .then(response => response.json())
            .then(data => {

                alert(data.Data);
                document.getElementById("P_Title").value = "";
                document.getElementById("P_URL").value = "";
                document.getElementById("Blog").value = "";
                document.getElementById("publishingDate").value = "";
                document.getElementById("Img_URL").value = "";
                document.getElementById("toggle_SConsole").checked = false;
                document.getElementById("toggle_Pinterest").checked = false;
                document.getElementById("toggle_Twitter").checked = false;
                document.getElementById("toggle_Reels").checked = false;
                document.getElementById("thumbImg").setAttribute("src", "https://ssl.gstatic.com/docs/templates/thumbnails/sheets-blank-googlecolors.png");
                LoadData();
                SaveBtn.innerText = "Save";
                ImgThumbValue = "";
                return;
            });
    }

    if (postDtToggle.checked == true)
    {
        postDtToggle.checked = false;
        document.getElementById("publishingDate").style.display = "block";
    }
    initialLoad();

})

function LoadData() {
    var dataValues = "";
    var dataTable = document.querySelector(".data-wrapper");
    dataTable.innerHTML = "";
    var table_header = `<tr>
    <th colspan="2">Article Title</th>
    <th>Blog name</th>
    <th>Published</th>
    <th>Search Console</th>
    <th>Pinterest</th>
    <th>twitter</th>
    <th>Facebook Reel</th>
    <th>Thumbnail</th>
    <th>Action</th>
    </tr>`;
    if (AllData.length > 0) {

        for (i = 0; i < AllData.length; i++){
            var checkStatus = "done";

            if (AllData[i][2] == "") checkStatus = "undone";
            //if (AllData[i][4] == "false") checkStatus = "undone";
            //if (AllData[i][5] == false) checkStatus = "undone";
            //if (AllData[i][6] == false) checkStatus = "undone";
            //if (AllData[i][7] == false) checkStatus = "undone";
            //if (AllData[i][8] == false) checkStatus = "undone";
            //if (AllData[i][9] == "") checkStatus = "undone";

            if (BlogNamesList.includes(AllData[i][3]) == false)
                BlogNamesList.push(AllData[i][3]);

            dataValues = `
            <tr id=${AllData[i][0]} class="${checkStatus}">`;
            
            if (AllData[i][2] == "")
                dataValues +=`<td><i class="fas fa-copy"></td><td><a><p>${AllData[i][1]}</p></a></td>`;
            else
                dataValues +=`<td><i class="fas fa-copy"></td><td><a target="_blank" href="${AllData[i][2]}"><p>${AllData[i][1]}</p></a></td>`;
            
            dataValues += `<td>${AllData[i][3]}</td>`;
            
            if (AllData[i][4] != "")
            {
                if (AllData[i][4].length > 10)
                    AllData[i][4] = AllData[i][4].substring(10, 0);
                dataValues += `<td>${AllData[i][4]}</td>`;
            }
            else
                dataValues += `<td>UNPUBLISHED</td>`;
            
            dataValues += `<td>${AllData[i][5]}</td>
                <td>${AllData[i][6]}</td>
                <td>${AllData[i][7]}</td>
                <td>${AllData[i][8]}</td>`;
            if (AllData[i][9] == "")
                dataValues += `<td>No Image</td>`;
            else
                dataValues += `<td><a target="_blank" href="${AllData[i][9]}"><p>Image</p></a></td>`;
                
            dataValues += `<td><i class="fas fa-edit"></i><i class="fas fa-trash"></i></td>
            </tr> `;
            dataTable.insertAdjacentHTML("afterbegin", dataValues);
        }
        dataTable.insertAdjacentHTML("afterbegin", table_header);
        const FEBlogList = document.querySelector("#Blog-list");
        FEBlogList.innerHTML = "";
        for (let index = 0; index < BlogNamesList.length; index++) {
            FEBlogList.insertAdjacentHTML("afterbegin", `<option>${BlogNamesList[index]}</option>`);
        }

        tableRows = document.querySelectorAll(".data-wrapper tr");
        
        btnCopyTitle = document.querySelectorAll("table .fa-copy");
        EditDataButton = document.querySelectorAll(".CRUDContainer .DataTabularFormat table .fa-edit");
        DeleteDataButton = document.querySelectorAll(".CRUDContainer .DataTabularFormat table .fa-trash");

        CopyTitleFeature();
        EditDataFeature();
        DeleteDataFeature();

        enableSearch();
    }
}

function enableSearch() {
    searchTxtBox.addEventListener("keyup", () => {
        tableRows.forEach(DataRow => {
            if (DataRow != tableRows[0]) {
                if ((DataRow.children[1].innerText.toLowerCase() + DataRow.children[2].innerText.toLowerCase()).includes(searchTxtBox.value.toLowerCase()) == false)
                    DataRow.classList.add("hide");
                else
                    DataRow.classList.remove("hide");   
            }
        });
        //if (tableRows. searchTxtBox.value.toLowerCase())
    })
}

function getBaseUrl() {
    var file = document.querySelector('input[type=file]')['files'][0];
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        baseString = reader.result;
        //console.log(baseString); 
        ImgThumbValue = baseString;
        document.getElementById("thumbImg").setAttribute("src", baseString);

    };
    reader.readAsDataURL(file);
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

function CopyTitleFeature() { 
    btnCopyTitle.forEach(element => {
        element.parentElement.addEventListener("click", () => {
            copyText(element.parentElement.nextSibling.textContent);
        });
    });
}

function EditDataFeature(){
    EditDataButton.forEach(EditBtn => {
        EditBtn.addEventListener("click", () => {
            selectedPostID = EditBtn.parentElement.parentElement.getAttribute("id");
            for (i = 0; i < AllData.length; i++) { 
                if (AllData[i][0] == EditBtn.parentElement.parentElement.getAttribute("id"))
                {
                    document.getElementById("P_Title").value = AllData[i][1];
                    document.getElementById("P_URL").value = AllData[i][2];
                    document.getElementById("Blog").value = AllData[i][3];
                    //document.getElementById("publishingDate").value = true;
                    document.getElementById("toggle_Post").checked = false;
                    document.getElementById("publishingDate").style.display = "none";
                    document.getElementById("toggle_SConsole").checked = false;
                    document.getElementById("toggle_Pinterest").checked =  false;
                    document.getElementById("toggle_Twitter").checked =  false;
                    document.getElementById("toggle_Reels").checked = false;
                    
                    if (AllData[i][4] != ""){
                        document.getElementById("toggle_Post").checked = true;
                        document.getElementById("publishingDate").style.display = "block";
                        document.getElementById("publishingDate").value = AllData[i][4];
                    }
                    if (AllData[i][5] != false) document.getElementById("toggle_SConsole").checked = true;
                    if (AllData[i][6] != false) document.getElementById("toggle_Pinterest").checked = true;
                    if (AllData[i][7] != false) document.getElementById("toggle_Twitter").checked = true;
                    if (AllData[i][8] != false) document.getElementById("toggle_Reels").checked = true;
                        
                    
                    if (AllData[i][9] != "")
                    {
                        document.getElementById("Img_URL").value = AllData[i][9];
                        document.getElementById("thumbImg").setAttribute("src", AllData[i][9]);
                        ImgThumbValue = AllData[i][9];
                    }
                    SaveBtn.innerText = "Update";
                    break;
                }
            }
        })
    });
}

function DeleteDataFeature() {
    DeleteDataButton.forEach(DeleteBtn => {
        DeleteBtn.addEventListener("click", () => {
            selectedPostID = DeleteBtn.parentElement.parentElement.getAttribute("id");
            var APIString = API_URL + `deleteRowData=${selectedPostID}`;
            //console.log(APIString);
            fetch(APIString)
                .then(response => response.json())
                .then(data => {
                    alert(data.Data);
                    LoadData();
                    return;
                });
        })
    });
}

const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  }))

function initialLoad() {
    fetch(API_URL + `getFullData=true`)
        .then(response => response.json())
        .then(data => {
            try {
                if (data.Data.toLowerCase() == "No Data Found".toLowerCase()) {
                }
            } catch (error) {
                AllData = Object.values(data.Data);
                //console.log(AllData);
            }
            LoadData(); // Loading Data at the begining
        })
}
initialLoad();
  /*
https://script.google.com/macros/s/AKfycbz_aSftsT_yOnhlHKr9OL6kF5ywznzZilkc5ovzODHo3p4iI7dSvaiaIIpBbXEar9b3bQ/exec?

insert
https://script.google.com/macros/s/AKfycbz_aSftsT_yOnhlHKr9OL6kF5ywznzZilkc5ovzODHo3p4iI7dSvaiaIIpBbXEar9b3bQ/exec?addRowData=true&dt1=val1&dt2=val2&dt3=val3&dt4=val4&dt5=val5&dt6=val6&dt7=val7&dt8=val8&dt9=val9

update
https://script.google.com/macros/s/AKfycbz_aSftsT_yOnhlHKr9OL6kF5ywznzZilkc5ovzODHo3p4iI7dSvaiaIIpBbXEar9b3bQ/exec?updateRowData=iTHVj&dt1=MyVal1&dt2=URL&dt3=Blog Name&dt4=Date&dt5=No&dt6=No&dt7=val7&dt8=val8&dt9=Image
  */

btnUnPublished.addEventListener("click", () => {
    if (btnUnPublished.checked == true)
    {
        for (let index = 1; index < tableRows.length; index++) {
            if (tableRows[index].children[3].innerText != "UNPUBLISHED")
                tableRows[index].classList.add("hide");
        }
    }
    else {
        for (let index = 1; index < tableRows.length; index++) {
            tableRows[index].classList.remove("hide");
        }
    }
})

btnSearchConsole.addEventListener("click", () => {
    if (btnSearchConsole.checked == true)
    {
        for (let index = 1; index < tableRows.length; index++) {
            if (tableRows[index].children[4].innerText  != "false")
                tableRows[index].classList.add("hide");
        }
    }
    else {
        for (let index = 1; index < tableRows.length; index++) {
            tableRows[index].classList.remove("hide");
        }
    }
})

btnwithoutThumb.addEventListener("click", () => {
    if (btnwithoutThumb.checked == true)
    {
        for (let index = 1; index < tableRows.length; index++) {
            if (tableRows[index].children[8].innerText  != "No Image")
                tableRows[index].classList.add("hide");
        }
    }
    else {
        for (let index = 1; index < tableRows.length; index++) {
            tableRows[index].classList.remove("hide");
        }
    }
})