

$(function(){

    getUserinfo()

    var layer = layui.layer
    // 点击按钮，退出功能
    $('#btnLogout').on('click',function(){
        // 提示用户是否退出
        layer.confirm('是否确定退出登录', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清空本地储存的 token
            localStorage.removeItem('token')
            // 2.重新跳转登录页
            location.href = '/login.html'

            // 这是关闭 confirm 询问框
            layer.close(index);
        });
    })

})



// 获取用户的基本信息
function getUserinfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头 配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            // console.log(res);
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data)
        },
        // 不论成功还是失败都会调用compleate 函数
        complete:function(res){
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
}

function renderAvatar(user){
    var name = user.nickname || user.username
    // console.log(name);
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name )
    if(user.user_pic !== null){
        $('layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}









