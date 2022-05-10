let gUsers=[];
let history=[];
async function fetchAvatars() 
{
    let resp = await fetch('https://jsonplaceholder.typicode.com/photos');
    if (resp.ok)
    return await resp.json();
}
async function fetchPosts() 
{
    let resp = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (resp.ok)
    return await resp.json();
}

async function fetchTodos() 
{
    let resp = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (resp.ok)
    return await resp.json();
}

async function fetchUsers()
{
    let posts = await fetchPosts();
    let todos = await fetchTodos(); 
    let avatars = await fetchAvatars();   
    let response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (response.ok)
    {
        let users = await response.json();
        users.forEach( (user) => {
            let userPosts = posts.filter(post => post.userId == user.id);
            let mapPosts = userPosts.map(post => {return {id:post.id , title:post.title ,body: post.body}})
            user.posts = mapPosts;
            let userTodos = todos.filter(todo => todo.userId == user.id);
            let mapTodos = userTodos.map(todo => {return {id:todo.id , title:todo.title ,completed: todo.completed}})
            user.todos = mapTodos;
            let userAvatars = avatars.filter(avatar => avatar.id == user.id);
            let mapAvatars = userAvatars.map(avatar => {return {thumbnailUrl:avatar.thumbnailUrl}})
            user.avatar = mapAvatars[0];
        });
        return users; 
    }
}

async function main ()
{
    gUsers = await fetchUsers();
    initialize();
}

