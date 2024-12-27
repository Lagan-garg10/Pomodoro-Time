var PomodoroTime = parseInt(localStorage.getItem('PomodoroTime')) || 20 * 60
var isTimerStart = false
var isShortBreakStart = false
var isLongBreakStart = false
var noOfPomodoros = localStorage.getItem('noOfPomodoros') || 0
var noOfShortBreak = localStorage.getItem('noOfShortBreak') || 0
var noOfLongBreak = localStorage.getItem('noOfLongBreak') || 0
var shortBreakTime = parseInt(localStorage.getItem('shortBreakTime')) || 5 * 60
var longBreakTime = parseInt(localStorage.getItem('longBreakTime')) || 15 * 60
var selectedTab = 'pomodoroTime'
var standardPomodoroTime = localStorage.getItem('standardPomodoroTime') || '20:00'
var standardLongBreakTime = localStorage.getItem('standardLongBreakTime') || '15:00'
var standardShortBreakTime = localStorage.getItem('standardShortBreakTime') || '05:00'
var test = ''

var alarmAudio = document.getElementById('alarmAudio')
alarm.setAttribute('src', localStorage.getItem('alarm') || 'alarm.mp3')

var isAutoPlayPomodoro = JSON.parse(localStorage.getItem('isAutoPlayPomodoro')) || false
var isAutoPlayShortBreak = JSON.parse(localStorage.getItem('isAutoPlayShortBreak')) || true

const mixes = {
    mix1: ["lofi.mp3", "lofi2.mp3", "lofi3.mp3", "lofi4.mp3"],
    mix2: ["trap1.mp3", "trap2.mp3", "trap3.mp3"],
    mix3: ["nature1.mp3", "nature2.mp3"]
};

let currentMix = null;
let currentTrackIndex = 0;
let audio = new Audio();

// function to start pomodoro time
function startPomodoro() {
    isTimerStart = true
    document.getElementById('start-btn').innerHTML = 'STOP'
    timerInterval = setInterval(() => {
        if (PomodoroTime > 0) {
            PomodoroTime--
            timeCalculate()
        } else {
            alarmAudio.play()
            clearInterval(timerInterval)
            noOfPomodoros++
            selectedTab = 'shortBreak'
            resetAll()
            if (isAutoPlayPomodoro === true) {
                startShortBreak()
            }
        }
    }, 1000)
}

// function to start short break
function startShortBreak() {
    isShortBreakStart = true
    document.getElementById('start-btn').innerHTML = 'STOP'
    timerInterval = setInterval(() => {
        if (shortBreakTime > 0) {
            shortBreakTime--
            timeCalculate()
        } else {
            alarmAudio.play()
            clearInterval(timerInterval)
            noOfShortBreak++
            selectedTab = 'pomodoroTime'
            resetAll()
            if (isAutoPlayPomodoro === true) {
                startPomodoro()
            }
        }
    }, 1000)
}

// function to start long break
function startLongBreak() {
    isLongBreakStart = true
    document.getElementById('start-btn').innerHTML = 'STOP'
    timerInterval = setInterval(() => {
        if (longBreakTime > 0) {
            longBreakTime--
            timeCalculate()
        } else {
            alarmAudio.play()
            clearInterval(timerInterval)
            noOfLongBreak++
            selectedTab = 'pomodoroTime'
            resetAll()
            if (isAutoPlayPomodoro === true) {
                startPomodoro()
            }
        }
    }, 1000)
}

// function to calculate left Time in standard form
function timeCalculate() {

    if (isTimerStart === true) {
        var minutes = Math.floor(PomodoroTime / 60)
        var seconds = PomodoroTime % 60
    }
    else if (isShortBreakStart === true) {
        var minutes = Math.floor(shortBreakTime / 60)
        var seconds = shortBreakTime % 60
    }
    else if (isLongBreakStart === true) {
        var minutes = Math.floor(longBreakTime / 60)
        var seconds = longBreakTime % 60
    }

    var currentTimeLeft = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    document.getElementById('time-left').innerHTML = currentTimeLeft
}

