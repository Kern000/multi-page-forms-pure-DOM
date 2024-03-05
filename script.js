let productTable = document.querySelector("#product-table");

document.addEventListener("DOMContentLoaded", () => {

    if(localStorage.getItem("productData")){

        console.log(localStorage.getItem("productData"))

        let retrievedData = JSON.parse(localStorage.getItem("productData"));

        productData=retrievedData;
    }

    let newTable = document.createElement("table");
    newTable.setAttribute("class", "table");

    let newHeader = document.createElement("thead");

    let newHeaderRow = document.createElement("tr");

    for (let key in productData[0]){

        let newHeaderData = document.createElement("th");
            newHeaderData.innerHTML = `${key}`
            newHeaderRow.appendChild(newHeaderData);
    }
    let extraHeader = document.createElement("th");
    let extraHeader2 = document.createElement("th");
    newHeaderRow.appendChild(extraHeader);
    newHeaderRow.appendChild(extraHeader2);

    newHeader.appendChild(newHeaderRow);
    newTable.appendChild(newHeader);

    let newBody = document.createElement("tbody");

    let index=0;

    for (let product of productData){
        let newRow = document.createElement("tr");
        for (let key in product){
            let newDataCell = document.createElement("td");
            newDataCell.innerHTML = `${product[key]}`
            newRow.appendChild(newDataCell);
        }

        let HTMLAnchor = document.createElement("a");
        HTMLAnchor.setAttribute("href", "delete.html");
        HTMLAnchor.setAttribute("onclick", `setIndex(${index})`)

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button")
        deleteBtn.setAttribute("class", "btn btn-danger");
        deleteBtn.innerText = "Delete";

        HTMLAnchor.appendChild(deleteBtn);
        newRow.appendChild(HTMLAnchor)

        let HTMLAnchor2 = document.createElement("a");
        HTMLAnchor2.setAttribute("href", "edit.html");
        HTMLAnchor2.setAttribute("onclick", `setIndex(${index})`);

        let editBtn = document.createElement("button");
        editBtn.setAttribute("type", "button");
        editBtn.setAttribute("class", "btn btn-secondary");
        editBtn.innerText = "Edit";

        HTMLAnchor2.appendChild(editBtn);
        newRow.appendChild(HTMLAnchor2)

        newBody.appendChild(newRow);

        index++;
    }
    newTable.appendChild(newBody);
    productTable.appendChild(newTable);

})

function setIndex(index){
    localStorage.setItem("index", index);
}

let submitBtn = document.querySelector("#submit-btn");

submitBtn.addEventListener("click", ()=>{
    addNew()
})

function addNew(){

    let title = document.querySelector("#title").value;
    let duration = document.querySelector("#duration").value;
    let format = document.querySelectorAll("#format input:checked")
    let formatValues = [];
    if (format.length >= 1){
        for (let f of format){
            formatValues.push(f.value);          
        }
    }
    let studio = document.querySelector("#studio input:checked").value

    const newProduct = {
        id : Math.floor(Math.random() * 10009),
        title : title,
        duration : parseInt(duration),
        format : formatValues,
        studio : studio
    }

    productData.push(newProduct)
    let processedData = JSON.stringify(productData);

    localStorage.setItem("productData", processedData)
}

function renderDeletePage(){

    let indexToDelete = localStorage.getItem("index");

    let itemToDelete = document.querySelector("#deleter");
    let tableHeader = document.querySelector("#deleter-header");

    for (let key in productData[indexToDelete]){
        
        let newHeaderCell = document.createElement("th");
        newHeaderCell.innerText = `${key}`;
        tableHeader.appendChild(newHeaderCell);

        let newDataCell = document.createElement("td");
        newDataCell.innerText = `${productData[indexToDelete][key]}`;

        itemToDelete.appendChild(newDataCell)
    }

}

function deleteCurrentItem(){
    let indexToDelete = localStorage.getItem("index");
    let left = productData.slice(0,indexToDelete);
    let right = productData.slice(indexToDelete+1);
    let modifiedProductData = [...left, ...right];
    modifiedProductData = JSON.stringify(modifiedProductData);  
    localStorage.setItem("productData", modifiedProductData);
}

function renderEditPage(){
    let indexToEdit = localStorage.getItem("index");
    console.log("index to edit", indexToEdit);
    let itemToEdit = productData[indexToEdit];

    console.log("render edit page here", itemToEdit)

    let titleBar = document.querySelector("#title-edit");
    let durationBar = document.querySelector("#duration-edit");
    let formatCheckbox = document.querySelectorAll(".format-edit");
    let studioRadio = document.querySelectorAll(".studio-edit");

    titleBar.value = itemToEdit.title;
    durationBar.value = itemToEdit.duration;
    for (let item of itemToEdit.format){
        for (let checkbox of formatCheckbox){
            console.log("checkbox", checkbox)
            console.log("checkbox.value", checkbox.value);
            console.log("item", item);
            if (checkbox.value == item){
                checkbox.checked = true;
            } 
        }
    }
    for (let radio of studioRadio){
        console.log("studioRadio here", studioRadio);
        if (radio.value == itemToEdit.studio){
            radio.checked = true;
        }
    }

}

function updateCurrentItem(){
    const indexToEdit = localStorage.getItem("index");

    const idToEdit = productData[indexToEdit].id;

    const title = document.querySelector("#title-edit").value;
    const duration = document.querySelector("#duration-edit").value;

    let format = document.querySelectorAll(".format-edit:checked");

    let formatValue = [];
    for(let object of format){
        formatValue.push(object.value);
    }

    console.log("format value here", formatValue);

    const studio = document.querySelector(".studio-edit:checked").value;

    const updatedProduct = {
        id: idToEdit,
        title: title,
        duration: duration,
        format: formatValue,
        studio: studio,
    }

    let left = productData.slice(0, indexToEdit);
    let right = productData.slice(indexToEdit+1);
    let modifiedProductData = [...left, updatedProduct, ...right];
    processedData = JSON.stringify(modifiedProductData);

    console.log("processedData", processedData)

    localStorage.setItem("productData", processedData);

}