function initialize()
{
    if (document.getElementById("ContentContainer"))
    document.getElementById("ContentContainer").remove();
      
    
     let ContentContainer = document.createElement('div');
     ContentContainer.id = 'ContentContainer';
     document.getElementById('body').appendChild(ContentContainer);

     logo();
     renderSearch();
     historyflash();
     if (document.getElementById(`newsflashHistory`).lastChild)
     createHistoryButton();

     let initContainer = document.createElement('div');
     initContainer.id = `initContainer`;
     ContentContainer.appendChild(initContainer);
     gUsers.forEach(user => 
     {
        //create a new box with id (match the DB id's)
        let box = document.createElement('div');
        box.id = `user${user.id}`;
        box.className = `UserBox`;
        initContainer.appendChild(box);

        //avatar 
        let avatar = document.createElement('div');
        let pic = document.createElement('img');
        pic.src = user.avatar.thumbnailUrl;
        pic.className = `UserAvatarPic`;
        avatar.className = `UserAvatarDiv`;

        box.appendChild(avatar);
        avatar.appendChild(pic);

        //subUserBox
        let subUserBox = document.createElement('div');
        subUserBox.className = "subUserBox";
        box.appendChild(subUserBox);

        //id text+input
        let id_span = document.createElement('span');
        id_span.className = "hoverText";
        id_span.id = "label"

        id_span.innerText = `ID:`;
        id_span.onclick = () => 
        { 
            changeColor(`${user.id}`);
            renderTodos(`${user.id}`);
            renderPosts(`${user.id}`);
            function clearGuser() {
                let guserDiv = document.getElementById(`addNewGuser`);
                if (guserDiv) 
                guserDiv.remove();}
                clearGuser();
        }

        subUserBox.appendChild(id_span);
        let id = document.createElement('input');
        id.type = `number`;
        id.min = 1;
        id.readOnly = true;
        id.value = user.id;
        id.id = `id-${user.id}`;
        id.className = "inputs";
        subUserBox.appendChild(id);

        //space
        subUserBox.appendChild(document.createElement('br'));

        //name text+input
        let name_span = document.createElement('span');
        name_span.innerText = `Name:`;
        name_span.className = "labels";
        subUserBox.appendChild(name_span);
        let name = document.createElement('input');
        name.type = `text`;
        name.minLength = 3;
        name.value = user.name;
        name.id = `name-${user.id}`;
        name.className = "inputs";
        subUserBox.appendChild(name);

        //space
        subUserBox.appendChild(document.createElement('br'));

        //email text+input
        let email_span = document.createElement('span');
        email_span.innerText = `Email:`;
        email_span.className = "labels";

        subUserBox.appendChild(email_span);
        let email = document.createElement('input');
        email.type = `email`;
        email.minLength = 3;
        email.value = user.email;
        email.id = `email-${user.id}`;
        email.className = "inputs";
        subUserBox.appendChild(email);

        //space
        subUserBox.appendChild(document.createElement('br'));

        //otherDataBox creation 
        let otherData_box = document.createElement('div');
        subUserBox.appendChild(otherData_box);
        otherData_box.style.display = `none`;
        otherData_box.className = 'OtherBox';
        otherData_box.id = `otherBox-${user.id}`;
        
        //otherDataBox: street text+input
        let street_span = document.createElement('span');
        street_span.innerText = `Street:`
        street_span.className = "labels";

        otherData_box.appendChild(street_span);
        let street = document.createElement('input');
        street.type = 'text';
        street.value = user.address.street;
        street.id = `street-${user.id}`;
        street.className = "inputs";
        otherData_box.appendChild(street);
        
        //space inside the otherDataBox
        otherData_box.appendChild(document.createElement('br'));
        
        //otherDataBox: city text+input
        let city_span = document.createElement('span');
        city_span.innerText = `City:`
        city_span.className = "labels";

        otherData_box.appendChild(city_span);
        let city = document.createElement('input');
        city.type = 'text';
        city.value = user.address.city;
        city.id = `city-${user.id}`;
        city.className = "inputs";
        otherData_box.appendChild(city);
        
        //space inside the otherDataBox
        otherData_box.appendChild(document.createElement('br'));
        
        //Otherdatabox: zipcode text+input
        let zipcode_span = document.createElement('span');
        zipcode_span.innerText = `Zipcode:`
        zipcode_span.className = "labels";

        otherData_box.appendChild(zipcode_span);
        let zipcode = document.createElement('input');
        zipcode.type = 'text';
        zipcode.value = user.address.zipcode;
        zipcode.id = `zipcode-${user.id}`;
        zipcode.className = "inputs";
        otherData_box.appendChild(zipcode);

        //userBoxButtons
        let userBoxButtons = document.createElement('div');
        userBoxButtons.className = "userBoxButtons";
        box.appendChild(userBoxButtons);

        //otherDataBox: button
        let otherData = document.createElement('input');
        otherData.type = 'button';
        otherData.className = "otherDataToggle";
        otherData.value = `more data...`;
        otherData.onmouseover = ()=>{ otherData_box.style.display = `block`};
        otherData.onclick = ()=>{ otherData_box.style.display = `none`};
        userBoxButtons.appendChild(otherData);
        
        //'update' button
        let update = document.createElement('input');
        update.type = 'button';
        update.className = "update";
        update.value = `Update`;
        update.onclick = ()=>{ setUser(`${user.id}`)};
        userBoxButtons.appendChild(update);

        //'delete' button
        let delete_ = document.createElement('input');
        delete_.type = 'button';
        delete_.className = "delete";
        delete_.value = `Delete`;
        delete_.onclick = ()=>{ deleteUser(`${user.id}`)};
        userBoxButtons.appendChild(delete_);
     });

     console.log(`initialization complete`);
 }

 async function deleteUser (userId) 
 {
    //findIndex -> method that uses a callback function
    let index = gUsers.findIndex(user => user.id == userId);
    console.log(index);
    //remove the item from the array using splice
    let del = gUsers.splice(index, 1);
    console.log(gUsers);
    // delete the whole box, using remove();
    let box = document.getElementById(`user${userId}`);
    box.remove();
    console.log("box removed");
    newsflash(`User #${userId} has been deleted`);

    let postsElList = document.getElementsByClassName("postsDiv");
    for (let posts of postsElList)
    {
        posts.remove();
    }

    let todosElList = document.getElementsByClassName("todoDiv");
    for (let todos of todosElList)
    {
        todos.remove();
    }

    //ajax request to delete the user
    let fetchParams = {
        method: "DELETE"
    }
    const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, fetchParams)
    let status = await resp.json();
    console.log(status);
 }

 async function setUser (userId) 
 {
    //findIndex -> method that uses a callback function
    let index = gUsers.findIndex(user => user.id == userId);
     console.log(index);
     let updatedData;

     //DOM getElementById for all input tags
     let id = document.getElementById(`id-${userId}`).value;
     let name = document.getElementById(`name-${userId}`).value;
     let email = document.getElementById(`email-${userId}`).value;
     let street = document.getElementById(`street-${userId}`).value;
     let city = document.getElementById(`city-${userId}`).value;
     let zipcode = document.getElementById(`zipcode-${userId}`).value;

        updatedData = 
         {
             id: +id,
             name: name, 
             email: email,
             address: 
             {
                 street: street,
                 city: city,
                 zipcode: zipcode
             },
             posts: gUsers[index].posts,
             todos:  gUsers[index].todos,
             avatar: gUsers[index].avatar
             
         }
         gUsers[index] = updatedData;
         console.log(`updated gUsers: `);
         console.log(gUsers);
         console.log(`updated user: `);
         console.log(gUsers[index]);
         
     //used for the "Console" section of the page - newsflash:
        let displayedData = {
            id: +id,
            name: name, 
            email: email,
            address: 
            { 
                street: street,
                city: city,
                zipcode: zipcode
            }}
        displayedData = JSON.stringify(displayedData);
     //PATCH -  AJAX request  - code gives 500 error if PUT is used.
     //diffrent data structure?
     let fetchParams = {
         method: "PATCH",
         body: JSON.stringify(updatedData),
         headers: { "Content-type": "application/json" }
     }
     let response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, fetchParams);
     if (response.ok) {
         console.log(response.ok);
         newsflash(`User ${id} updated successfully \n JSON: ${displayedData}`);
        }
 }

