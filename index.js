let vista = [[],[],[]];
const DIMENSION_MATRIZ = 3;

//Inicializa la matriz
for(let i = 0; i<DIMENSION_MATRIZ;i++){
    for(let j = 0; j<DIMENSION_MATRIZ;j++){
        vista[i][j] = document.getElementById(`fila${i}columna${j}`);
        vista[i][j].addEventListener("click",function(){
            let jugar = true;
            //Representa el turno del jugador y el turno de la IA
            if(this.innerHTML == ""){
                this.innerHTML = "X";
                turnoIA(i,j);
                //Controlamos la vitoria
                comprobarVictoria();
            }else{
                console.log("Casilla no permitida");
            }
        });
    }
}

//IA Defensiva
function turnoIA(i,j){
    let turno = true;

    //En caso de poder hacer 3 en raya la IA ataca
    if(turno){
        //Horizontal
        for(let i = 0; i<DIMENSION_MATRIZ && turno; i++){
            let oCount = 0;      
            let xCount = 0;
            let pos = [];
            for(let j = 0; j<DIMENSION_MATRIZ; j++){
                if(vista[i][j].innerHTML == "O"){
                    oCount++;
                }else if(vista[i][j].innerHTML == "X"){
                    xCount++;
                }else if(vista[i][j].innerHTML == ""){
                    pos.push(i,j);
                }
            }
            if(oCount == 2 && xCount == 0){
                vista[pos[0]][pos[1]].innerHTML = "O";
                turno = false;
            }
        }
        //Vertical
        for(let j = 0; j<DIMENSION_MATRIZ && turno; j++){
            let oCount = 0;      
            let xCount = 0;
            let pos = [];
            for(let i = 0; i<DIMENSION_MATRIZ; i++){
                if(vista[i][j].innerHTML == "O"){
                    oCount++;
                }else if(vista[i][j].innerHTML == "X"){
                    xCount++;
                }else if(vista[i][j].innerHTML == ""){
                    pos.push(i,j);
                }
            }
            if(oCount == 2 && xCount == 0){
                vista[pos[0]][pos[1]].innerHTML = "O";
                turno = false;
            }
        }
        //Diagonales
        //Diagonal principal
        let oCount = 0;
        let xCount = 0;
        let pos = [];
        for(let i = 0; i<DIMENSION_MATRIZ && turno; i++){
            let j = i;
            if(vista[i][j].innerHTML == "O"){
                oCount++;
            }else if(vista[i][j].innerHTML == "X"){
                xCount++;
            }else{
                pos.push(i,j);
            }
        }
        if(turno && xCount == 0 && oCount == 2){
            vista[pos[0]][pos[1]].innerHTML = "O";
            turno = false;
        }
        //Diagonal inversa
        if(turno){
            if(vista[0][2].innerHTML == "O" && vista[1][1].innerHTML == "O" && vista[2][0].innerHTML == ""){
                vista[2][0].innerHTML = "O";
                turno = false;
            }else if(vista[0][2].innerHTML == "O" && vista[2][0].innerHTML == "O" && vista[1][1].innerHTML == ""){
                vista[1][1].innerHTML = "O";
                turno = false;
            }else if(vista[2][0].innerHTML == "O" && vista[1][1].innerHTML == "O" && vista[0][2].innerHTML == ""){
                vista[0][2].innerHTML = "O";
                turno = false;
            }
        }
    }
    
    //MEJORA en caso de no tener coincidencias buscamos el centro del tablero
    if(turno && vista[1][1].innerHTML == ""){
        vista[1][1].innerHTML = "O";
        turno = false;
    }

    //Bloqueo horizontal
    for(let filas = i; filas<DIMENSION_MATRIZ && turno; filas++){
        let pos = [];
        let oCount = 0;
        for(let columnas = 0; columnas<DIMENSION_MATRIZ && turno; columnas++){
            if(vista[filas][columnas].innerHTML == ""){
                pos.push(columnas);
            }else
            if(vista[filas][columnas].innerHTML == "O"){
                oCount++;
            }
        }
        if(oCount != 1 && oCount != 2 && pos.length == 1){
            vista[filas][pos].innerHTML = "O";
            turno = false;
        }
    }

    //Bloqueo vertical
    for(let columnas = j ; columnas<DIMENSION_MATRIZ && turno; columnas++){
        let pos = [];
        let oCount = 0;
        for(let filas = 0; filas<DIMENSION_MATRIZ && turno; filas++){
            if(vista[filas][columnas].innerHTML == ""){
                pos.push([filas, columnas]);
            }
            if(vista[filas][columnas].innerHTML == "O"){
                oCount++;
            }
        }
        if(oCount != 1 && oCount != 2 && pos.length == 1){
            vista[pos[0][0]][pos[0][1]].innerHTML = "O";
            turno = false;
        }
    }

    //Control de las diagonales
    if(turno){
        //Revisamos diagonal principal
        let xCount = 0;
        let oCount = 0;
        let pos = [];
        for(let i = 0; i<DIMENSION_MATRIZ; i++){
            if(vista[i][i].innerHTML == "X"){
                xCount++;
            }else if(vista[i][i].innerHTML == ""){
                pos.push(i);
            }else if(vista[i][i].innerHTML == "O"){
                oCount++;
            }
        }
        if(oCount == 0 && xCount == 2){
            vista[pos[0]][pos[0]].innerHTML = "O";
            turno = false;
        }
    }

    //Revisamos la diagonal inversa
    if(turno){
        if(vista[0][2].innerHTML == "X" && vista[1][1].innerHTML == "X" && vista[2][0].innerHTML == ""){
            vista[2][0].innerHTML = "O";
            turno = false;
        }else if(vista[0][2].innerHTML == "X" && vista[2][0].innerHTML == "X" && vista[1][1].innerHTML == ""){
            vista[1][1].innerHTML = "O";
            turno = false;
            console.log("defensa diagonal r");
        }else if(vista[2][0].innerHTML == "X" && vista[1][1].innerHTML == "X" && vista[0][2].innerHTML == ""){
            vista[0][2].innerHTML = "O";
            turno = false;
        }
    }

    if(turno){
        let direccion;
        let error;
        let contorlBucle = 0;
        do{
            error = false;
            if(i == 0 && j == 1){
                direccion = Math.floor(Math.random()*2);
            }else if(i == 1 && j == 0){
                direccion = Math.floor(Math.random()*3);
                while(direccion == 1){
                    direccion = Math.floor(Math.random()*3);
                }
            }else if(i == 2 && j == 1){
                direccion = 2 + Math.floor(Math.random()*2);
            }else if(i == 1 && j == 2){
                direccion = Math.floor(Math.random()*4);
                while(direccion == 0 || direccion == 2){
                    direccion = Math.floor(Math.random()*4);
                }
            }
            /**
             * Direcciones permitidas
             * 0 -> Arriba izquierda
             * 1 -> Arriba derecha
             * 2 -> Abajo izquierda
             * 3 -> Abajo derecha
             */
            switch(direccion){
                case 0: 
                    if(vista[0][0].innerHTML == ""){
                        vista[0][0].innerHTML = "O";
                        turno = false;
                    }else{
                        error = true;
                    }
                break;
                case 1:
                    if(vista[0][DIMENSION_MATRIZ-1].innerHTML == ""){
                        vista[0][DIMENSION_MATRIZ-1].innerHTML = "O";
                        turno = false;
                    }else{
                        error = true;
                    }
                break;
                case 2:
                    if(vista[DIMENSION_MATRIZ-1][0].innerHTML == ""){
                        vista[DIMENSION_MATRIZ-1][0].innerHTML = "O";
                        turno = false;
                    }else{
                        error = true;
                    }
                break;
                case 3:
                    if(vista[DIMENSION_MATRIZ-1][DIMENSION_MATRIZ-1].innerHTML == ""){
                        vista[DIMENSION_MATRIZ-1][DIMENSION_MATRIZ-1].innerHTML = "O";
                        turno = false;
                    }else{
                        error = true;
                    }
                break;
            }
            contorlBucle++;
            if(contorlBucle>=10000){
                error = false;
            }
        }while(error);
    }
    //Si no se ha colocado en alguna de las opciones anteriores se colocara aleatoriamente
    if(turno){
        let contorlBucle = 0;
        let filas = Math.floor(Math.random()*3);
        let columnas = Math.floor(Math.random()*3);
        let error = false;
        while(!error && vista[filas][columnas].innerHTML != "" ){
            filas = Math.floor(Math.random()*3);
            columnas = Math.floor(Math.random()*3);
            contorlBucle++;
            if(contorlBucle>=10000){
                error = true;
            }
        }
        if(!error && vista[filas][columnas].innerHTML == ""){
            vista[filas][columnas].innerHTML = "O";
            turno = false;
        }
        turno = false;
    }
}


//Funcion para comprobar quien ha ganado
function comprobarVictoria(){
    
}

//Boton reiniciar
document.getElementById("btn").children[0].addEventListener("click",()=>{
    for(let i = 0; i<DIMENSION_MATRIZ; i++){
        for(let j = 0; j<DIMENSION_MATRIZ; j++){
            vista[i][j].innerHTML = "";
        }
    }
});