// function to reset everything on ui
function resetAll() {
    localStorage.setItem('noOfPomodoros', noOfPomodoros)
    localStorage.setItem('noOfShortBreak', noOfShortBreak)
    localStorage.setItem('noOfLongBreak', noOfLongBreak)

    isTimerStart = false
    isShortBreakStart = false
    isLongBreakStart = false
    PomodoroTime = parseInt(localStorage.getItem('PomodoroTime')) || 20 * 60
    shortBreakTime = parseInt(localStorage.getItem('shortBreakTime')) || 5 * 60
    longBreakTime = parseInt(localStorage.getItem('longBreakTime')) || 15 * 60
    if (selectedTab === 'pomodoroTime') {
        document.getElementById('time-left').innerHTML = standardPomodoroTime
        document.getElementById('pomodoroTime').classList.add('active')
        document.getElementById('shortBreakStart').classList.remove('active')
        document.getElementById('longBreakTime').classList.remove('active')
        document.body.style.backgroundColor = 'none'
        document.body.style.backgroundImage = 'url("https://app.pomodorotimer.online/_nuxt/img/1_colorful-women.c624b77.webp")'
    }
    else if (selectedTab === 'shortBreak') {
        document.getElementById('time-left').innerHTML = standardShortBreakTime
        document.getElementById('shortBreakStart').classList.add('active')
        document.getElementById('pomodoroTime').classList.remove('active')
        document.getElementById('longBreakTime').classList.remove('active')
        document.body.style.backgroundColor = 'steelblue'
        document.body.style.backgroundImage = 'none'
    }
    else {
        document.getElementById('time-left').innerHTML = standardLongBreakTime
        document.getElementById('longBreakTime').classList.add('active')
        document.getElementById('pomodoroTime').classList.remove('active')
        document.getElementById('shortBreakStart').classList.remove('active')
        document.body.style.backgroundColor = 'steelblue'
        document.body.style.backgroundImage = 'none'
    }
    document.getElementById('start-btn').innerHTML = 'START'
    document.getElementById('noOfPomodoro').innerHTML = localStorage.getItem('noOfPomodoros') || 0
    document.getElementById('noOfShortBreaks').innerHTML = localStorage.getItem('noOfShortBreak') || 0
    document.getElementById('noOfLongBreaks').innerHTML = localStorage.getItem('noOfLongBreak') || 0
}

// function to stop pomodoro, short break and long break
function stopPomodoro() {
    clearInterval(timerInterval)
    resetAll()
}

// function to add new todo list
function addNewTodoList() {
    var todoListName = document.getElementById('todoNameInput').value
    const toDoListHTML = `
  <div id="${todoListName}" class="todoList_Tasks">
              <div class="toDoList">
                  <div class="toDoListNameContainer">
                      <div class="todoListColour"></div>
                      <h3 class="todoListName">${todoListName}</h3>
                  </div>
                  <div class="dropdown">
                      <button>...</button>
                      <div class="dropdown-menu">
                          <a id="addNewTodo">Add new to-do list</a>
                      </div>
                  </div>
              </div>
              <div class="allTask ${todoListName}">
                  
              </div>
              <button class="add-task ${todoListName}" id="add-task"><i class="fa-solid fa-plus"></i> Add New Task</button>
          </div>
  `;
    document.getElementById('Taskoverlay').innerHTML = document.getElementById('Taskoverlay').innerHTML + toDoListHTML
    document.getElementById('addTodooverlay').style.display = 'none'
    var addTaskButton = document.getElementsByClassName('add-task')
    for (i = 0; i < addTaskButton.length; i++) {
        addTaskButton[i].addEventListener('click', (event) => {
            // addNewTask(event.target)
            test = event.target
            document.getElementById('addTaskOverlay').style.display = 'block'
        })
    }
}

// function to save todo list and task to local stroage
function saveToLocalStorage() {
    localStorage.setItem('todoData', [])
    const todoLists = document.querySelectorAll('.todoList_Tasks');
    let data = [];

    todoLists.forEach((list) => {
        const listName = list.id;
        const tasks = Array.from(list.querySelectorAll('.task')).map((task) => {
            return {
                name: task.querySelector('.taskName').innerText,
                completed: task.querySelector('.inputComplete').checked
            };
        });

        data.push({ listName, tasks });
    });

    localStorage.setItem('todoData', JSON.stringify(data));
}

// code for initially add event listener to add task button
var addTaskButton = document.getElementsByClassName('add-task')
for (i = 0; i < addTaskButton.length; i++) {
    addTaskButton[i].addEventListener('click', (event) => {
        // addNewTask(event.target)
        test = event.target
        document.getElementById('addTaskOverlay').style.display = 'block'
    })
}

