// >>var para pegar radio da cifra.
var cifraCesar = document.querySelector("#cifraCesar");

// >>var que pega o radio de base de 64
var base64 = document.querySelector("#base64");

// >>var que pega a div com a caixa de boxIncremento da cifra de Cesar
var boxIncremento = document.querySelector(".caixaCesar");

// >>var que pega o botão de envio que pega o input de incremento de Cesar
var inputIncremento = document.getElementById("incrementoCesar");

// >>var que pega o botão de envio
var btn = document.querySelector("#btnEnvio");

// >>var que pega o input de Codigo
var inputCodigo = document.getElementById("inputCodigo");

// >>var que receberá texto
var texto;

// >>var que recebe o input de resposta
var inputResposta = document.getElementById("resposta");

// >>var que receberá resposta
var resposta;

// >>var que pegará o radio button codificar
var codificar = document.getElementById("codificar");

// >>var que pegará o radio button decodificar
var decodificar = document.getElementById("decodificar");

// >>function que faz aparecer o campo de boxIncremento da cifra de Cesar ao apertar no radio
cifraCesar.addEventListener("click", function () {
  // >>pegar variavel com display da div de boxIncremento da cifra de cesar
  var display = boxIncremento.style.display;

  // >>fazendo lógica para caso o display seja diferente de flex, ao clicar no radio de Cifra de Cesar, ele virar flex.
  if (display !== "flex") {
    boxIncremento.style.display = "flex";
  }
});

// >>funcao para o campo de boxIncremento da cifra de Cesar sumir ao apertar em base de 64
base64.addEventListener("click", function () {
  // >>pegar o display da div com campo de boxIncremento
  var display = boxIncremento.style.display;
  
  if (display === "flex") {
    boxIncremento.style.display = "none";
  }
});


btn.addEventListener("click", function (e) {
  
  e.preventDefault();

  
  var validacaoEntradas = validaEntradas();

  
  if (validacaoEntradas == true) {
    
    var boxResposta = document.querySelector(".boxResposta");

    
    var visibility = boxResposta.style.visibility;
    if (visibility !== "visible") {
      boxResposta.style.visibility = "visible";
    }

  
    apareceResposta();
  }
});


function apareceResposta() {
  
  texto = inputCodigo.value;
  
  resposta = validacao(texto);
  
  inputResposta.value = resposta;
}


function validacao(entrada) {
  
  if (base64.checked) {
    
    var codificado = validaBase64(entrada);
  
    return codificado;
  } else if (cifraCesar.checked) {
    
    var codificado = validaCifraCesar(entrada);

    return codificado;
  }
}

// >>funcao de criptografia da base de 64 que recebe texto de entrada como parametro
function validaBase64(entrada) {
  // >>crio uma variavel nova para a resposta
  var newResposta;
  // >>se opção codificar for a selecionada
  if (codificar.checked) {
    // >>var nova resposta recebe o texto de entrada codificado graças ao metodo btoa que existe no JavaScript
    newResposta = btoa(entrada);
    // >>retorno newResposta
    return newResposta;
  } else {

    newResposta = atob(entrada);
    return newResposta;
  }
}

// >>função que valida cifra de cesar recebendo o texto de entrada como parametro.
function validaCifraCesar(entrada) {
  var frase = entrada;
  frase = frase.toLowerCase();
  var incremento = parseInt(inputIncremento.value);
  if (codificar.checked) {
    var cod = codificaCesar(frase, incremento);
    return cod;
  } else {
    var decode = decodificaCesar(frase, incremento);
    return decode;
  }
}

// >>funcao responsavel por validar as entradas
function validaEntradas() {
  texto = inputCodigo.value;
  if (texto.length == 0) {
    alert("Você precisa colocar alguma entrada!");
    return false;
  } else if (base64.checked == false && cifraCesar.checked == false) {
    alert("Você precisa selecionar alguma opção de criptografia.");
    return false;
  } else if (codificar.checked == false && decodificar.checked == false) {
    alert("Você precisa selecionar se quer codificar ou decodificar");
    return false;
  } else {
    return true;
  }
}

function codificaCesar(ent, inc) {
  var newResposta = "";
  var frase = ent;
  var fraseASC = "";
  var fraseOK = "";
  var deslocamento;
  for (var i = 0; i < frase.length; i++) {
    if (frase[i] === " ") {
      newResposta += " ";
    } else {
      var asc = frase[i];
      asc = asc.charCodeAt(0);
      deslocamento = asc + inc;
      if (deslocamento >= 97 && deslocamento <= 122) {
        fraseASC = asc + inc;
        fraseOK = String.fromCharCode(fraseASC);
      } else {
        fraseASC = ((asc - 97 + inc) % 26) + 97;
        fraseOK = String.fromCharCode(fraseASC);
      }
      newResposta += fraseOK;
    }
  }
  return newResposta;
}

function decodificaCesar(ent, inc) {
  var newResposta = "";
  var frase = ent;
  var fraseASC = "";
  var fraseOK = "";
  var deslocamento;
  for (var i = 0; i < frase.length; i++) {
    if (frase[i] === " ") {
      newResposta += " ";
    } else {
      var asc = frase[i];
      asc = asc.charCodeAt(0);
      deslocamento = asc - inc;
      if (deslocamento >= 97 && deslocamento <= 122) {
        fraseASC = asc - inc;
        fraseOK = String.fromCharCode(fraseASC);
      } else {
        fraseASC = ((asc - 122 - inc) % 26) + 122;
        fraseOK = String.fromCharCode(fraseASC);
      }
      newResposta += fraseOK;
    }
  }
  return newResposta;
}
