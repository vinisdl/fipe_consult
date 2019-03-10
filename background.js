$(document).ready( 

  function(){
    document.querySelectorAll(".mdc-select").forEach((val)=> mdc.select.MDCSelect.attachTo(val));
    $("#idTipo").on('change', function() {
      clearSelects();
      getMarca(getValue("idTipo"));
    });

    $("#idMarca").on('change', function() {
      document.getElementById("idModelo").innerHTML = "<option value=''></option>";
      document.getElementById("idAno").innerHTML = "<option value=''></option>";
      document.getElementById("preco").innerHTML = "";

      getModelo(getValue("idTipo"), getValue("idMarca"));
    });

    $("#idModelo").on('change', function() {
      document.getElementById("preco").innerHTML = "";
      document.getElementById("idAno").innerHTML = "<option value=''></option>";
      getAno(getValue("idTipo"), getValue("idMarca"), getValue("idModelo"));
    });

    $("#idAno").on('change', function() {
      document.getElementById("preco").innerHTML = "";
      getResult(getValue("idTipo"), getValue("idMarca"), getValue("idModelo"), getValue("idAno"));
    });
  }  
);

clearSelects = () =>{
  document.getElementById("idMarca").innerHTML = "<option value=''></option>";
  document.getElementById("idModelo").innerHTML = "<option value=''></option>";
  document.getElementById("idAno").innerHTML = "<option value=''></option>";
  document.getElementById("preco").innerHTML = "";
}

getValue = (id) => {
  const el = document.getElementById(id)
  const value = el.selectedOptions[0].value
  if(value)
    return value;
  return null;
}

getMarca = (tipo) => {

  fetch(`https://fipeapi.appspot.com/api/1/${tipo}/marcas.json`)        
  .then((response) => {   
    response.json()
    .then((json)=> {
      const selectMarca = document.getElementById("idMarca");
      json.forEach(element => {
        var option = document.createElement("option");
        option.text = element.name;
        option.value = element.id;
        selectMarca.add(option)
      });
    });
  })
}

getModelo = (idTipo, idMarca) => {
  fetch(`https://fipeapi.appspot.com/api/1/${idTipo}/veiculos/${idMarca}.json`)
  .then((response) => {   
    response.json()
    .then((json)=> {
      const selectModelo = document.getElementById("idModelo");
      json.forEach(element => {
        var option = document.createElement("option");
        option.text = element.name;
        option.value = element.id;
        selectModelo.add(option)
      });
    });
  })
}

getAno = (idTipo, idMarca, idModelo) => {
  fetch(`https://fipeapi.appspot.com/api/1/${idTipo}/veiculo/${idMarca}/${idModelo}.json`)
  .then((response) => {   
    response.json()
    .then((json)=> {
      const selectAno = document.getElementById("idAno");
      json.map(element => {
        var option = document.createElement("option");
        option.text = element.name;
        option.value = element.key;
        selectAno.add(option)
      });
    });
  })
}


getResult = (idTipo, idMarca, idAno, key) => {
  fetch(`https://fipeapi.appspot.com/api/1/${idTipo}/veiculo/${idMarca}/${idAno}/${key}.json`)
  .then((response) => {            
    response.json()
    .then((json)=> {
      console.log(json)
      document.getElementById("preco").innerText = json.preco;
    })
  })
}