// function to add new task
function addNewTask(button) {
    const classList = button.classList;
    const secondClass = classList[1];

    const TodoListMainDiv = document.getElementById(secondClass);
    const taskTitle = document.getElementById('taskNameInput').value

    const taskHTML = `
      <div class="task ${secondClass}">
                      <input class='inputComplete' type="checkbox">
                      <h3 class="taskName">${taskTitle}</h3>
                      <div class="dropdown">
                          <button>...</button>
                          <div class="dropdown-menu">
                              <a class="deleteTask">Delete</a>
                          </div>
                      </div>
                  </div>
    `;

    const allTaskElement = TodoListMainDiv.querySelector('.allTask');
    allTaskElement.innerHTML += taskHTML;

    var allCheckboxes = document.getElementsByClassName('inputComplete')
    for (i = 0; i < allCheckboxes.length; i++) {
        allCheckboxes[i].addEventListener('click', (event) => {
            completeTask(event.target)
        })
    }

    var deleteTaskTag = document.getElementsByClassName('deleteTask')
    for (i = 0; i < deleteTaskTag.length; i++) {
        deleteTaskTag[i].addEventListener('click', (event) => {
            deleteTask(event.target)
        })
    }
    document.getElementById('addTaskOverlay').style.display = 'none'
}

// function to complete task
function completeTask(checkbox) {
    var parentDiv = checkbox.parentElement
    if (checkbox.checked) {
        parentDiv.classList.add('completeTask')
    }
    else {
        parentDiv.classList.remove('completeTask')
    }
    saveToLocalStorage()
}

// function to delete task
function deleteTask(anchorTag) {
    var parentDiv = anchorTag.parentElement.parentElement.parentElement
    console.log(parentDiv)
    var element = document.getElementsByClassName('allTask')
    var classParentDiv = parentDiv.classList[1]
    for (i = 0; i < element.length; i++) {
        if (element[i].classList[1] === classParentDiv) {
            element[i].removeChild(parentDiv)
        }
    }
    saveToLocalStorage()
}

// function to set pomodoro time, short break time and long break time
function setConcentrationTime() {
    const checkboxes = document.querySelectorAll('.concentration-time-checkbox')
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            var id = checkbox.id
            console.log(id)
            localStorage.setItem('concentrationTimeType', id)
            if (id === 'popular') {
                PomodoroTime = 20 * 60
                shortBreakTime = 5 * 60
                longBreakTime = 15 * 60
                standardPomodoroTime = '20:00'
                standardShortBreakTime = '05:00'
                standardLongBreakTime = '15:00'
                localStorage.setItem('PomodoroTime', PomodoroTime)
                localStorage.setItem('shortBreakTime', shortBreakTime)
                localStorage.setItem('longBreakTime', longBreakTime)
                localStorage.setItem('standardPomodoroTime', standardPomodoroTime)
                localStorage.setItem('standardShortBreakTime', standardShortBreakTime)
                localStorage.setItem('standardLongBreakTime', standardLongBreakTime)
                resetAll()
            }
            else if (id === 'medium') {
                PomodoroTime = 40 * 60
                shortBreakTime = 8 * 60
                longBreakTime = 20 * 60
                standardPomodoroTime = '40:00'
                standardShortBreakTime = '08:00'
                standardLongBreakTime = '20:00'
                localStorage.setItem('PomodoroTime', PomodoroTime)
                localStorage.setItem('shortBreakTime', shortBreakTime)
                localStorage.setItem('longBreakTime', longBreakTime)
                localStorage.setItem('standardPomodoroTime', standardPomodoroTime)
                localStorage.setItem('standardShortBreakTime', standardShortBreakTime)
                localStorage.setItem('standardLongBreakTime', standardLongBreakTime)
                resetAll()
            }
            else if (id === 'extended') {
                PomodoroTime = 60 * 60
                shortBreakTime = 10 * 60
                longBreakTime = 25 * 60
                standardPomodoroTime = '60:00'
                standardShortBreakTime = '10:00'
                standardLongBreakTime = '25:00'
                localStorage.setItem('PomodoroTime', PomodoroTime)
                localStorage.setItem('shortBreakTime', shortBreakTime)
                localStorage.setItem('longBreakTime', longBreakTime)
                localStorage.setItem('standardPomodoroTime', standardPomodoroTime)
                localStorage.setItem('standardShortBreakTime', standardShortBreakTime)
                localStorage.setItem('standardLongBreakTime', standardLongBreakTime)
                resetAll()
            }
            else if (id === 'custom') {
                var pomodoroCustomTimeSelected = document.getElementById('pomodoroCustomTimeSelected').value
                var shortBreakCustomTimeSelected = document.getElementById('shortBreakCustomTimeSelected').value
                var longBreakCustomTimeSelected = document.getElementById('longBreakCustomTimeSelected').value
                PomodoroTime = (pomodoroCustomTimeSelected / 60) * 60
                shortBreakTime = (shortBreakCustomTimeSelected / 60) * 60
                longBreakTime = (longBreakCustomTimeSelected / 60) * 60
                standardPomodoroTime = pomodoroCustomTimeSelected / 60 + ':00'
                standardShortBreakTime = `${shortBreakCustomTimeSelected / 60}:00`
                standardLongBreakTime = `${longBreakCustomTimeSelected / 60}:00`
                localStorage.setItem('PomodoroTime', PomodoroTime)
                localStorage.setItem('shortBreakTime', shortBreakTime)
                localStorage.setItem('longBreakTime', longBreakTime)
                localStorage.setItem('standardPomodoroTime', standardPomodoroTime)
                localStorage.setItem('standardShortBreakTime', standardShortBreakTime)
                localStorage.setItem('standardLongBreakTime', standardLongBreakTime)
                resetAll()
            }
        }
    })
}

