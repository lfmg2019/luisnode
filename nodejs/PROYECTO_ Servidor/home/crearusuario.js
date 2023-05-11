 // crear usuario
 const formulario= document.querySelector("#form-create");
 const userInput=document.querySelector("#create-input");

 // user login 
  const formL=document.querySelector('#form-login');
  const loginInput=document.querySelector('#login-input');
  const noti=document.querySelector('.notification');

  // eventos  
   formulario.addEventListener('submit',async e=>{
    e.preventDefault();
    const respuesta = await fetch('http://localhost:3000/users',{method:'GET'});
    const users=await respuesta.json();
   // console.log(users)
  
   const user=users.find(user=>user.username === userInput.value)
  console.log(user);
   if(!userInput.value){
    noti.innerHTML="el campo de usuario no puede estar vacio"
    noti.classList.add('show-notification');
    setTimeout(()=>{
        noti.classList.remove('show-notification')
    },3000);


   }else if(user){
    noti.innerHTML="si el usuario existe";
    noti.classList.add('show-notification');
    setTimeout(()=>{
        noti.classList.remove('show-notification')
    },3000);
   }else{
    // ingresar datos
    await fetch('http://localhost:3000/users',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({username:userInput.value})
    });
    noti.innerHTML=`el usuario ${userInput.value} se ha creado exitosamente`;
    noti.classList.add('show-notification');
    setTimeout(()=>{
        noti.classList.remove('show-notification')
    },3000);
userInput.value='';
   }
})

formL.addEventListener('submit',async e =>{
    e.preventDefault();
    
    const respuesta = await fetch('http://localhost:3000/users',{method:'GET'});
    const users=await respuesta.json();
   //console.log(users)
  
   const user=users.find(user=>user.username === loginInput.value)
   if(!user){
    noti.innerHTML="este usario  no existe"
    noti.classList.add('show-notification');
    setTimeout(()=>{
        noti.classList.remove('show-notification')
    },3000);
}else{
    localStorage.setItem('user',JSON.stringify(user));
    window.location.href='../tareas/tareas.html';
}

})
