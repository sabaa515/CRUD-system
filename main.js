var courseName = document.getElementById("courseName");
var coursePrice = document.getElementById("coursePrice");
var courseDiscription = document.getElementById("courseDiscription");
var addbtn = document.getElementById("addbtn");
var data = document.getElementById("data");
var deleteAll = document.getElementById("deleteAll");
var search = document.getElementById('search');
currentIndex = 0;
if (courses = JSON.parse(localStorage.getItem('courses')) == null){
  courses = [];
}
else {
  courses = JSON.parse(localStorage.getItem('courses')) ;
dispalyCourses();
}

//Create
addbtn.onclick = function (event) {
  event.preventDefault();
  if (addbtn.value == 'Add')
    addCourse();
  else
    updateCourse();

  dispalyCourses();
  clearInputs();

};

// Add
function addCourse() {
  var course = {
    courseName: courseName.value,
    coursePrice: coursePrice.value,
    courseDiscription: courseDiscription.value,
  };
  courses.push(course);
  localStorage.setItem('courses',JSON.stringify(courses));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "The course added successfully",
    showConfirmButton: false,
    timer: 1500,
  });
}
//clear inputs
function clearInputs() {
  courseName.value = "";
  coursePrice.value = "";
  courseDiscription.value = "";
}

//Read (Dissplay)
function dispalyCourses() {
  var result = "";
  for (var i = 0; i < courses.length; i++) {
    result += `
        <tr>
        <td>${i + 1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDiscription}</td>
        <td><button type="button" class="btn btn-success" onclick="getCourse(${i})">Update</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button>
        </td>
      </tr>
        
        `;
  }
  data.innerHTML = result;
}

//delete
function deleteCourse(index) {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses.splice(index, 1);
      dispalyCourses();
      localStorage.setItem('courses' ,JSON.stringify(courses) );
      Swal.fire("Deleted!", "The courses deleted successfully", "success");
    }
  });
}

//delete all

deleteAll.onclick = function () {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      courses = [];
      dispalyCourses();
      localStorage.setItem('courses' ,JSON.stringify(courses) );
      Swal.fire("Deleted!", "The courses deleted successfully", "success");
    }
  });
};

//search 
search.onkeyup = function () {
  result = '';
  for (var i = 0; i < courses.length; i++) {
    if (courses[i].courseName.toLowerCase().includes(search.value.toLowerCase())) {
      result += `
        <tr>
        <td>${i + 1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDiscription}</td>
        <td><button type="button" class="btn btn-success" onclick="getCourse(${i})">Update</button></td>
        <td><button type="button" class="btn btn-danger" onclick="deleteCourse(${i})">Delete</button></td>
      </tr>
        
        `
    }
  }
  data.innerHTML = result;
}
// Update 
function getCourse(index) {
  courseName.value = courses[index].courseName;//input value = courses[رقم الانديكس للصف اللي بدي اعدلو] .courseName 
  coursePrice.value = courses[index].coursePrice;
  courseDiscription.value = courses[index].courseDiscription;
  addbtn.value = 'Update';
  currentIndex = index;
}

function updateCourse() {
  var OldCourseName = courses[currentIndex].courseName;
  courses[currentIndex].courseName = courseName.value;
  courses[currentIndex].coursePrice = coursePrice.value;
  courses[currentIndex].courseDiscription = courseDiscription.value;
  addbtn.value = 'Add';
  localStorage.setItem('courses' ,JSON.stringify(courses) );
  Swal.fire({
    position: "center",
    icon: "success",
    title: `${OldCourseName} updated successfully`,//we changed "" to ``
    showConfirmButton: false,
    timer: 1500,
  });
}


//validation 

courseName.onkeyup = function (){
  var pattern = /^[A-Z][a-z]{2,10}$/;
  
}