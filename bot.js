function getWeathetInfo(pos) {
    try{
        var data = Utils.getWebText("https://m.search.naver.com/search.naver?query=" + pos + "날씨");  //검색 결과 파싱
        data = data.replace(/<[^>]+>/g,"");  //태그 삭제
        data = data.split("월간")[1];  //날씨 정보 시작 부분의 윗부분 삭제
        data = data.split("시간별 예보")[0];  //날씨 정보 끝 부분의 아래쪽 부분 삭제
        data = data.trim();  //위아래에 붙은 불필요한 공백 삭제
        data = data.split("\n");  //엔터 단위로 자름
        var results = [];
        results[0] = data[0];  //날씨 상태(?)
        results[1] = data[3].replace("온도", "온도 : ").trim() + "℃";  //현재 온도
        results[2] = data[4].replace("온도", "온도 : ").trim() + "℃";  //체감 온도
        results[3] = data[9].replace("먼지", "먼지 : ").trim();  //미세먼지
        results[4] = data[13].replace("습도", "습도 :").trim() + "%";  //습도
        var result = "[" + pos + " 날씨 정보]\n\n상태 : " + results.join("\n");
        return result;  //결과 반환
    } catch(e) {
        return null;
    }
}

function response(room, msg, sender, isGroupChat, replier) {
    msg = msg.trim();
    var cmd = msg.split(" ")[0];
    var data = msg.replace(cmd + " ", "");
    if(cmd == "/날씨") {
        var result = getWeathetInfo(data);
        if(result == null) {
            replier.reply(data + "의 날씨 정보를 가져올 수 없습니다.");
        } else {
            replier.reply(result);
        }
    }
}
