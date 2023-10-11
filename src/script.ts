
    type typeOfArray = { id: number; name: string };
  
    let arrayOfObject: typeOfArray[] = [
      { id: 1, name: "Roobinee" },
      { id: 2, name: "Barath" },
      { id: 3, name: "Dharun" },
    ];
  
    if(!localStorage.getItem("arrayOfObject")){
      localStorage.setItem("array", JSON.stringify(arrayOfObject));
    }
  
    let listRef = document.getElementById("list");
    let btnRef = document.getElementById("btn");
    let nameRef = document.getElementById("name") as HTMLInputElement;
    let editId = 0;
  
    const getRandomNumber = (max: number = 1000): number => {
      return Math.floor(Math.random() * max);
    };

    const deleteObject = (delId:number) => {
      arrayOfObject = arrayOfObject.filter((retainId) => {
        if (retainId.id !== delId) {
          return retainId;
        }
      });
      render();
    };
  
    const editObject = (EditId: number) => {
      let clickedObject: typeOfArray | undefined = arrayOfObject.find(
        (object) => object.id === EditId
      );
  console.log(clickedObject);
      if (clickedObject) {
        if (btnRef) {
          editId = EditId;
          btnRef.innerText = "Edit";
          nameRef.value = clickedObject.name;
        }
      }
      render();
    };
  
    const render = () => {
      if (listRef) {
        let list = "";
  
        for(let item of arrayOfObject) {
          list += `<div class="d-flex align-items-center justify-content-between p-2 border-bottom border-primary">
                      <p class="fs-5 m-0">${item.id}</p>
                      <p class="fs-5 m-0">${item.name}</p>
                      <div>
                        <button type="button" class="btn" onclick="editObject(${item.id})">Edit</button>
                        <button type="button" onclick="deleteObject(${item.id})" class="btn text-danger" >Delete</button>
                      </div>
                    </div>`;
        }
        listRef.innerHTML = list;
      }
    };
  
    if (btnRef) {
      btnRef.addEventListener("click", () => {
        
          if (nameRef.value !== "") {
            if (editId === 0) {
            arrayOfObject.push({ id: getRandomNumber(), name: nameRef.value });
          }
        else {
          arrayOfObject = arrayOfObject.map((object) => {
            if (object.id === editId)
              return {
                ...object,
                id: editId,
                name: nameRef.value,
              };
            else return object;
          });
          editId = 0;
          if (btnRef) btnRef.innerText = "Add";
        }
        nameRef.value = "";
        render();
    } 
    else {
        nameRef.classList.replace("is-invalid", "border-primary");
      }
      });
    
    }
  

    nameRef.addEventListener("keyup", () => {
        if (nameRef.value !== "") {
          nameRef.classList.replace("is-invalid", "border-primary");
        } else {
          nameRef.classList.replace("border-primary", "is-invalid");
        }
      });

    render();

  