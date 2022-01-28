var JOGANDO=1
var MORREMO=0
var estadoJogo=JOGANDO
var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var luz,luz2
var nuvem, imagemdanuvem;
var re,vi
var numero=0
var oof
var cactos,obstaculo1,obstaculo,obstaculo3,obstaculo4,obstaculo5,obstaculo6;
var die
var novaimagem;

var grupoObs, grupoNuvem
var game, over

function preload(){
luz2= loadImage("luz.png")
  trex_correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  oof = loadAnimation("trex_collided.png");
  imagemdosolo = loadImage("ground2.png");
  
  imagemdanuvem = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png")
  obstaculo2 = loadImage("obstacle2.png")
  obstaculo3 = loadImage("obstacle3.png")
  obstaculo4 = loadImage("obstacle4.png")
  obstaculo5 = loadImage("obstacle5.png")
  obstaculo6 = loadImage("obstacle6.png")
 game = loadImage("gameOver.png")
 re = loadImage ("restart.png")
  die = loadSound("die.mp3")
}

function setup() {
  createCanvas(600, 200);

  luz= createSprite(50,160,0,0);
  luz.addImage ("luz",luz2 );
  luz.visible = false
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_correndo);
   trex.addAnimation("collided",oof)
  trex.scale = 0.5;
  
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.x = solo.width /2;
  solo.velocityX = -4;
  
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  over= createSprite(300,100,10,10)
 
  
  vi= createSprite (300,135,10,10)

  
  grupoObs=createGroup()
  
  
  grupoNuvem=createGroup()
  
  
}

function draw() {
  background(255);
  
  if (estadoJogo === JOGANDO){
   vi.visible = false;
  over.visible=false
    if(keyDown("space")&& trex.y >= 155) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.5
  
  if (solo.x < 0){
    solo.x = solo.width/2;
  }
  numero = numero + Math.round (frameRate()/60)
   solo.velocityX = -4;
     gerarNuvens();
  gerarCactos();
    if(trex.isTouching(grupoObs)){
    die.play();
    estadoJogo=MORREMO;
    }
  
  }
  
  else if (estadoJogo === MORREMO){
  
    solo.velocity.x=0
  grupoObs.setVelocityXEach(0)
  grupoNuvem.setVelocityEach(0)
  trex.changeAnimation("collided",oof)
  trex.velocity.y=-1
  luz. visible = true
  grupoObs.setLifetimeEach(-1)
  grupoNuvem.setLifetimeEach(-1)
    vi.addImage("restart", re)
  vi.scale=0.4
  vi.visible = true;
     over.addImage("gameOver", game)
  over.scale=0.4
  over.visible=true
  if(mousePressedOver(vi)){
  eTodoMundoMorreu();
  
  
  }

  }
  
  

  trex.collide(soloinvisivel);
  //pontuação
  text("pontuação " + numero ,10,10)
  //luz.addImage("luz.jfif",luz2)

  //gerar as nuvens
   
  drawSprites();
}
 function eTodoMundoMorreu(){
 estadoJogo=JOGANDO
 grupoObs.destroyEach()
  trex.changeAnimation("running", trex_correndo)
  numero = 0
  luz.visible=false
 }

function gerarNuvens() {
  //escreva o código aqui para gerar as nuvens 
  if (frameCount % 60 === 0) {
    nuvem = createSprite(600,100,40,10);
    nuvem.addImage(imagemdanuvem)
    nuvem.y = Math.round(random(10,60))
    nuvem.scale = 0.4;
    nuvem.velocityX = -3;
    
    
    
    //atribuir tempo de duração à variável
    nuvem.lifetime = 250
    
    //ajustando a profundidade
    nuvem.depth = trex.depth
    trex.depth = trex.depth + 1;
    grupoNuvem.add(nuvem)
    }
}
function gerarCactos(){
  if(frameCount % 60 === 0){
cactos = createSprite(600,165,50,50);
    cactos.velocity.x = -4
    cactos.scale=0.4
    cactos.lifetime= 250
    grupoObs.add(cactos)
    
   var rand=Math.round(random(1,6));
 switch(rand){
      case 1:cactos.addImage (obstaculo1);
      break;
      case 2:cactos.addImage (obstaculo2);
      break;
      case 3:cactos.addImage (obstaculo3);
      break;
      case 4:cactos.addImage (obstaculo4);
      break;
      case 5:cactos.addImage (obstaculo5);
      break;
      case 6:cactos.addImage (obstaculo6);
      break;
      default: break;     
 }
  }
  

}