// code for check if user has already checked one checkbox then other three are
// unchecked in concentration time
const checkboxes = document.querySelectorAll('.concentration-time-checkbox')
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        setConcentrationTime()
        // resetAll()
        if (checkbox.checked) {
            // Uncheck all other checkboxes
            checkboxes.forEach((otherCheckbox) => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;
                }
            });
        }
    });
})

// function to change alarm 1
function changeAlarm1() {
    alarm.setAttribute('src', 'alarm1.mp3')
    document.getElementById('changeSoundButton1').style.backgroundColor = 'rgba(4, 6, 20)'
    document.getElementById('changeSoundButton1').style.color = 'white'
    document.getElementById('changeSoundButton2').style.backgroundColor = 'transparent'
    document.getElementById('changeSoundButton2').style.color = 'black'

    localStorage.setItem('alarm', 'alarm1.mp3')
}

// function to change alarm 2
function changeAlarm2() {
    alarmAudio.setAttribute('src', 'alarm2.mp3')
    document.getElementById('changeSoundButton2').style.backgroundColor = 'rgba(4, 6, 20)'
    document.getElementById('changeSoundButton2').style.color = 'white'
    document.getElementById('changeSoundButton1').style.color = 'black'
    document.getElementById('changeSoundButton1').style.backgroundColor = 'transparent'

    localStorage.setItem('alarm', 'alarm2.mp3')
}

// Function to initialize UI when website reloads
function initialization() {
    document.getElementById('time-left').innerHTML = localStorage.getItem('standardPomodoroTime') || '20:00'
    selectedTab = 'pomodoroTime'
    document.getElementById('noOfPomodoro').innerHTML = localStorage.getItem('noOfPomodoros') || 0
    document.getElementById('noOfShortBreaks').innerHTML = localStorage.getItem('noOfShortBreak') || 0
    document.getElementById('noOfLongBreaks').innerHTML = localStorage.getItem('noOfLongBreak') || 0
    if (localStorage.getItem('concentrationTimeType')) {
        document.getElementById(localStorage.getItem('concentrationTimeType')).checked = true
    }
    if (localStorage.getItem('concentrationTimeType') === 'custom') {
        document.getElementById('shortBreakCustomTime').innerHTML = `${localStorage.getItem('shortBreakTime') / 60} min`
        document.getElementById('longBreakCustomTime').innerHTML = `${localStorage.getItem('longBreakTime') / 60} min`
        document.getElementById('pomodoroCustomTime').innerHTML = `${localStorage.getItem('PomodoroTime') / 60} min`
        document.getElementById('pomodoroCustomTimeSelected').value = localStorage.getItem('PomodoroTime')
        document.getElementById('shortBreakCustomTimeSelected').value = localStorage.getItem('shortBreakTime')
        document.getElementById('longBreakCustomTimeSelected').value = localStorage.getItem('longBreakTime')
    }
    if (localStorage.getItem('alarm') === 'alarm2.mp3') {
        document.getElementById('changeSoundButton2').style.backgroundColor = 'rgba(4, 6, 20)'
        document.getElementById('changeSoundButton2').style.color = 'white'
    }
    else if (localStorage.getItem('alarm') === 'alarm1.mp3') {
        document.getElementById('changeSoundButton1').style.backgroundColor = 'rgba(4, 6, 20)'
        document.getElementById('changeSoundButton1').style.color = 'white'
    }
    if (localStorage.getItem('isAutoPlayPomodoro') === true) {
        document.getElementById('autoStartPomodoros').checked = true
    }
    if (localStorage.getItem('isAutoPlayShortBreak') === true) {
        document.getElementById('autoStartBreak').checked = true
    }
    const allCompleteInputs = document.getElementsByClassName('inputComplete')
    for (i = 0; i < allCompleteInputs.length; i++) {
        if (allCompleteInputs[i].checked === true) {
            const parentElement = allCompleteInputs[i].parentElement
            parentElement.classList.add('completeTask')
        }
    }
}