function logo () 
{
    //creating the div itself
    let logoContainer = document.createElement("div");
    logoContainer.id = "logo";
    document.getElementById("ContentContainer").append(logoContainer);
    let logoImg = document.createElement("img");
    logoImg.src = "Dungeon2.png";
    logoImg.onclick = () => { initialize(); }
    logoContainer.append(logoImg);
}

 function renderSearch()
 {
     //creating a DIV element for the search bar
     let searchContainerFather = document.createElement("div");
     searchContainerFather.id = "search-containerFather";
     document.getElementById('ContentContainer').append(searchContainerFather);

     let searchContainer = document.createElement("div");
     searchContainer.id = "search-container";
     searchContainerFather.append(searchContainer);
     //creating the search input
     let searchInput = document.createElement("input");
     searchInput.type = "search";
     searchInput.placeholder = "Type to search...";
     searchInput.id = "search-input";

     let spanSearch = document.createElement("span");
     searchContainer.append(spanSearch);

     spanSearch.append(document.createTextNode("Search:"));
     spanSearch.append(searchInput);

     //adding event listeners
     searchInput.addEventListener("input", (search) => 
     {
        let searchContent = search.target.value;

        if (searchContent.trim())
        {
            searchContent = searchContent.toLowerCase();
            gUsers.forEach((user)=>{
                if (!user.name.toLowerCase().includes(searchContent) && !user.email.toLowerCase().includes(searchContent)) {
                    document.getElementById(`user${user.id}`).style.display = `none`
                } else {
                    document.getElementById(`user${user.id}`).style.display = `block`

                }
            })
        }

     });

    //add new user addButton
    let addNewUser = document.createElement("input");
    addNewUser.type = "button";
    addNewUser.id = "addNewUserButton";
    addNewUser.value = "Add new user";
    searchContainer.appendChild(addNewUser);
    addNewUser.onclick= ()=>{addGuser();}

    let newsflashContainer = document.createElement("div");
    newsflashContainer.id = "newsflashContainer";
    newsflashContainer.style.display = 'none';
    searchContainerFather.append(newsflashContainer);
    
    let newsflashHistory = document.createElement("div");
    newsflashHistory.id = "newsflashHistory";
    newsflashHistory.style.display = 'none';
    searchContainerFather.append(newsflashHistory);
}

 function addGuser()
 {
     //if present -> delete todo + posts divs
     if (document.getElementById("todosDiv"))
{     document.getElementById("todosDiv").remove();
     document.getElementById("allpostsDiv").remove();}

    clearGuser();

     // create div for adding new users
     let newUserDiv = document.createElement("div");
     newUserDiv.id = `addNewGuser`;
     document.getElementById(`ContentContainer`).append(newUserDiv);

     let newuserHeader = document.createElement("div");
     newuserHeader.className = "boxHeader";
     newUserDiv.append(newuserHeader);

     newUserText = document.createTextNode(`Add New User`);
     newuserHeader.append(newUserText);

     let newuserBox = document.createElement("div");
     newuserBox.className = "todoBox";
     newUserDiv.append(newuserBox);

     nameText = document.createTextNode(`Name:`);
     newuserBox.append(nameText);
     let nameInput = document.createElement('input');
     nameInput.type = 'text';
     nameInput.id = `newUserNameInput`;
     nameInput.minLength = 3;
     newuserBox.append(nameInput);
     newuserBox.append(document.createElement("br"));
     emailText = document.createTextNode(`Email:`);
     newuserBox.append(emailText);
     let emailInput = document.createElement('input');
     emailInput.type = 'text';
     emailInput.id = `newUserEmailInput`;
     emailInput.minLength = 3;
     newuserBox.append(emailInput);
     newuserBox.append(document.createElement("br"));
     let addButton = document.createElement("input");
     addButton.setAttribute("type", "button");
     addButton.setAttribute("value","Add");
     addButton.onclick =()=>
     { 
        let name = document.getElementById(`newUserNameInput`).value;
        let email = document.getElementById(`newUserEmailInput`).value;
        let newUserData = 
        {
            id: gUsers.length + 1,
            name: name, 
            email: email,
            address: 
            {
                street: "",
                city: "",
                zipcode: ""
            },
            posts: [],
            todos: [],
            avatar: { thumbnailUrl: ""}
        }
        gUsers.push(newUserData);
        console.log(gUsers);
        
        initialize();
        newsflash(`User [- #${name} -] successfully added to the DB`);
        clearGuser();
     }
     newuserBox.append(addButton);
     let cancelButton = document.createElement("input");
     cancelButton.setAttribute("type", "button");
     cancelButton.setAttribute("value","Cancel");
     cancelButton.onclick =()=>
     {
        let postsElList = document.getElementsByClassName("postsDiv");
        for (let posts of postsElList)
        {
            posts.remove();
        }
       clearGuser();
     }
     newuserBox.append(cancelButton);
     newUserDiv.append(document.createElement("br"));


     function clearGuser() {
        let guserDiv = document.getElementById(`addNewGuser`);
        if (guserDiv) 
        guserDiv.remove();
    }
 }

 function changeColor (id)
 {
     if (document.getElementById(`user${id}`).style.backgroundColor)
     document.getElementById(`user${id}`).style.backgroundColor = "";
     else
     document.getElementById(`user${id}`).style.backgroundColor = "rgb(185, 255, 119)";

     gUsers.forEach(user => 
        {
            if (user.id != id)
            {document.getElementById(`user${user.id}`).style.backgroundColor = "";}
        })
 }

 function renderTodos(id)
 {
    let todoElList = document.getElementsByClassName("todoDiv");
    for (let todo of todoElList) {
        todo.remove();
    }
    if(document.getElementById(`user${id}`).style.backgroundColor)
    {
        let todoDiv = document.createElement("div");
        todoDiv.id = `todosDiv`;
        document.getElementById(`ContentContainer`).append(todoDiv);
        todoDiv.className = `todoDiv`;
        todoText = document.createTextNode(`Todos - user ${id}:`);
        let todoHeader = document.createElement("div");
        todoHeader.className = `boxHeader`;
        todoHeader.append(todoText);
        todoDiv.append(todoHeader);
        let addButton = document.createElement("input");
        addButton.setAttribute("type", "button");
        addButton.setAttribute("value","Add");
        addButton.setAttribute("id", `addTodoButton`);
        const index = gUsers.findIndex(user => user.id == id);

        addButton.onclick =()=>{ addTodo(`${id}`,`${index}`)}
        todoHeader.append(addButton);

        let todoBox;
        gUsers[index].todos.forEach((todoItem) => 
            {
            todoBox = document.createElement("div");
            todoBox.id = `todoBox-${todoItem.id}`;
            todoBox.className = `todoBox`;
            todoBox.innerText = `Title: ${todoItem.title}
            Completed: ${todoItem.completed}`;
            todoDiv.append(todoBox);
        //Start to fill content to the box

            if (!todoItem.completed)
            {
            let completeButton = document.createElement("input");
            completeButton.setAttribute("type", "button");
            completeButton.setAttribute("value","Mark Completed");
            completeButton.setAttribute("id", `completeButton`);
            todoBox.appendChild(completeButton);
            completeButton.onclick =()=>
             { 
                let change = document.getElementById(`todoBox-${todoItem.id}`);
                todoItem.completed = true;
                change.innerText = `Title: ${todoItem.title}
                Completed: ${todoItem.completed}`;
                newsflash(`User Todo num [- ${todoItem.id} -] flagged as completed`);
             }
            }
            });
    }
 }

 function addTodo(id, index)
{
    let todoDiv = clearTodo();

    document.getElementById(`ContentContainer`).append(todoDiv);
    let addtodoHeader = document.createElement("div");
    addtodoHeader.className = "boxHeader";
    let todoText = document.createTextNode(`New Todo - user ${id}`);
    todoDiv.append(addtodoHeader);
    addtodoHeader.append(todoText);

    let addtodoBox = document.createElement("div");
    addtodoBox.className = "todoBox";
    todoDiv.append(addtodoBox);


    let titleText = document.createTextNode("Title:");
    addtodoBox.append(titleText);
    let titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = `newTodoTitle-${id}`;
    titleInput.minLength = 3;
    addtodoBox.append(titleText);
    addtodoBox.append(titleInput);
    addtodoBox.appendChild(document.createElement('br'));
    let addButton = document.createElement("input");
    addButton.setAttribute("type", "button");
    addButton.setAttribute("value","Add");
    addButton.setAttribute("id", `addNewTodoButton-${id}`);
    addButton.onclick =()=>
    { 
        let titleTemp = document.getElementById(`newTodoTitle-${id}`).value;
        let obj = {
            id: (gUsers[index].todos).length + 1,
            title: titleTemp,
            completed: false }
        let x = gUsers[index].todos.push(obj);
        console.log(gUsers[index].todos);
        newsflash(`User [- #${id} -] Todo assignment was added successfully`);

        clearTodo();
        renderTodos(id);
    }
    addtodoBox.append(addButton);
    let cancelButton = document.createElement("input");
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("value","Cancel");
    cancelButton.setAttribute("id", `cancelTodoButton-${id}`);
    cancelButton.onclick =()=>
    {
        clearTodo();
        renderTodos(id);
    }
    addtodoBox.append(cancelButton);

    function clearTodo() {
        let todoDiv = document.getElementById(`todosDiv`);
        while (todoDiv.lastChild) {
            todoDiv.removeChild(todoDiv.lastChild);
        }
        return todoDiv;
    }
}

 function renderPosts(id)
 {
    let postsElList = document.getElementsByClassName("postsDiv");
    for (let posts of postsElList)
    {
        posts.remove();
    }
   if(document.getElementById(`user${id}`).style.backgroundColor)
   {
   let postsDiv = document.createElement("div");
   postsDiv.id = `allpostsDiv`;
   postsDiv.className = `postsDiv`;
   let postsHeader = document.createElement("div");
   postsHeader.className = `boxHeader`;
   postsText = document.createTextNode(`Posts - user ${id}:`);
   document.getElementById(`ContentContainer`).append(postsDiv);
   postsDiv.append(postsHeader);
   postsHeader.append(postsText);
   let addButton = document.createElement("input");
   addButton.setAttribute("type", "button");
     addButton.setAttribute("value","Add");
    addButton.setAttribute("id", `addpostButton`);
    const index = gUsers.findIndex(user => user.id == id);

    addButton.onclick =()=>{ addPost(`${id}`,`${index}`)}
    postsHeader.append(addButton);

   let postsBox, span;
   gUsers[index].posts.forEach((postItem) => 
       {
        postsBox = document.createElement("div");
        postsBox.id = `postsBox-${postItem.id}`;
        postsBox.className = `postBox`;
        postsBox.innerText = `Title: ${postItem.title}
       Body: ${postItem.body}`;
       postsDiv.append(postsBox);
       span = document.createElement("span");
       span.id = `span-${postItem.id}`;
       postsBox.appendChild(span);
       });
    }
}

