const express = require('express');
const cors = require('cors');
const { log } = require('console');
const app = express();
const server = require('http').Server(app);

const rutaTunas=[
    [-89.90828285149499,14.298034832797825],
    [-89.90562210016701,14.29445840780059],
    [-89.90188846523907,14.29366825972215],
    [-89.89914188322312,14.292171129433752],
    [-89.89828357634313,14.291588909407917],
    [-89.89691028533515,14.290881925921818],
    [-89.89575157104719,14.288220321103672],
    [-89.89180335939925,14.287721266694483],
    [-89.89111671389527,14.2877628546042],
    [-89.89055881442326,14.287970794037463],
    [-89.89025840701528,14.287263799180247],
    [-89.8890996927273,14.287139035151313],
    [-89.88931426944728,14.286390449524717],
    [-89.88785514775132,14.284726916993481],
    [-89.88523731176737,14.283437670823185],
    [-89.88116035408743,14.28148299318752]
    
];
app.use(cors());

const PORT = 3000;

const io = require('socket.io')(server, {
    cors: {
        origins: ['http://34.125.241.176']
    }
})

io.on('connection', (socket) => {
  
    //Recibir cordenada de movil
    socket.on('Unidad003', (ubicacion) => {
         const newCord=ubicacion.split(',');
         console.log('UNI3:',newCord);         /*
       const cors =[parseFloat(newCord[1]),parseFloat(newCord[0])];
       console.log('Server:', cors); */       
       io.sockets.emit('UNI3', ubicacion);      
    });

     //UNIDAD2
    socket.on('Unidad002', (ubicacion) => {
        const newCord=ubicacion.split(',');
        console.log('UNI2:',newCord);         /*
      const cors =[parseFloat(newCord[1]),parseFloat(newCord[0])];
      console.log('Server:', cors); */       
      io.sockets.emit('UNI2', ubicacion);      
   });

   socket.on('Unidad001', (ubicacion) => {
    const newCord=ubicacion.split(',');
    console.log('UNI1:',newCord);         /*
  const cors =[parseFloat(newCord[1]),parseFloat(newCord[0])];
  console.log('Server:', cors); */       
  io.sockets.emit('UNI1', ubicacion);      
});

   
    /* const counter = setInterval(() => {
        const coords = rutaTunas.shift();
        if (!coords) {
            clearInterval(counter) 
        } else {
            socket.emit('position', {coords});
        }
    }, 2500); */

    socket.on('find-driver', ({points}) => {
        console.log('......', points);

        const counter = setInterval(() => {
            const coords = points.shift();
            if (!coords) {
                clearInterval(counter)
            } else {
                socket.emit('position', {coords});
            }
        }, 1000);
    });

    socket.emit('message','ServerConect');

    
});




server.listen(PORT, () => console.log('Todo bien !! in port:'+PORT))