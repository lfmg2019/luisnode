// selectores 
const formulario=document.querySelector('#form-todos');
const lista =document.querySelector('#todos-list');
const inputf = document.querySelector('#form-input');
const cerrarbtn=document.querySelector('#cerrar-btn')

const user =JSON.parse(localStorage.getItem('user'));


if(!user){
    window.location.href='../home/index.html'
}



 //evetos 
  formulario.addEventListener('submit', async e=>{
    e.preventDefault();
    await fetch('http://localhost:3000/tareas',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({text:inputf.value,user:user.username})
    });
    // mostra lista de elemetos en html 

        const listado=document.createElement('li');
        listado.innerHTML=`<li class="todo-item">
        <button id=${lista.id} class="delete-btn">&#10006;</button>
        ${inputf.value}
        <button class="check-btn">&#10003;</button>
        </li>`;
        lista.appendChild(listado);
        inputf.value='';

});



const obtenerlista=async()=>{
    const respuesta= await fetch('http://localhost:3000/tareas',{method:'GET'});
    const list=await respuesta.json();
    const userlist=list.filter(lista=>lista.username === user.username);

    userlist.forEach(lista=> {
        const listado=document.createElement('li');
        listado.innerHTML=`
        <li id=${lista.id} class="todo-item">
        <button class="delete-btn">&#10006;</button>
        ${lista.text}
        <button class="check-btn">&#10003;</button>
        </li>`;
        lista.appendChild(listado);
     });
 }

 obtenerlista();



 lista.addEventListener('click',async e=>{
    if(e.target.classList.contains('delete-btn')){
        const id=e.target.parentElement.id;
        
        await fetch(`http://localhost:3000/tareas/${id}`,{  method:'DELETE' });
        e.target.parentElement.remove();
    }else if(e.target.classList.contains('check-btn')){
        const id=e.target.parentElement.id;


        const respuestajson=await fetch(`http://localhost:3000/tareas/${id}`,{
             method:'PATCH',
             headers:{
                'content-type':'application/json'
             },
             body:JSON.stringify({Checked:e.target.parentElement.classList.contains('check-todo')?false:true})
        });
        const response=await respuestajson.json();
        //console.log(response)
        e.target.parentElement.classList.toggle('check-todo');

    }
   
});

 cerrarbtn.addEventListener('click',async e=>{
    localStorage.removeItem('user');
    window.location.href ='../home/index.html';
 });


