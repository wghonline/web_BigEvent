

//  注意：每次调用 $.gei 或 $.post 或 $.ajax()的时候会先调佣ajaxPrefilter这函数
// 在这个函数中可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);

})












