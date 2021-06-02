window.addEventListener('load', function () {

    $(function () {


        // 点击send，用户输入内容渲染到页面
        $('.bottom button').on('click', function () {

            // console.log($('.bottom input').val());
            let text = $('.bottom input').val().trim()

            let li = $(`
                <li class="right">
                    <img src="https://i01piccdn.sogoucdn.com/6b0ecf4a40d7cf51" alt="" />
            
                    <span>${text}</span>
                </li>
            `);

            if (text.length <= 0) {
                return $('.bottom input').val('')
            } else {
                $('.content ul').append(li);
                $('.bottom input').val('');

                // 控制滚动条到最底端
                scrollToBottom()

                // 获取Robot回话
                getMessage(text)
            }
        })

        //回车enter
        $('.bottom input').on('keyup',function(e){
            if(e.keyCode ===13){
                $('.bottom button').click()
            }
        })


        // 重制滚动条   // 控制滚动条到最底端
        function scrollToBottom() {

            $('.content').stop().animate({
                scrollTop: $('.content').prop("scrollHeight")
            }, 0);
        }


        // get Robot Message
        function getMessage(text) {
            $.ajax({
                method: 'GET',
                // url: 'https://api.ownthink.com/bot',
                // data: {
                //     appid: '9ffcb5785ad9617bf4e64178ac64f7b1',
                //     spoken: text
                // },
                url: 'http://www.liulongbin.top:3006/api/robot',
                data: {
                    spoken: text
                },
                success: function (res) {
                    if (res.message === 'success') {
                        // console.log(res.data.info.text);
                        let li = $(`
                            <li class="left">
                                <img
                                  src="https://i.pinimg.com/564x/76/93/55/769355049f5d712011bb337888115e1a.jpg"
                                  alt=""
                                />
                                <span>${res.data.info.text}</span>
                            </li>
                        `);
                        $('.content ul').append(li);

                        // 控制滚动条到最底端
                        scrollToBottom()

                        // 文本转为语音
                        getMessageAudio(res.data.info.text)
                    }
                }
            })
        }


        // get robot message audio
        function getMessageAudio(text) {
            $.ajax({
                type: 'GET',
                url: 'http://www.liulongbin.top:3006/api/synthesize',
                data: {
                    text: text
                },
                success: function (res) {
                    if (res.status === 200) {
                        // console.log(res.voiceUrl);
                        $('audio').attr('src',res.voiceUrl)
                    }

                }
            })

        }










    })
})