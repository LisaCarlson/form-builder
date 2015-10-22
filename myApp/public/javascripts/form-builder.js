$( document ).ready(function() {
  var form = {
    title: "My Form",
    components: [],
    submitButton: {
      label: "Submit",
      classes: "btn btn-success"
    },
    cancelButton: {
      label: "Cancel",
      classes: "btn btn-danger"
    }
  };


  function renderForm() {
    var $container = $("#form-preview");
    var drobbapleSection = "<div class='row'><div class='col-md-12 droppable-section ui-droppable'></div></div>"; 
    var submitButton = form.submitButton;
    var cancelButton = form.cancelButton;
    var components = form.components;
    $container.html('');
    console.log($container);
    $container.append("<form class='fb-form'></form>");
    $form = $container.find('.fb-form');
    $form.append("<h2>" + form.title + "</h2>");
    $form.append(drobbapleSection);
    for(x in components){
      var component = components[x];
      switch(component.type){
        case "text":
          $form.append("<div class='form-group fb-input-text'><label for='" + component.name + "'>" + component.label + "</label><input class='form-control' type='text' placeholder='" + component.placeholder + "' name='" + component.name + "' value='" + component.value + "' /></div>");
          break;
        case "email":
          $form.append("<div class='form-group fb-input-email'><label for='" + component.name + "'>" + component.label + "</label><input class='form-control' type='text' placeholder='" + component.placeholder + "' name='" + component.name + "' value='" + component.value + "' /></div>");
          break;  
        default:
      }
    }
    $form.append(drobbapleSection);
    $form.append("<div class='row'><div class='col-md-12 fb-buttons'><button type='reset' class='" + cancelButton.classes + "'>" + cancelButton.label + "</button><button type='reset' class='" + submitButton.classes + "'>" + submitButton.label + "</button></div>");
    initDroppable();
  }

  function initDroppable(){

    $(".droppable-section").droppable({
      accept: ".draggable",
      hoverClass: "drop-hover",
      drop: function(event, ui) {
          $(this).droppable('disable');
          $('ul.nav.nav-tabs').find('.comp').removeClass('active');
          $('ul.nav.nav-tabs').find('.comp-options').addClass('active');
          var $target = $(ui.draggable);
          var type = $target.attr('data-type');
          var component = {
            type: type,
            label: 'Input ' + form.components.length + 1,
            placeholder: '',
            name: 'input' + form.components.length + 1,
            value: ''
          };

          form.components.push(component);
          renderForm();
      }
    });
  }

  renderForm();

  $(".draggable").draggable({
    revert: "invalid",
    helper: "clone",
    start: function(e, ui) {
      $(ui.helper).addClass("ui-draggable-helper");
    },
  });
  // $(".draggable-no-clone").draggable({
  //   revert: "invalid",
  //   start: function(e, ui) {
  //     $(ui.helper).addClass("ui-draggable-helper");
  //   },
  // });
  $(".btn.draggable").draggable({
    cancel: false,
    revert: "invalid",
    helper: "clone",
    start: function(e, ui) {
      $(ui.helper).addClass("ui-draggable-helper-btn");
    },
  });
   
});
