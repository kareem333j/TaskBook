let addBtn = document.querySelector(".but-task");
let taskInput = document.querySelector(".inp-write-task");
let tasksDiv= document.querySelector(".tasks");
let messageDiv = document.querySelector(".message");
let messageTime = document.querySelector(".message span");
let messageH3 = document.querySelector(".message h3");
let section = document.querySelector("section");
let msgRequest = window.localStorage['msg'];
let noTasks = document.querySelector(".no-tasks");
// tasks list
tasks= [];

// Add task to Local Storage
messageH3.innerHTML = window.sessionStorage['msgContent'];
addBtn.addEventListener('click',
()=>{
  if(taskInput.value === "" || taskInput.value === " " || taskInput.value === "  " || taskInput.value === "   " || taskInput.value === "    "){
  }else{
    tasks.unshift(taskInput.value)
    window.localStorage.setItem('tasks',tasks);
    // message success
    window.localStorage.setItem("msgSuccess","display: flex;background-color: rgba(71, 189, 71, 0.645);border-left: 10px solid green;");
    msgRequest = window.localStorage.setItem('msg',true);
    window.sessionStorage.setItem('msgContent','Taske Added Successfully')
  }
})

if(window.localStorage['tasks']){
  let tasksList = window.localStorage['tasks'].split(',');
  for(let i=0; i<tasksList.length; i++){
    tasks.unshift(tasksList[i]);
  }
}

// Append task to tasks
for(let i=0; i<tasks.length; i++){
  let task = document.createElement("div");
  let taskH3 = document.createElement("h3");
  let taskDelete = document.createElement("button");
  let h3Txt = document.createTextNode(window.localStorage['tasks'].split(',')[i])
  let DeleteTxt = document.createTextNode(`<i class="fa-solid fa-trash"></i>`);
  task.className = 'task';
  taskH3.appendChild(h3Txt);
  taskDelete.appendChild(DeleteTxt);
  tasksDiv.appendChild(task);
  task.appendChild(taskH3);
  task.appendChild(taskDelete);
  taskDelete.innerHTML = '<i class="fa-solid fa-trash"></i>'
}

// Delete Task btn
let DeleteBtns = document.querySelectorAll(".tasks .task button");
DeleteBtns.forEach((btn)=>{
  btn.addEventListener('click',()=>{
    let parent = btn.parentElement;
    let ItemWDele = parent.querySelector("h3").innerHTML;
    for(let i=0; i<tasks.length; i++){
      if(window.localStorage['tasks'].split(',')[i] === ItemWDele){
        tasks.splice(tasks.indexOf(ItemWDele),1);
        window.localStorage.clear();
        window.localStorage.setItem('tasks',tasks);

        let taskRemoveH3 = document.querySelector(".tasks .task h3");
        if(taskRemoveH3.innerHTML === ''){
          window.localStorage.clear();
        }
        location.reload();
      }
    }
    window.localStorage.setItem("msgSuccess","display: flex;background-color: rgba(255, 0, 0, 0.302);border-left: 10px solid red;");
    msgRequest = window.localStorage.setItem('msg',true);
    window.sessionStorage.setItem('msgContent','Taske Deleted Successfully');

  })
});

// msg


if(window.localStorage['msg'] === 'true'){
  messageDiv.style.cssText = window.localStorage['msgSuccess'];
  let msgTime = setInterval(msgSuccess,1000);

  function msgSuccess(){
    messageTime.innerHTML--;

    if(messageTime.innerHTML === "0"){
      clearInterval(msgTime);
      window.localStorage.setItem('msgSuccess','display:none;');
      messageDiv.style.cssText = window.localStorage['msgSuccess'];
    }
  }
  window.localStorage.setItem('msg',false);
}

if(window.localStorage['tasks'] !== undefined){
  if(window.localStorage['tasks'] === ''){
    noTasks.style.cssText = "display:block;";
  }else{
    noTasks.remove();
  }
}else{
  noTasks.style.cssText = "display:block;";
}
