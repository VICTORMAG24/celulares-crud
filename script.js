const container = document.querySelector('.container')
const containerItem = document.querySelector('.container-item')
const titulo = document.querySelector('.title')
const modal = document.querySelector('.container-modal')
const btnCerrarModal = document.querySelector('.btn-cerrar');
const btnAgregar = document.querySelector('.btn-agregar')
const containerForm = document.querySelector('.modal-form')
const btnActualizar = document.querySelector('.btn-actualizar')
const containerBtn = document.querySelector('.form-btn')

//<=======================READ=========================>
function listCell() {
    celulares.forEach((celular, index) => {
        let btnEdit = `<button class="far fa-edit btn edit" data-edit-id="${index}">  </button>  `
        let btnRemove = `<button class="fas fa-trash-alt btn eliminar "  data-remove-id="${index}"></button> `
        const cellHTML =
            `  
            <article class="container-list">
             <div class="contianer-item">
            <div class="id list">${celular.id}</div>
            <p class="marca list">${celular.marca}</p>
            <p class="color list">${celular.color}</p>
            <p class="almacenamiento list">${celular.almacenamiento}</p>
            <div class="btn-container">
            ${btnEdit}
            ${btnRemove}
            </div>
            </div>
            </article>
            `
        containerItem.innerHTML += cellHTML
    });
}
listCell()
//<======================DELETE=========================>
containerItem.addEventListener('click', eliminarItem)
function eliminarItem(e) {
    if (e.target.classList.contains('eliminar')) {
        const index = e.target.dataset.removeId
        celulares.splice(index, 1)
        containerItem.innerHTML = ''
        listCell()
    }
}
//<======================MODAL EDIT=========================>
containerItem.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit')) {
        const index = e.target.dataset.editId;
        const cell = celulares[index];
        modal.style.display = 'block';
        titulo.textContent = 'Editar modelo celular';

        containerForm.querySelector('.marca').value = cell.marca;
        containerForm.querySelector('.color').value = cell.color;
        containerForm.querySelector('.almacenamiento').value = cell.almacenamiento;

        btnAgregar.style.display = 'none';
        btnActualizar.style.display = 'block';

        btnActualizar.dataset.editId = index;
    }
});

containerBtn.addEventListener('click', btnCancelarVaciar)
function btnCancelarVaciar(e) {

    e.preventDefault();
    if (e.target.classList.contains('btn-cancelar')) {
        containerForm.querySelector('.marca').value = '';
        containerForm.querySelector('.color').value = '';
        containerForm.querySelector('.almacenamiento').value = ''
        modal.style.display = 'none'
    }   
    

}

btnCerrarModal.addEventListener('click', funcionCerrar)
function funcionCerrar(e) {
    modal.style.display = 'none'
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
})
//<======================MODAL NEW CELL=========================>
container.addEventListener('click', btnNewCell)
function btnNewCell(e) {
    if (e.target.classList.contains('add-cell')) {
        modal.style.display = 'block'
    }
    btnActualizar.style.display = 'none'
    btnAgregar.style.display = 'block'
    titulo.textContent = 'agregar nuevo celular'
}

//<======================CREATE=========================>
btnAgregar.addEventListener('click', addCell)
function addCell() {
    const inputMarca = containerForm.querySelector('.marca').value;
    const inputColor = containerForm.querySelector('.color').value;
    const inputAlmacenamiento = containerForm.querySelector('.almacenamiento').value;

    const nuevoCell = {
        id: celulares.length + 1,
        marca: inputMarca,
        color: inputColor,
        almacenamiento: inputAlmacenamiento,
    }
    containerForm.querySelector('.marca').value = ''
    containerForm.querySelector('.color').value = ''
    containerForm.querySelector('.almacenamiento').value = ''

    celulares.push(nuevoCell)
    const btnEdit = `<button class="far fa-edit btn edit" data-edit-id="${celulares.length - 1}"></button>`;
    const btnRemove = `<button class="fas fa-trash-alt btn eliminar" data-remove-id="${celulares.length - 1}"></button>`;
    const cellHTML = `
        <article class="container-list">
        <div class="contianer-item">
        <div class="id list">${nuevoCell.id}</div>
        <p class="marca list">${nuevoCell.marca}</p>
        <p class="color list">${nuevoCell.color}</p>
        <p class="almacenamiento list">${nuevoCell.almacenamiento}</p>
        <div class="btn-container">
        ${btnEdit}
        ${btnRemove}
        </div>
        </div>
        </article>
    `;
    containerItem.innerHTML += cellHTML
    modal.style.display = 'none'
}

//<======================UPDATE=========================>
btnActualizar.addEventListener('click', function () {
    const index = btnActualizar.dataset.editId;
    const inputMarca = containerForm.querySelector('.marca').value;
    const inputColor = containerForm.querySelector('.color').value;
    const inputAlmacenamiento = containerForm.querySelector('.almacenamiento').value;

    celulares[index].marca = inputMarca;
    celulares[index].color = inputColor;
    celulares[index].almacenamiento = inputAlmacenamiento;

    containerForm.querySelector('.marca').value = '';
    containerForm.querySelector('.color').value = '';
    containerForm.querySelector('.almacenamiento').value = '';
    containerItem.innerHTML = '';

    modal.style.display = 'none'
    listCell();
});
