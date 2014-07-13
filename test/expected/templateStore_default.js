define(function(){
var templateStore = {};
templateStore.push('test/fixtures/basic.html', '<div data-aid=\'my-container\'>'+
'    <h1>Hello</h1>'+
'</div>'+
'');
return templateStore;
});