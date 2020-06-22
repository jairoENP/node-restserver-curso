

//==========PORT=============
process.env.PORT = process.env.PORT || 3000;
//===========================


//==========ENTORNO=============
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//==============================
  


//==========VENCIMIENTO DEL TOKEN=============
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//============================================



//==========SEED DE AUTENTICACION=============
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
//============================================

 


//==========BASE DE DATOS=============
let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe' 
}else{
    urlDB = process.env.MONGO_URI
    // urlDB = 'mongodb+srv://sinper:hPfPVOuDIf18lenC@cluster0-wkp0t.mongodb.net/cafe'
}
                       
process.env.URLDB = urlDB;
        
//====================================

//===============CLIENT_ID============

process.env.CLIENT_ID = process.env.CLIENT_ID || '623853724859-bvkemgcm4kk1g9sc95bnl88cnft4s9tj.apps.googleusercontent.com';

//====================================

 

//'mongodb://localhost:27017/cafe'
//mongodb+srv://sinper:hPfPVOuDIf18lenC@cluster0-wkp0t.mongodb.net/cafe 
