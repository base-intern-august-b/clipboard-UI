// チャンネル選択時のみ中央の検索窓を表示する制御

// display_mes_clear実行時に検索窓を非表示
(function() {
    // 元の関数を保存
    const orig_clear = window.display_mes_clear;
    window.display_mes_clear = function() {
        orig_clear();
        const searchBox = document.getElementById('channel_search_box');
        if (searchBox) searchBox.style.display = 'none';
    };
})();

// display_mes実行時に検索窓を表示＋チャンネル色制御
(function() {
    const orig_mes = window.display_mes;
    window.display_mes = function(data, a) {
        orig_mes(data, a);
        const searchBox = document.getElementById('channel_search_box');
        if (searchBox) searchBox.style.display = 'block';

        // チャンネル色制御
        const channels = document.querySelectorAll('#channel_list > div[id="channel"]');
        channels.forEach(ch => {
            ch.style.backgroundColor = '#e0e0e0'; // 灰色
        });
        // 選択されたチャンネルだけ水色
        // 呼び出し元のthisが使えないため、innerHTML一致で探す
        const selected = Array.from(channels).find(ch => ch.innerHTML === data);
        if (selected) selected.style.backgroundColor = '#b2ebff';
    };
})();

// 初期化時に全チャンネルを灰色に
window.addEventListener('DOMContentLoaded', () => {
    const channels = document.querySelectorAll('#channel_list > div[id="channel"]');
    channels.forEach(ch => {
        ch.style.backgroundColor = '#e0e0e0';
    });
});