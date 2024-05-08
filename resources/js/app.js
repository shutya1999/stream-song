import YouTubePlayer from 'youtube-player';
const _CSRF = document.querySelector('meta[name="csrf-token"]').content;;

if (document.querySelector('.video-wrapper')){
    let current_song_id = '';
    let stop_interval_fetch = false;

    let player; // Глобальна змінна плеєра

// Ініціалізація плеєра
    function initialVideoPlayer(videoId) {
        console.log(videoId);
        player = YouTubePlayer('video-player', {
            videoId: videoId,
        });

        player
            .playVideo()

        player.on('stateChange', (event) => {
            if (event.data === 0){
                console.log('Video ended');
                player = null;
                clearVideoPlayer();
                removeSongFromQueue();
            }
        });
    }



// Запит для отримання пісня яку треба програвати
    function getVideoSongToPlay(){
        fetch('get-song-to-play', {
            method: 'post',
            headers: {
                "X-CSRF-Token": _CSRF
            }
        })
            .then(response => response.json())
            .then(function (data){
                if (data){
                    if (data && data?.id){
                        if (data.id !== current_song_id){
                            current_song_id = data.id;
                            const url_id = youtube_parser(data.link);
                            if (url_id){
                                player = null;
                                clearVideoPlayer();
                                initialVideoPlayer(url_id);
                            }else {
                                removeSongFromQueue();
                            }
                        }else {
                            current_song_id = data.id;
                        }
                    }else {
                        player = null;
                        clearVideoPlayer();
                    }
                }
            })
    }
    getVideoSongToPlay();


    function removeSongFromQueue(){
        stop_interval_fetch = true;
        fetch('delete-song', {
            method: 'post',
            headers: {
                "X-CSRF-Token": _CSRF
            }
        })
            .then(response => response.json())
            .then(function (data){
                if (data && data.status === 'success'){
                    getVideoSongToPlay();
                    stop_interval_fetch = false;
                }
            })
    }


    setInterval(() => {
        if (!stop_interval_fetch){
            getVideoSongToPlay();
        }
    }, 2000)


    function clearVideoPlayer(){
        let wrapper = document.querySelector('.video-wrapper');
        wrapper.innerHTML = '<div id="video-player" class="w-full h-full"></div>';
    }


// Отримати id з відео посилання
    function youtube_parser(url){
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
}

// Admin page
if (document.querySelector('.js-admin-container')){
    document.addEventListener('click', (e) => {
        const target = e.target;

        if (target.closest('._js-remove-song')){
            removeSong(target.closest('._js-remove-song'));
        }
    })


    function removeSong(btn){
        const id = btn.dataset.id;

        if (id){
            const formData = new FormData();
            formData.append('id', id);

            fetch('/delete-song', {
                method: 'post',
                headers: {
                    "X-CSRF-Token": _CSRF
                },
                body: formData
            })
                .then(response => response.json())
                .then(function (data){

                    drawNewTable(data.data);

                    // if (data.status === 'success' && data.data.length > 0){
                    //     drawNewTable(data.data);
                    // }else {
                    //
                    // }
                })

        }
    }


    function drawNewTable(songs){
        const tableBody = document.querySelector('.js-admin-container tbody');
        tableBody.innerHTML = '';

        songs.forEach((song, index) => {
            let { id, username, status, name, link, created_at } = song;
            let statusText = (status === 'play') ? 'Грає' : 'В черзі';
            let statusColor = (status === 'play') ? 'text-green-400' : 'text-orange-400';

            tableBody.insertAdjacentHTML('beforeend', `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${index + 1}
                    </th>
                    <td class="px-6 py-4">
                        <span>@</span>${username}
                    </td>
                    <td class="px-6 py-4">
                        <a href="${link}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">${name}</a>
                    </td>
                    <td class="px-6 py-4">
                        <span class="${statusColor}">${statusText}</span>
                    </td>
                    <td class="px-6 py-4">
                        <div class="flex">
                            <button type="button" class="_js-remove-song" data-id="${id}">
                                <svg class="w-6 h-6 text-red-400 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `);
        })
    }
    function drawEmptyTable(){
        console.log('Empty table')
    }
}




