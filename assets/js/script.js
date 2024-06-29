const listaDeTareas = document.querySelector("#tareas")
const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const cuentaTareas = document.querySelector("#cuenta-tareas")
const cuentaTareasRealizadas = document.querySelector("#cuenta-tareas-realizadas")

//Arreglo de tareas como objetos
const tareas = [
    { id: Date.now() % 100, nombre: "Tarea 1", completa: false },
    { id: Date.now() % 100 + 1, nombre: "Tarea 2", completa: true },
    { id: Date.now() % 100 + 2, nombre: "Tarea 3", completa: false }
]

btnAgregar.addEventListener("click", () => {
    //Recibe nueva tarea por input
    const tarea = tareaInput.value
    // Crea una nueva tarea como objeto
    const nuevaTarea = {
        //Asigna un id y lo reduce a 2 digitos
        id: Date.now() % 100, 
        //Asigna descripcion de input como nombre
        nombre: tarea, 
        //Asigna estado como valor booleano
        completa:false
    }
    //Agrega nueva tarea al arreglo
    tareas.push(nuevaTarea)
    //Limpia input para ingresar mas tareas
    tareaInput.value = ""
    //Actualiza y carga lista de tareas
    renderTareas(tareas)
})

//Render de tareas usando .createElement(), .appendChild() y .createDocumentFragment()
function renderTareas(tareas) {
    // Limpia el contenido anterior
    listaDeTareas.innerHTML = ""
    // Crea un fragmento de documento
    const fragment = document.createDocumentFragment()

    // Recorre el arreglo de tareas usando for...of
    for (const tarea of tareas) {
        // Crea los elementos HTML necesarios
        const tr = document.createElement("tr")

        const tdId = document.createElement("td")
        tdId.textContent = tarea.id
        tr.appendChild(tdId)

        const tdNombre = document.createElement("td")
        tdNombre.textContent = tarea.nombre
        tr.appendChild(tdNombre)

        const tdCompleta = document.createElement("td")
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = tarea.completa
        checkbox.addEventListener("click", () => estadoCompletado(tarea.id))
        tdCompleta.appendChild(checkbox)
        tr.appendChild(tdCompleta)

        const tdEliminar = document.createElement("td")
        const button = document.createElement("button")
        button.textContent = "Eliminar"
        button.addEventListener("click", () => borrarTarea(tarea.id))
        tdEliminar.appendChild(button)
        tr.appendChild(tdEliminar)

        // Añade el tr al fragmento
        fragment.appendChild(tr)
    }

    // Añade el fragmento al contenedor de la lista de tareas
    listaDeTareas.appendChild(fragment)

    // Comprobar actualizaciones del arreglo por consola
    console.log(tareas)

    // Cuenta y actualiza el total de tareas en la lista
    cuentaTareas.textContent = `${tareas.length}`

    // Filtra, cuenta y actualiza el total de tareas completas
    cuentaTareasRealizadas.textContent = `${tareas.filter(t => t.completa).length}`
}

//Render de tareas con .forEach() y `</html>`
/*function renderTareas(tareas){
    let html = ""
    //Recorre arreglo de tareas usando .forEach()
    tareas.forEach((tarea) => {
        //Crea los elementos en html con el siguiente template
        html += `
            <tr>
                <td>${tarea.id}</td>
                <td>${tarea.nombre}</td>
                <td><input type="checkbox" ${tarea.completa ? "checked" : ""} onclick="estadoCompletado(${tarea.id})"></td>
                <td><button onclick="borrarTarea(${tarea.id})"> Eliminar </button></td>
            </tr>
            `
    })
    //Actualiza lista de tareas
    listaDeTareas.innerHTML = html

    //Comprobar actualizaciones del arreglo por consola
    console.log(tareas)

    //Cuenta y actualiza el total de tareas en la lista
    cuentaTareas.textContent = `${tareas.length}`

    //Filtra, cuenta y actualiza el total de tareas completas
    cuentaTareasRealizadas.textContent = `${tareas.filter(t => t.completa).length}` 
}*/

function estadoCompletado(id) {
    //Busca la tarea por index
    const index = tareas.findIndex(t => t.id === id) 
    //Verifica id existente
    if (index !== -1) {
        //Invierte el valor booleano inicial
        tareas[index].completa = !tareas[index].completa
        //Actualiza la lista tras cambiar estado de tarea
        renderTareas(tareas)
    }
}

function borrarTarea(id){
    //Busca la tarea por index
    const index = tareas.findIndex(ele => ele.id === id) 
    //Verifica id existente
    if (index !== -1) {
        //Elimina la tarea del arreglo de objetos
        tareas.splice(index, 1) 
        //Actualiza la lista tras eliminar tarea
        renderTareas(tareas)
    }
}
//Carga lista de 3 tareas iniciales
renderTareas(tareas)