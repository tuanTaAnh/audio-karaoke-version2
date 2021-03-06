// document.getElementById("display").innerHTML = "TRIVIA";

var wavesurfer = window.wavesurfer; // eslint-disable-line no-var

let GLOBAL_ACTIONS = {
    play: function() {
        console.log("Play Global action!")
        var karaokeaudio = document.getElementById("audio-karaoke");
        if(karaokeaudio.paused) {
            karaokeaudio.play();
        } else {
            karaokeaudio.pause();
        }
        karaokeaudio.muted = true;
        wavesurfer.playPause();
    },

    back: function() {
        var karaokeaudio = document.getElementById("audio-karaoke");
        karaokeaudio.currentTime = wavesurfer.getDuration()*wavesurfer.getCurrentTime();
        console.log("karaokeaudio.currentTime: ", karaokeaudio.currentTime)
        wavesurfer.skipBackward();
    },

    forth: function() {
        var karaokeaudio = document.getElementById("audio-karaoke");
        karaokeaudio.currentTime = wavesurfer.getDuration()*wavesurfer.getCurrentTime();
        wavesurfer.skipForward();
    },

    'toggle-mute': function() {
        wavesurfer.toggleMute();
    }
};

// Bind actions to buttons and keypresses
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keydown', function(e) {
        let map = {
            32: 'play', // space
            37: 'back', // left
            39: 'forth' // right
        };
        let action = map[e.keyCode];
        if (action in GLOBAL_ACTIONS) {
            if (document == e.target || document.body == e.target) {
                e.preventDefault();
            }
            GLOBAL_ACTIONS[action](e);
        }
    });

    [].forEach.call(document.querySelectorAll('[data-action]'), function(el) {
        el.addEventListener('click', function(e) {
            let action = e.currentTarget.dataset.action;
            if (action in GLOBAL_ACTIONS) {
                e.preventDefault();
                GLOBAL_ACTIONS[action](e);
            }
        });
    });
});

// Misc
document.addEventListener('DOMContentLoaded', function() {
    // Web Audio not supported
    if (!window.AudioContext && !window.webkitAudioContext) {
        let demo = document.querySelector('#demo');
        if (demo) {
            demo.innerHTML = '<img src="/example/screenshot.png" />';
        }
    }

    // Navbar links
    let ul = document.querySelector('.nav-pills');
    let pills = ul.querySelectorAll('li');
    let active = pills[0];
    if (location.search) {
        let first = location.search.split('&')[0];
        let link = ul.querySelector('a[href="' + first + '"]');
        if (link) {
            active = link.parentNode;
        }
    }
    active && active.classList.add('active');
});