// function to load tasks and todo from local storage
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('todoData')) || [];
    if (localStorage.getItem('todoData')) {
        if (JSON.parse(localStorage.getItem('todoData')).length !== 0) {
            var todoList_Tasks = document.getElementsByClassName('todoList_Tasks')
            for (i = 0; i < todoList_Tasks.length; i++) {
                document.getElementById('Taskoverlay').removeChild(todoList_Tasks[i])
            }
        }
    }
    data.forEach((todo) => {
        const { listName, tasks } = todo;
        const toDoListHTML = `
        <div id="${listName}" class="todoList_Tasks">
            <div class="toDoList">
                <div class="toDoListNameContainer">
                    <div class="todoListColour"></div>
                    <h3 class="todoListName">${listName}</h3>
                </div>
                <div class="dropdown">
                    <button>...</button>
                    <div class="dropdown-menu">
                        <a id="HideCompleteTask">Hide completed tasks</a>
                        <a id="removePendingTask">Remove pending tasks</a>
                        <a id="removeCompletedTask">Remove completed tasks</a>
                        <a id="addNewTodo">Add new to-do list</a>
                    </div>
                </div>
            </div>
            <div class="allTask ${listName}">
                ${tasks.map(task => `
                <div class="task ${listName} ${task.completed ? 'completeTask' : ''}">
                    <input class="inputComplete" type="checkbox" ${task.completed ? 'checked' : ''}>
                    <h3 class="taskName">${task.name}</h3>
                    <div class="dropdown">
                        <button>...</button>
                        <div class="dropdown-menu">
                            <a href="#">Edit</a>
                            <a class="deleteTask">Delete</a>
                        </div>
                    </div>
                </div>`).join('')}
            </div>
            <button class="add-task ${listName}" id="add-task"><i class="fa-solid fa-plus"></i> Add New Task</button>
        </div>`;

        // var testing = document.getElementsByClassName('todoList_Tasks')
        // for(i=0;i<testing.length;i++){
        //   document.getElementById('Taskoverlay').removeChild(testing[i])
        // }

        document.getElementById('Taskoverlay').innerHTML += toDoListHTML;
    });

    attachEventListeners();
}

// function to attach event listener from everything loaded from local storage
function attachEventListeners() {
    const addTaskButtons = document.querySelectorAll('.add-task');
    addTaskButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            test = event.target;
            document.getElementById('addTaskOverlay').style.display = 'block';
        });
    });

    document.getElementById('addNewTodo').addEventListener('click', () => {
        document.getElementById('addTodooverlay').style.display = 'block'
    })

    const allCheckboxes = document.querySelectorAll('.inputComplete');
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('click', (event) => {
            completeTask(event.target);
            saveToLocalStorage();
        });
    });

    const deleteTaskTags = document.querySelectorAll('.deleteTask');
    deleteTaskTags.forEach(anchorTag => {
        anchorTag.addEventListener('click', (event) => {
            deleteTask(event.target);
            saveToLocalStorage();
        });
    });
}

// Function to play a track
function playTrack() {
    audio.src = currentMix[currentTrackIndex];
    audio.play();
    audio.onended = () => {
        // Automatically play the next track
        if (currentTrackIndex < currentMix.length - 1) {
            currentTrackIndex++;
            playTrack();
        }
    };
}

// alarmAudio.play()

// ------------ EVENT LISTENERS -----------