function addPost(id, index)
{
    let postsDiv = clearPosts();

    document.getElementById(`ContentContainer`).append(postsDiv);
    let addpostHeader = document.createElement('div');
    addpostHeader.className = "boxHeader";
    postsDiv.append(addpostHeader);

    let postsText = document.createTextNode(`New Post - user ${id}`);
    addpostHeader.append(postsText);

    let addpostsBox = document.createElement("div");
    addpostsBox.className = "postBox";
    postsDiv.append(addpostsBox);
    let titleText = document.createTextNode("Title:");
    addpostsBox.append(titleText);
    let titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = `newPostTitle-${id}`;
    titleInput.minLength = 3;
    addpostsBox.append(titleText);
    addpostsBox.append(titleInput);
    addpostsBox.appendChild(document.createElement('br'));

    let bodyText = document.createTextNode("Body:");
    addpostsBox.append(bodyText);
    let bodyInput = document.createElement('input');
    bodyInput.type = 'text';
    bodyInput.id = `newPostBody-${id}`;
    bodyInput.minLength = 3;
    addpostsBox.append(bodyText);
    addpostsBox.append(bodyInput);
    addpostsBox.appendChild(document.createElement('br'));


    let addButton = document.createElement("input");
    addButton.setAttribute("type", "button");
    addButton.setAttribute("value","Add");
    addButton.setAttribute("id", `addNewPostButton-${id}`);

    addButton.onclick =()=>
    { 
        let titleTemp = document.getElementById(`newPostTitle-${id}`).value;
        let bodyTemp = document.getElementById(`newPostBody-${id}`).value;
        let obj = {
            id: (gUsers[index].posts).length + 1,
            title: titleTemp,
            body: bodyTemp }
        let x = gUsers[index].posts.push(obj);
        console.log(gUsers[index].posts);
        newsflash(`User [- #${id} -] post was added successfully`);
        clearPosts();
        renderPosts(id);
        
    }
    addpostsBox.append(addButton);
    let cancelButton = document.createElement("input");
    cancelButton.setAttribute("type", "button");
    cancelButton.setAttribute("value","Cancel");
    cancelButton.setAttribute("id", `cancelPostButton-${id}`);
    cancelButton.onclick =()=>
    {
        clearPosts();
        renderPosts(id);
    }
    addpostsBox.append(cancelButton);

    function clearPosts() {
        let postsDiv = document.getElementById(`allpostsDiv`);
        while (postsDiv.lastChild) {
            postsDiv.removeChild(postsDiv.lastChild);
        }
        return postsDiv;
    }
}

