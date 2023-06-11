// Array de objetos persona.
let personas = [
    { banco: "BCR", cedula: 134057240, fecha: "07/10/2023", codigo: 4124132, descripcion: 40000, debito: 23089090},
    { banco: "BCR", cedula: 268050240, fecha: "04/07/2023", codigo: 4128356, descripcion: 400000, debito: 61027990},
    { banco: "BN", cedula:  305460830,  fecha: "20/02/2022", codigo: 1836343, descripcion: 60000, debito: 45029040}
  ];

  // Seleccionamos la tablaPersonas.
  let tabla = document.querySelector(".movimientosBCCR__tabla");

  // Recorremos cada objeto en el array e insertamos el html con los datos.
  personas.forEach( (persona) => {
    let row = tabla.insertRow();
    
    let cedulaCell = row.insertCell();
    let BancoCell = row.insertCell();
    let nombreCell = row.insertCell();
    let apellido1Cell = row.insertCell();
    let apellido2Cell = row.insertCell();
    let salarioCell = row.insertCell();
    let puestoCell = row.insertCell();

    cedulaCell.textContent = persona.cedula;
    BancoCell.textContent = persona.banco;
    nombreCell.textContent = persona.fecha;
    apellido1Cell.textContent = persona.codigo;
    apellido2Cell.textContent = persona.descripcion;
    salarioCell.textContent = persona.debito;
    puestoCell.textContent = persona.credito;
});