// add click function on start button to start pomodoro, short break or long break time
document.getElementById('start-btn').addEventListener('click', () => {
    if (selectedTab === 'pomodoroTime') {
        if (isTimerStart === false) {
            startPomodoro()
        }
        else {
            stopPomodoro()
        }
    }
    else if (selectedTab === 'shortBreak') {
        if (isShortBreakStart === false) {
            startShortBreak()
        }
        else {
            stopPomodoro()
        }
    }
    else if (selectedTab === 'longBreak') {
        if (isLongBreakStart === false) {
            startLongBreak()
        }
        else {
            stopPomodoro()
        }
    }
})

// event listener to open create todo div
document.getElementById('addNewTodo').addEventListener('click', () => {
    document.getElementById('addTodooverlay').style.display = 'block'
})

// event listener to open task main div
document.getElementById('taskList').addEventListener('click', () => {
    document.getElementById('Taskoverlay').style.display = 'block'
})

// event listener to close task main div
document.getElementById('closeTaskOverlay').addEventListener('click', () => {
    document.getElementById('Taskoverlay').style.display = 'none'
})

// event listener to close add todo div
document.getElementById('closeOverlay2').addEventListener('click', () => {
    document.getElementById('addTodooverlay').style.display = 'none'
})

// event listener to add new task
document.getElementById('addTaskButton').addEventListener('click', () => {
    addNewTask(test)
    saveToLocalStorage()
})

// event listener to change UI when click on short break tab
document.getElementById('shortBreakStart').addEventListener('click', () => {
    document.getElementById('time-left').innerHTML = standardShortBreakTime
    selectedTab = 'shortBreak'
    document.getElementById('shortBreakStart').classList.add('active')
    document.getElementById('pomodoroTime').classList.remove('active')
    document.getElementById('longBreakTime').classList.remove('active')
    document.body.style.backgroundColor = 'steelblue'
    document.body.style.backgroundImage = 'none'
})

// event listener to change UI when click on long break tab
document.getElementById('longBreakTime').addEventListener('click', () => {
    document.getElementById('time-left').innerHTML = standardLongBreakTime
    selectedTab = 'longBreak'
    document.getElementById('longBreakTime').classList.add('active')
    document.getElementById('pomodoroTime').classList.remove('active')
    document.getElementById('shortBreakStart').classList.remove('active')
    document.body.style.backgroundColor = 'steelblue'
    document.body.style.backgroundImage = 'none'
})

// event listener to change UI when click on  pomodoro time tab
document.getElementById('pomodoroTime').addEventListener('click', () => {
    document.getElementById('time-left').innerHTML = standardPomodoroTime
    selectedTab = 'pomodoroTime'
    document.getElementById('pomodoroTime').classList.add('active')
    document.getElementById('shortBreakStart').classList.remove('active')
    document.getElementById('longBreakTime').classList.remove('active')
    document.body.style.backgroundColor = 'none'
    document.body.style.backgroundImage = 'url("https://app.pomodorotimer.online/_nuxt/img/1_colorful-women.c624b77.webp")'
})

// event listener to add both change alarm function on both button
document.getElementById('changeSoundButton1').addEventListener('click', changeAlarm1)
document.getElementById('changeSoundButton2').addEventListener('click', changeAlarm2)

// event listener to open navbar
document.getElementById('hamBurgerIcon').addEventListener('click', () => {
    document.getElementById('navbar').style.display = 'block'
})

// event listener to open concentration time div
document.getElementById('concentrationTimeOpenIcon').addEventListener('click', () => {
    document.getElementById('concentrationTime').style.display = 'block'
})

// event listener to close navabr
document.getElementById('closeNavbarIcon').addEventListener('click', () => {
    document.getElementById('alarm').style.display = 'none'
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('concentrationTime').style.display = 'none'
})

// event listener to back to navbar div from concentration time div
document.getElementById('backToNavbarIcon').addEventListener('click', () => {
    document.getElementById('concentrationTime').style.display = 'none'
    document.getElementById('alarm').style.display = 'none'
    document.getElementById('autoStart').style.display = 'none'
    document.getElementById('navbar').style.display = 'block'
})

// event listener to back to navbar div from alarm div
document.getElementById('backToNavbarIconAlarm').addEventListener('click', () => {
    document.getElementById('concentrationTime').style.display = 'none'
    document.getElementById('alarm').style.display = 'none'
    document.getElementById('autoStart').style.display = 'none'
    document.getElementById('navbar').style.display = 'block'
})

