// イベント追加ボタンを押した時にイベント追加処理の呼び出し　
function handleAddEventClick() {        
    let now = new Date();
    //年を取得する
    let YYYY = now.getFullYear();
    //月を取得する
    let MM = now.getMonth()+1;
    //日を取得する
    let DD = now.getDate();
    summary = prompt('予定を記入してください', '例：デート');
    kaisibi = prompt('予定開始日を記入して下さい', '例:' + YYYY+'-'+MM+'-'+DD);
    kaisijikoku = prompt('開始時刻を記入して下さい', '例:10:00');
    startDateTime = kaisibi + 'T' + kaisijikoku + ':00+09:00';
    syuryobi = prompt('予定終了日を記入して下さい', '例:' + YYYY+'-'+MM+'-'+DD);
    syuryojikoku = prompt('終了時刻を記入して下さい', '例:10:00');
    endDateTime = syuryobi + 'T' + syuryojikoku + ':00+09:00';
    //startDateTime = prompt('開始時刻を記入して下さい', '例:2024-02-29T10:00:00+09:00');
    //endDateTime = prompt('開始時刻を記入して下さい', '例:2024-02-29T14:00:00+09:00');
    addEvents(summary, startDateTime, endDateTime);
};

//イベントの追加処理
async function addEvents(summary, startDateTime, endDateTime) {
    try {
        const event = {
          'summary': summary,
          'start': {
              'dateTime': startDateTime,
              'timeZone': 'Asia/Tokyo', // 適切なタイムゾーンを指定します
          },
          'end': {
              'dateTime': endDateTime,
              'timeZone': 'Asia/Tokyo', // 適切なタイムゾーンを指定します
          },
        };

          

        const response = await gapi.client.calendar.events.insert({
          'calendarId':'c_9f27217a24e638afb89a85ece0bd7da01915897e6709703d62d0823b993ee77b@group.calendar.google.com', // プライマリカレンダーに追加する場合は'primary'を指定します
          'resource': event
      });

      console.log('Event added: ', response.result);
      return response.result;
  } catch (err) {
      console.error('Error adding event: ', err);
      throw err;
    }
}        