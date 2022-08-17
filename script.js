//js文件
let playerState = 'rundown';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change',function(e){
    playerState = e.target.value;
})
const canvas = document.getElementById('canvas1');
//画布设定为平面画布
const ctx =canvas.getContext('2d');
//将CANVAS_WIDTH设置为全局变量，充满画布
const CANVAS_WIDTH= canvas.width = 300;
const CANVAS_HEIGHT=canvas.height = 300;

const playerImage = new Image()
//设置图片路径
playerImage.src='stand2.png';
const dropdown2 = document.getElementById('person');
dropdown2.addEventListener('change',function(e){
    if (e.target.value == 'run'){
        playerImage.src = 'run.png'
    } else {
        playerImage.src = 'stand2.png'
    }
})
//裁剪单个图片大小
const personWidth = 67;
const personHeight = 91;
//下面两个参数会影响到刷新速率
let gameFrame = 0;
const staggerFrames = 5;
//动作参数
const personAnimations=[];
const animationStates=[
    {
        name:'rundown',
        frames:8
    },
    {
        name:'runleft',
        frames:8
    },
    {
        name:'runright',
        frames:8
    },
    {
        name:'runup',
        frames:8
    },
    {
        name:'leftdown',
        frames:8
    },
    {
        name:'rightdown',
        frames:8
    },
    {
        name:'leftup',
        frames:8
    },
    {
        name:'rightup',
        frames:8
    }
];
animationStates.forEach((state,index)=>{
    let frames = {
        loc:[],
    }
    for (let i = 0; i < 8; i++){
            let positionX = i *personWidth;
            let positionY = index *personHeight;
            frames.loc.push({x:positionX,y:positionY})
    }
    personAnimations[state.name] = frames;
});
console.log(animationStates)


function animate(){
    //清除画布，有4个参数，起始x,y,以及宽高
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    //使得动画速度降低staggerFrames倍,使得循环进行8次，因为一个完整的动画是8帧
    let position = Math.floor(gameFrame/staggerFrames) % personAnimations[playerState].loc.length;
    let framex = personWidth*position
    let framey = personAnimations[playerState].loc[position].y;
    //drawImage函数有5个参数，图片，图片起始x,y,宽高，在画布中位置x,y，宽高
    ctx.drawImage(playerImage,framex,framey,personWidth,personHeight,0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
   //每过staggerFrames帧，展示一帧，该语句会控制动作刷新速率
    // if (gameFrame % staggerFrames ==0){
    //     if(framex < 7) framex++;
    // else framex = 0;
    // }
    gameFrame++;
    requestAnimationFrame(animate);
};
animate();