// event listener to back to navbar div from auto start div
document.getElementById('backToNavbarIconAutoStart').addEventListener('click', () => {
    document.getElementById('concentrationTime').style.display = 'none'
    document.getElementById('alarm').style.display = 'none'
    document.getElementById('autoStart').style.display = 'none'
    document.getElementById('navbar').style.display = 'block'
})

// event listener to close concentration div
document.getElementById('closeConcentrationTime').addEventListener('click', () => {
    document.getElementById('concentrationTime').style.display = 'none'
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('alarm').style.display = 'none'
})

// event listener to close alarm div
document.getElementById('alarmCloseButton').addEventListener('click', () => {
    document.getElementById('alarm').style.display = 'none'
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('concentrationTime').style.display = 'none'
})

// event listener to open alarm div
document.getElementById('alarmOpenIcon').addEventListener('click', () => {
    document.getElementById('alarm').style.display = 'block'
})

// event listener to open auto start div
document.getElementById('autoStartIcon').addEventListener('click', () => {
    document.getElementById('autoStart').style.display = 'block'
})

// event listener to close auto start div
document.getElementById('autoStartCloseButton').addEventListener('click', () => {
    document.getElementById('alarm').style.display = 'none'
    document.getElementById('autoStart').style.display = 'none'
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('concentrationTime').style.display = 'none'
})

// event listener to select to auto start pomodors
document.getElementById('autoStartPomodoros').addEventListener('change', () => {
    if (document.getElementById('autoStartPomodoros').checked) {
        isAutoPlayPomodoro = true
        localStorage.setItem('isAutoPlayPomodoro', true)
    }
    else {
        isAutoPlayPomodoro = false
        localStorage.setItem('isAutoPlayPomodoro', false)
    }
})

// event listener to select to auto start short break
document.getElementById('autoStartBreak').addEventListener('change', () => {
    if (document.getElementById('autoStartBreak').checked) {
        isAutoPlayShortBreak = true
        localStorage.setItem('isAutoPlayShortBreak', true)
    }
    else {
        isAutoPlayShortBreak = false
        localStorage.setItem('isAutoPlayShortBreak', false)
    }
})

// event listener to attach add todolist function when button clicked
document.getElementById('addTodoList').addEventListener('click', () => {
    addNewTodoList()
    saveToLocalStorage()
})

// event listeners to change UI when concentration time custom range is changed
document.getElementById('shortBreakCustomTimeSelected').addEventListener('change', () => {
    document.getElementById('shortBreakCustomTime').innerHTML = `${document.getElementById('shortBreakCustomTimeSelected').value / 60} min`
    setConcentrationTime()
})

document.getElementById('pomodoroCustomTimeSelected').addEventListener('change', () => {
    document.getElementById('pomodoroCustomTime').innerHTML = `${document.getElementById('pomodoroCustomTimeSelected').value / 60} min`
    setConcentrationTime()
})

document.getElementById('longBreakCustomTimeSelected').addEventListener('change', () => {
    document.getElementById('longBreakCustomTime').innerHTML = `${document.getElementById('longBreakCustomTimeSelected').value / 60} min`
    setConcentrationTime()
})

// add function when document reload
window.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage()
    initialization()
})

// Play the selected mix
document.getElementById("playButton").addEventListener("click", () => {
    const selectedMix = document.querySelector('input[name="mix"]:checked');
    if (selectedMix) {
        currentMix = mixes[selectedMix.value]
        currentTrackIndex = 0
        playTrack()
    } else {
        alert("Please select a mix to play!")
    }
})

// Stop playback
document.getElementById("stopButton").addEventListener("click", () => {
    audio.pause()
    audio.currentTime = 0
})

// Play the previous track
document.getElementById("prevButton").addEventListener("click", () => {
    if (currentMix && currentTrackIndex > 0) {
        currentTrackIndex--
        playTrack()
    }
})

// Play the next track
document.getElementById("nextButton").addEventListener("click", () => {
    if (currentMix && currentTrackIndex < currentMix.length - 1) {
        currentTrackIndex++
        playTrack()
    }
})

// Adjust volume
document.getElementById("volumeControl").addEventListener("input", () => {
    audio.volume = volumeControl.value
})

document.getElementById('audio').addEventListener('click',()=>{
    if(document.getElementById('mixContainer').style.display == 'block'){
        document.getElementById('mixContainer').style.display = 'none'
    }
    else{
        document.getElementById('mixContainer').style.display = 'block'
    }
})