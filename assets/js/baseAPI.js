

//  注意：每次调用 $.gei 或 $.post 或 $.ajax()的时候会先调佣ajaxPrefilter这函数
// 在这个函数中可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);

    // 统一为有权限的接口，设置 headers 请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization:localStorage.getItem('token') || ''
        }
    }



    // 全局统一挂载 complete 回调函数
    // options.complete = function(res){
    options.complete = function(res){
        // console.log(' 执行了 complete 回调: ');
        // console.log(res);
        // 在complete 回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        // 1.强制清空 token 
        localStorage.removeItem('token')
        // 2.重新跳转登录页
        location.href = '/login.html'
        }
    }


})












