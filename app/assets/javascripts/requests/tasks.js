$.ajaxSetup({
  headers: {
    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
  }
});

var indexTasks = function (successCB, errorCB) {
  var request = {
    type: 'GET',
    url: 'api/tasks?api_key=1',
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
};

var createTask = function (successCB, errorCB) {
  var request = {
    type: 'POST',
    url: 'api/tasks?api_key=1',
    data: {
      task: {
        content: $('#new-task-content').val()
      }
    },
    success: function () {
      $('#new-task-content').val('');
      successCB()
    },
    error: errorCB
  }
  $.ajax(request);
}

var deleteTask = function (id, successCB, errorCB) {
  var request = {
    type: 'DELETE',
    url: 'api/tasks/'+ id +'?api_key=1',
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}

var markComplete = function (id, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/'+ id +'/mark_complete?api_key=1',
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}

var markActive = function (id, successCB, errorCB) {
  var request = {
    type: 'PUT',
    url: 'api/tasks/'+ id +'/mark_active?api_key=1',
    success: successCB,
    error: errorCB
  }
  $.ajax(request);
}

var getAndDisplayAllTasks = function (filter) {
  if ($('.static_pages.index').length > 0) {
    indexTasks(function (response) {


      var filteredTasks = response.tasks.filter(function(task) {
        if (filter === 'completed') {
          return task.completed === true;
        } else if (filter === 'active') {
          return task.completed === false;
        } else {
          return true;
        }
      });

      var htmlString = filteredTasks.map(function(task) {
        return "<div class='col-9 p-2 task' data-id='" + task.id + "'><p class='mb-0'>" + task.content + "</p></div><div class='d-flex col-2 p-2 text-center align-items-center'><button class='delete' data-id='" + task.id + "'>Delete</button></div><div class='col-1 mb-3 p-2'><input type='checkbox' class='mark-complete' data-id='" + task.id + "'" + (task.completed ? "checked" : " ") + "></div>";
      });
      $("#tasks").html(htmlString);
    });
  }
}
