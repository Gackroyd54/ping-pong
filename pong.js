var vbtIniciar
var vBola
var vCpu
var vJogador
var vPainelPontos


//comntrole de animação
var game,frame;
//variaveis para as posiçoes
var posBolaX
var posBolaY
var posJogadorY
var posJogadorX
var posCpuY 
var posCpuX 
//direção de acordo com a tecla
var dirJy
//Posições iniciais
var posJogIniY = 180
var posCpuIniY = 180
var posBolaIniX = 475
var posBolaIniY = 240
//variáveis de tamanhos
var campoX=0
var campoY=0
var campoW=960
var campoH=500
var barraW = 20
var barraH = 140
var bolaW = 20
var bolaH = 20
//direção 
var posBolaIniX
var bolaX
var bolaY
var cpuY = 0 
//velocidade
var velBola = 10
var velCpu = 10
var velJogador =10
//controle
var pontos = 0
var tecla
var jogo = false
var frames
function controlaJogador(){
    if(jogo){
        if(posJogadorY==0 && tecla==38){
            dirJy = 0
        }
        if(posJogadorY==360 && tecla==40){
            dirJy = 0
        }
        posJogadorY += velJogador*dirJy
        vJogador.style.top = posJogadorY + "px"

    }
}

function teclaDw(){
    //tecla pressionada
    tecla = event.keyCode
    if(tecla == 38){
        
        dirJy = -1
    }
    else if(tecla == 40){
        dirJy = 1
    }

}
function teclaUp(){
    //tecla liberada
    tecla = event.keyCode
    if(tecla == 38){
        dirJy = 0
    }
    else if(tecla == 40){
        dirJy = 0
    }


}
function inicializar(){
vbtIniciar = document.getElementById("btIniciar")
vbtIniciar.addEventListener("click",iniciaJogo)
vJogador = document.getElementById("dvJogador")
vCpu =document.getElementById("dvCpu")
vBola = document.getElementById('dvBola')
vPainelPontos = document.getElementById("txtPontos")
document.addEventListener("keydown",teclaDw)
document.addEventListener("keyup",teclaUp)


}
function game(){
    //função para animar o jogo
    if(jogo){
        controlaJogador()
        controlaBola()
        controleCpu()

    }
    frames = requestAnimationFrame(game)

}
function iniciaJogo(){
    if(!jogo ){
        cancelAnimationFrame(frames)
        jogo = true;
    dirJy = 0
    bolaY=0
    if((Math.random()*10)<5){
        bolaX = -1
    }
    else{
        bolaX = +1
    }
posBolaX=posBolaIniX
posBolaY = posBolaIniY
posJogadorX = 0
posJogadorY = 180
posCpuX = 920;
posCpuY = 180;
velBola = 8

game()
    }

}
function controlaBola(){
    //movimentação da bola
    posBolaY += velBola*bolaY;
    posBolaX += velBola*bolaX ;
    //COLISÃO COM O JOGADOR
    if(
        (posBolaX<=(posJogadorX+barraW)) && ((posBolaY+bolaH)>=posJogadorY)&&(posBolaY<=(posJogadorY+barraH))
){
   
    bolaY =(((((posBolaY+bolaH/2))-(posJogadorY+barraH/2)))/32)
    bolaX*=-1

}
//COLISÃO COM CPU
if(
    (posBolaX>=posCpuX-barraW) && ((posBolaY+bolaH)>=posCpuY)&&(posBolaY<=(posCpuY+barraH))
){

bolaY =((((posBolaY+bolaH/2))-(posCpuY+barraH/2))/32)
bolaX*=-1

}
//Limites inferior e superior
if((posBolaY>=480)||(posBolaY<=0)){
    bolaY*=-1
}
/*if((posBolaX<=0)||(posBolaX>=940)){
    bolaX*=-1
}*/
//Fez ponto(saiu da tela)
if(posBolaX>=(campoW-bolaW)){
    window.alert("goooooooooooooooool")
    velBola = 0
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY
    posCpuY = posCpuIniY
    pontos++
    vPainelPontos.value=pontos;
    jogo = false 
    vJogador.style.top = posJogadorY+"px"
    vCpu.style.top=posCpuY+"px"
}
else if(posBolaX<=0){
    //window.alert("goooooooooooooooool")
    velBola = 0
    posBolaX = posBolaIniX;
    posBolaY = posBolaIniY;
    posJogadorY = posJogIniY
    posCpuY = posCpuIniY
    pontos--
    vPainelPontos.value=pontos;
    jogo = false 
    vJogador.style.top = posJogadorY+"px"
    vCpu.style.top=posCpuY+"px"
}
    vBola.style.top = posBolaY+"px"
vBola.style.left = posBolaX +"px"
     
}
function controleCpu(){
    if(jogo){
        if((posBolaX>=campoW/2) && (bolaX>0)){
            //mover a CPU
        
            if((posBolaY+(bolaH/2)>((posCpuY+(barraH/2)))+velCpu)){
                //Mover para baixo
                if((posCpuY+barraH)<=campoH){
                    posCpuY+=velCpu

                }
                else if(((posBolaY+(bolaH/2))) < (posCpuY+(barraH/2))-velCpu){
                    //Mover para cima
                    if((posCpuY>=0)){
                        posCpuY-=velCpu;
                    }

                }
                


            }
        }
        else{
            //posicionar a CPU no centro
            if(((posCpuY+(barraH/2))<=campoH/2)){
                posCpuY+=velCpu
            }
            else if(((posCpuY+barraH/2)>=campoH/2)){
                posCpuY-=velCpu
            }
        }
        vCpu.style.top=posCpuY+"px"
    }
}
window.addEventListener("load",inicializar)