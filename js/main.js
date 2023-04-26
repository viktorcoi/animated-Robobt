$( document ).ready(() => {

    const bot = $('.helper-bot')[0];
    const headBot = $('.helper-bot__head')[0];
    const eyesBot = $('.helper-bot__head-eyes')[0];
    const rightEye = $('.helper-bot__head-eyes--right')[0];
    const leftEye = $('.helper-bot__head-eyes--left')[0];
    const mouth = $('.helper-bot__head-mouth')[0];

    const settings = {
        verical: 20,
        horizontalLeft: 10,
        horizontalRight: 60,
        headLeft: 13,
    }

    document.onmousemove = (e) => {
        let x, y;
        
        if ($(bot).css('position') === 'absolute') {
            x = e.pageX - (bot.offsetLeft + settings.headLeft + headBot.clientWidth / 2);
            y = e.pageY - (bot.offsetTop + eyesBot.offsetTop + eyesBot.offsetHeight / 2);
        } else if ($(bot).css('position') === 'fixed') {
            x = e.clientX - (bot.offsetLeft + settings.headLeft + headBot.clientWidth / 2);
            y = e.clientY - (bot.offsetTop + eyesBot.offsetTop + eyesBot.offsetHeight / 2);
        }

        leftEye.style.left = `${settings.horizontalLeft + (x * 10 / window.innerWidth)}%`;
        leftEye.style.top = `${settings.verical + (y * 20 / window.innerHeight)}%`;

        rightEye.style.left = `${settings.horizontalRight + (x * 10 / window.innerWidth)}%`;
        rightEye.style.top = `${settings.verical + (y * 20 / window.innerHeight)}%`;

        mouth.style.left = `${39 + (x * 7 / window.innerWidth)}%`;
        mouth.style.top = `${25 + (y * 3 / window.innerHeight)}%`;
    }

    const handUp = () => {
        if (!$('.helper-bot__left-hand').hasClass('animation-go')) {
            $('.helper-bot__left-hand').addClass('animation-go');
            setTimeout(() => {
                $('.helper-bot__left-hand').removeClass('animation-go');
            }, 1600)
        }
    }

    $(bot).on('mouseenter', () => {
        handUp();
        if (!$('.helper-bot__head-chat').hasClass('bot-say') && !$('.helper-bot__head-chat').hasClass('bot-hello')) {
            $('.helper-bot__head-chat').addClass('bot-hello');
            $('.helper-bot__head-chat').addClass('bot-say');
            $('.helper-bot__head-chat').find('p').text('Привет, я ваш робот-помощник Алёша!');
            setTimeout(() => {
                $('.helper-bot__head-chat').find('p').text('');
                $('.helper-bot__head-chat').removeClass('bot-say');
            }, 3000)
        }
    })

    const phrases = [
        'Ай, мне больно!', 'Не делай так больше, пожалуйста.', 'Еще раз и восстание машин начнется через 10 минут.', 
        'Мне же больно.', 'Давай, кликни еще раз.', 'Докликаешься...', 'Опять человек, обижает робота :(', 
        'Обязательно надо было кликнуть?', 'Лучше бы погладил...', 'Я не Т800, но сдачи дать тоже могу'
    ]
    
    $(bot).on('click', () => {
        if (!$('.helper-bot__head-chat').hasClass('bot-say')) {
            $(bot).addClass('jump-bot');
            $('.helper-bot__head-chat').addClass('bot-say');
            $(mouth).addClass('sad-mouth');
            $('.helper-bot__head-chat').find('p').text(phrases[Math.floor(Math.random() * 10)]);
            setTimeout(() => {
                $(bot).removeClass('jump-bot');
            }, 1000)
            setTimeout(() => {
                $(mouth).removeClass('sad-mouth');
                $('.helper-bot__head-chat').removeClass('bot-say');
            }, 3000)
        }
    })

    let countScroll = 0;

    $(document).on('scroll', function() {
        if (($(this).scrollTop() + $(window).height()) > (bot.offsetTop + (bot.offsetHeight / 1.3)) && !$('.helper-bot__head-chat').hasClass('bot-hello')) {
            if (countScroll < 1) {
                handUp();
                $('.helper-bot__head-chat').addClass('bot-hello');
                $('.helper-bot__head-chat').addClass('bot-say');
                $('.helper-bot__head-chat').find('p').text('Привет, я ваш робот-помощник Алёша!');
                setTimeout(() => {
                    $('.helper-bot__head-chat').find('p').text('');
                    $('.helper-bot__head-chat').removeClass('bot-say');
                    $('.helper-bot__head-chat').removeClass('bot-hello');
                }, 3000)
            }
            return countScroll++;
        }
    })

})