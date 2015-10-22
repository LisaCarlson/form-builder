$( document ).ready(function() {
  var form = {
    id: "new",
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
    var droppableSection = "<div class='row'><div class='col-md-12 droppable-section ui-droppable'></div></div>"; 
    var submitButton = form.submitButton;
    var cancelButton = form.cancelButton;
    var components = form.components;
    $container.html('');
    console.log($container);
    $container.append("<form data-form-id='" + form.id + "' class='fb-form'></form>");
    $form = $container.find('.fb-form');
    $form.append("<h2>" + form.title + "</h2>");
    $form.append(droppableSection);
    for(x in components){
      var component = components[x];
      switch(component.type){
        case "text":
          $form.append("<div data-component-id='" + component.id + "' class='form-group fb-input-text'><label for='" + component.name + "'>" + component.label + "</label><input class='form-control' type='text' placeholder='" + component.placeholder + "' name='" + component.name + "' value='" + component.defaultValue + "' /></div>");
          break;
        case "email":
          $form.append("<div data-component-id='" + component.id + "' class='form-group fb-input-email'><label for='" + component.name + "'>" + component.label + "</label><input class='form-control' type='text' placeholder='" + component.placeholder + "' name='" + component.name + "' value='" + component.defaultValue + "' /></div>");
          break;  
        default:
      }
    }
    $form.append(droppableSection);
    $form.append("<div class='row'><div class='col-md-12 fb-buttons'><button type='reset' class='" + cancelButton.classes + "'>" + cancelButton.label + "</button><button type='submit' class='" + submitButton.classes + "'>" + submitButton.label + "</button></div>");
    initDroppable();
  }

  function renderOptions(component) {
    $('a[href="#options"]').tab('show');
    $('#options-reset').click();
    var $optionsForm = $("#options form"); 
    $optionsForm.attr('data-component-id', component.id);
    $optionsForm.find('#component-label').val(component.label);
    $optionsForm.find('#component-name').val(component.name);
    $optionsForm.find('#component-placeholder').val(component.placeholder);
    $optionsForm.find('#component-default-value').val(component.defaultValue);
    var $required = $optionsForm.find('#component-required');
    if(component.required){
      $required.prop('checked', true);
    }
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
        var number = form.components.length + 1;
        var component = {
          id: form.id + "-" + number,
          type: type,
          label: 'Input ' + number,
          name: 'input' + number,
          placeholder: '',
          defaultValue: '',
          required: false
        };

        form.components.push(component);
        renderForm();
        renderOptions(component);
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
  $(".btn.draggable").draggable({
    cancel: false,
    revert: "invalid",
    helper: "clone",
    start: function(e, ui) {
      $(ui.helper).addClass("ui-draggable-helper-btn");
    },
  });
   
});
