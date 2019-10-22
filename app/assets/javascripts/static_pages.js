$(document).on("turbolinks:load", function () {

  getAndDisplayAllTasks();

  $('#create-task').on('submit', function (e) {
    e.preventDefault();
    createTask(getAndDisplayAllTasks);
  });

  $(document).on('click', '.delete', function () {
   deleteTask($(this).data('id'));
   getAndDisplayAllTasks ();
  });


  $(document).on('change', '.mark-complete', function () {
    if (this.checked) {
      markComplete($(this).data('id'));
      getAndDisplayAllTasks ();
    } else {
      markActive($(this).data('id'));
      getAndDisplayAllTasks ();
    }
  });

  $(document).on('click', '#all', function () {
    getAndDisplayAllTasks();
  });
  $(document).on('click', '#active', function () {
    getAndDisplayAllTasks('active');
  });
  $(document).on('click', '#completed', function () {
    getAndDisplayAllTasks('completed');
  });

});