function historyflash() 
{
    let historyBox = document.getElementById(`newsflashHistory`);

    while (historyBox.lastChild)
    historyBox.removeChild(historyBox.lastChild);

    let textHis;
    history.forEach(item => 
        {
        textHis = document.createElement('span');
        textHis.innerText = item;
        historyBox.appendChild(textHis);
        historyBox.appendChild(document.createElement('br'));
        });
}

function newsflash (text="") 
{
    clearNews();

    let newsBox = document.getElementById('newsflashContainer');
    
    let title = document.createElement("span");
    title.innerText = `Console:
    `;
    newsBox.append(title);
    
    let textSpan = document.createElement('span');
    textSpan.innerText = text;
    newsBox.appendChild(textSpan);

    console.log(text);
    history.push("* ".concat(text));
    console.log(history);
    historyflash();

    //add toggle history button next to search bar 
    createHistoryButton();

    function clearNews() {
        let newsBox = document.getElementById('newsflashContainer');
        if (newsBox.style.display == 'none')
        {
            newsBox.style.display = 'block';

            let titleHis = document.createElement("span");
            titleHis.id = "newsflashTitle";
            titleHis.innerText = `History:`;
            let historyBox = document.getElementById(`newsflashHistory`);
            historyBox.append(titleHis);
            historyBox.appendChild(document.createElement('br'));

        }
        else
            while (newsBox.lastChild)
                newsBox.removeChild(newsBox.lastChild);
    }
}

function createHistoryButton() {
    if (!document.getElementById('HistoryButton')) {
        let toggleHistory = document.createElement("input");
        document.getElementById('search-container').appendChild(toggleHistory);
        toggleHistory.type = "button";
        toggleHistory.id = "HistoryButton";
        toggleHistory.value = "Display History";
        toggleHistory.onclick = () => {
            let historyBox = document.getElementById(`newsflashHistory`);
            if (historyBox.style.display == 'none') {
                historyBox.style.display = 'block';
                toggleHistory.value = "Hide History";
            }

            else {
                historyBox.style.display = 'none';
                toggleHistory.value = "Display History";;
            }
        };
    }
}
