// イベント削除ボタンを押した時にイベントのリスアップとイベント削除処理の呼び出し　
function handleDelEventClick() {
//prompt('handleDelEventClick has been called')
findEventIdandDelete()
 
//delEvents(eventId);
};

async function findEventIdandDelete() {   
    let eventSummary = prompt('削除したいイベントを入力して下さい','例：デート');
    try {
        let response = await gapi.client.calendar.events.list({
            'calendarId': 'c_9f27217a24e638afb89a85ece0bd7da01915897e6709703d62d0823b993ee77b@group.calendar.google.com',
            'q': eventSummary,
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        });
        const events = response.result.items;
        if (events.length > 0) {
            delEvents(events[0].id);
        } else {
            document.getElementById('output').innerHTML = 'No events found.';
        }
     } catch (error) {
        console.error('The API returned an error: ' + error);
        document.getElementById('output').innerHTML = 'Error: ' + error;
    }
}

// イベント削除処理
async function delEvents(eventId) {
// フォームからイベントIDを取得する        
//const eventId = document.getElementById('eventId').value;
//prompt('delEvent has been called')
    try {            
    // Google Calendar APIを使用してイベントを削除する
        await gapi.client.calendar.events.delete({
        'calendarId': 'c_9f27217a24e638afb89a85ece0bd7da01915897e6709703d62d0823b993ee77b@group.calendar.google.com', // カレンダーID
        'eventId': eventId // 削除するイベントのID
    });
  
        console.log('Event deleted successfully');
    } catch (error) {
        console.error('Error deleting event:', error);
    }
} 