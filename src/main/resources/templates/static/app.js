document.addEventListener("DOMContentLoaded", function (event) {
    initTable();
});

const path = "http://localhost:8080/tanks"

async function initTable() {
    let table = document.getElementById('tableContainers')
    let response = await fetch(path + '/list');

    let containers = await response.json();
    await containers.forEach(containers => {
        table.insertAdjacentHTML('beforeend',
            `<td> ${containers.id} </td>
                            <td> ${containers.waterAmount} </td>
                            <td><div class="input-group m-2 w-30">
    <input type="text" class="form-control water_${containers.id}"  id="waterAmount_${containers.id}" placeholder="Количество воды"
           aria-label="Количество воды" aria-describedby="button-addon2">
    <button class="btn btn-outline-secondary" onclick="addWater(${containers.id})" type="button">Добавть воду</button>
</div></td>
<td><div class="input-group m-2 w-30">
    <input type="text" class="form-control" id="connectTo_${containers.id}" placeholder="Id контейнера"
           aria-label="Соединить с" aria-describedby="button-addon2">
    <button class="btn btn-outline-secondary" onclick="connectTo(${containers.id})" type="button">Соединить с</button>
</div></td>
`)
    })
}

async function generateContainer() {
    let inputCount = document.getElementById("countForGenerate").value;
    if (inputCount === '') {
        return
    }
    let url = new URL(path + "/create");
    let param = {
        amount: inputCount
    }
    url.search = new URLSearchParams(param).toString();
    let response = await fetch(url)
    let containers = await response.json();
    console.log(containers)
    await createTable();
}

async function addWater(id) {
    let inputWater = document.getElementById(`waterAmount_${id}`).value;
    let url = new URL(path + "/addWater");
    let param = {
        waterAmount: inputWater,
        id: id
    }
    url.search = new URLSearchParams(param).toString();
    let response = await fetch(url)
    let containers = await response.json();
    console.log(containers)
    await createTable();
}

async function connectTo(id) {
    let inputId = document.getElementById(`connectTo_${id}`).value;
    let url = new URL(path + "/connectTo");
    let param = {
        otherId: inputId,
        id: id
    }
    url.search = new URLSearchParams(param).toString();
    let response = await fetch(url)
    let containers = await response.json();
    console.log(containers)
    await createTable();
}

async function createTable() {
    document.querySelectorAll("table tbody tr").forEach(function (e) {
        e.remove()
    })
    await initTable();
}



