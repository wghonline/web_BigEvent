$(function(){
        //点击 “去注册账号链接”
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击 “去登录链接”
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })



    // 从LayUI 获取 form 对象
    // var form = layui.form
    // form.verify({
    //     // 自定义了一个 PWD 校验规则    
    //     pwd :[
    //         /^[\S]{6,12}$/
    //         ,'密码必须6到12位，且不能出现空格'
    //       ],
    //     //   校验两次密码是否一致的规则
    //      repwd:function(value){
    //         // 通过形参拿到的是确认密码框中的内容
    //         // 还需要拿到密码框的内容 进行比较
    //         // 如果判断失败，则return一个提示消息
    //         var pwd = $('.reg-box [name=password]').val()
    //         if(pwd !== value){
    //             return '两次密码不一致'
    //         }
    //     }
    // })



    var form = layui.form
    var layer = layui.layer
    form.verify({
        pad:[
            /^[\S]{6,12}$,/,
            '密码必须6-12位，且不能出现空格！'
        ],
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value){
                return '两次密码不一致！'
            }
        }

    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = { username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('http://www.liulongbin.top:3007/api/reguser',data,function(res){
            if(res.status !== 0){
                // return console.log(res.message);
                return layer.msg(res.message);
            }
            // console.log('注册成功！！');
            layer.msg('注册成功，请登录！');
            // 模拟人的点击行为
            $('#link_login').click()
        })
    })


    // 监听表单的提交事件
    $('#form_login').submit(function(e){
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单的数据
            data:$(this).serialize(),
            success: function(res) {
                if(res.status !== 0){
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功的token 字符串，保存到localStorage
                localStorage.setItem('token',res.token)
                // console.log(res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })


})




















