// Array de objetos persona.
let personas = [
    { fecha: "21/11/2023", codigo: 4124132, descripcion: "Alquiler", debito: "", credito: 250000 },
    { fecha: "30/10/2023", codigo: 7423431, descripcion: "Alquiler", debito: "", credito: 250000 },
    { fecha: "15/05/2022", codigo: 1264223, descripcion: "Pago Ticket", debito: 1600, credito: "" },
    { fecha: "13/05/2022", codigo: 9868479, descripcion: "Alquiler", debito: "", credito: 250000 },
    { fecha: "27/02/2022", codigo: 1836343, descripcion: "Pago Ticket", debito: 1600, credito: "" }
  ];

  // Seleccionamos la tablaPersonas.
  let tabla = document.querySelector(".movimientos__tabla");

  // Recorremos cada objeto en el array e insertamos el html con los datos.
  personas.forEach( (persona) => {
    let row = tabla.insertRow();
    let nombreCell = row.insertCell();
    let apellido1Cell = row.insertCell();
    let apellido2Cell = row.insertCell();
    let salarioCell = row.insertCell();
    let puestoCell = row.insertCell();

    nombreCell.textContent = persona.fecha;
    apellido1Cell.textContent = persona.codigo;
    apellido2Cell.textContent = persona.descripcion;
    salarioCell.textContent = persona.debito;
    puestoCell.textContent = persona.credito;
});