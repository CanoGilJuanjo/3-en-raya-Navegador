let vista = [[],[],[]];
const DIMENSION_MATRIZ = 3;

//Inicializa la matriz
for(let i = 0; i<DIMENSION_MATRIZ;i++){
    for(let j = 0; j<DIMENSION_MATRIZ;j++){
        vista[i][j] = document.getElementById(`fila${i}columna${j}`);
        vista[i][j].addEventListener("click",function(){
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
        for(let i = 0; i<DIMENSION_MATRIZ; i++){
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
    }
    if(turno){
        //Vertical
        for(let j = 0; j<DIMENSION_MATRIZ;j++){
            let oCount = 0;      
            let xCount = 0;
            let pos = [];
            for(let i = 0; i<DIMENSION_MATRIZ;i++){
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
        }else if(vista[2][0].innerHTML == "X" && vista[1][1].innerHTML == "X" && vista[0][2].innerHTML == ""){
            vista[0][2].innerHTML = "O";
            turno = false;
        }
    }

    //MEJORA en caso de no tener coincidencias buscamos el centro del tablero
    if(turno && vista[1][1].innerHTML == ""){
        vista[1][1].innerHTML = "O";
        turno = false;
    }

    if(turno){
        let direccion;
        let error;
        let contorlBucle = 0;
        do{
            error = false;
            direccion = Math.floor(Math.random()*4);
            /**
             * Direcciones permitidas
             * 0 -> Arriba
             * 1 -> Derecha
             * 2 -> Abajo
             * 3 -> Izquierda
             * i-1>=0 j-1>=0
             * i-1>=0 j+1<=DIMENSION_MATRIZ
             * i+1<=DIMENSION_MATRIZ j-1>=0
             * i+1<=DIMENSION_MATRIZ j+1<=DIMENSION_MATRIZ
             */
            switch(direccion){
                case 0: 
                    if(i-1>=0 && j-1>=0 && vista[i-1][j-1].innerHTML == ""){
                        vista[i-1][j-1].innerHTML = "O";
                        turno = false;
                    }else{
                        error = true;
                    }
                break;
                case 1:
                    if(i-1>=0 && j+1<DIMENSION_MATRIZ && vista[i-1][j+1].innerHTML == ""){
                        vista[i-1][j+1].innerHTML = "O";
                        turno = false;
                    }else{
                        error = true;
                    }
                break;
                case 2:
                    if(i+1<DIMENSION_MATRIZ && j-1>=0 && vista[i+1][j-1].innerHTML == ""){
                        vista[i+1][j-1].innerHTML = "O";
                        turno = false;
                    }else{
                        error = true;
                    }
                break;
                case 3:
                    if(i+1<DIMENSION_MATRIZ && j+1<DIMENSION_MATRIZ && vista[i+1][j+1].innerHTML == ""){
                        vista[i+1][j+1].innerHTML = "O";
                        turno = false;
                    }else{
                        error = true;
                    }
                break;
            }
            contorlBucle++;
            if(contorlBucle>=1000){
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
                console.log("Error en numero random");
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
    let posicionesO = [];
    let oCount = 0;
    for(let i = 0; i<DIMENSION_MATRIZ; i++){
        oCount = 0;
        for(let j = 0; j<DIMENSION_MATRIZ; j++){
            if(vista[i][j].innerHTML == "O"){
                oCount++;
                posicionesO.push(i,j,oCount);
            }
        }
    }
    console.log(posicionesO);

}

//Boton reiniciar
document.getElementById("btn").children[0].addEventListener("click",()=>{
    for(let i = 0; i<DIMENSION_MATRIZ; i++){
        for(let j = 0; j<DIMENSION_MATRIZ; j++){
            vista[i][j].innerHTML = "";
        }
    }
});