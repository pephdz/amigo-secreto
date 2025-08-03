// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

let listaAmigos = [];

// Función capitalizar primera letra 
function capitalizarNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

// Función verificar nombre ya existe (insensible a mayúsculas)
function nombreExiste(nombre) {
    return listaAmigos.some(
        n => n.toLowerCase() === nombre.toLowerCase()
    );
}

// Función agregar amigo 
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    const listaAmigosElement = document.getElementById('listaAmigos');
    const resultadoElement = document.getElementById('resultado');
    const nombreValidoRegex = /^[a-zA-ZÀ-ÿ\s'-]{1,30}$/;

    // Validar 
    if (nombreAmigo === '') {
        alert('Por favor ingresa un nombre válido');
        return;
    }

    if (!nombreValidoRegex.test(nombreAmigo)) {
        alert('Nombre inválido. Solo letras, espacios y guiones permitidos (máx 30 caracteres)');
        inputAmigo.focus();
        return;
    }

    if (nombreExiste(nombreAmigo)) {
        alert('Este nombre ya está en la lista');
        inputAmigo.focus();
        return;
    }

    // Procesar agregar nombre
    const nombreCapitalizado = capitalizarNombre(nombreAmigo);
    listaAmigos.push(nombreCapitalizado);

    // Actualizar lista 
    const li = document.createElement('li');
    li.textContent = nombreCapitalizado;
    li.className = 'name-item';
    listaAmigosElement.appendChild(li);

    // Limpiar preparar siguiente entrada
    inputAmigo.value = '';
    inputAmigo.focus();
    resultadoElement.innerHTML = '';
}

// Función sortear amigo secreto
function sortearAmigo() {
    const listaAmigosElement = document.getElementById('listaAmigos');
    const resultadoElement = document.getElementById('resultado');

    // Validar existan amigos en lista
    if (listaAmigos.length === 0) {
        resultadoElement.innerHTML = '<li class="result-item">No hay amigos en la lista</li>';
        return;
    }

    // Generar un índice aleatorio
    const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    const amigoSecreto = listaAmigos[indiceAleatorio];

    // Mostrar el resultado
    resultadoElement.innerHTML = `
        <li class="result-item">
            <span class="result-text">¡El amigo secreto es:</span>
            <span class="result-name">${amigoSecreto}</span>
        </li>🎉🎉
    `;

    // Resaltar nombre en lista
    const itemsLista = listaAmigosElement.querySelectorAll('.name-item');
    itemsLista.forEach((item, index) => {
        item.classList.toggle('selected', index === indiceAleatorio);
    });

    // Cambiar visibilidad  botones
    document.getElementById('main-buttons').style.display = 'none';
    document.getElementById('post-draw-buttons').style.display = 'block';
}

// Función reiniciar  juego 
function reiniciarJuego() {
    listaAmigos = [];
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
    
    // Restaurar visibilidad de botones
    document.getElementById('main-buttons').style.display = 'block';
    document.getElementById('post-draw-buttons').style.display = 'none';
    
    document.getElementById('amigo').focus();
}

// Función salir  juego 
function salirJuego() {
    document.getElementById('resultado').innerHTML = `
        <li class="result-item">
            <span class="result-text">¡Gracias por jugar Amigo Secreto!</span>
        </li>
    `;
    
    // Deshabilitar controles
    document.getElementById('amigo').disabled = true;
    document.querySelector('.button-add').disabled = true;
    
    // Ocultar todos los botones
    document.getElementById('main-buttons').style.display = 'none';
    document.getElementById('post-draw-buttons').style.display = 'none';
    
    // Mostrar botón volver a jugar
    const playAgainButton = document.createElement('button');
    playAgainButton.className = 'button-restart';
    playAgainButton.innerHTML = `
        <img src="assets/refresh.png" alt="Jugar de nuevo">
        Volver a jugar
                                `;
    playAgainButton.onclick = function() {
        location.reload();
    };
    document.querySelector('.input-section').appendChild(playAgainButton);
}
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarAmigo();
    }
});
