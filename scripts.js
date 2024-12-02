function calculateResult() {
  const form = document.getElementById('surveyForm');
  const answers = new FormData(form);

  // 모든 질문이 응답되었는지 확인
  const questions = ["q1", "q2", "q3", "q4", "q5"];
  let unanswered = questions.filter(q => !answers.get(q));

  if (unanswered.length > 0) {
    alert(`모든 질문에 응답해주세요! (${unanswered.join(", ")})`);
    return;
  }

  // 각 선택지 점수 초기화
  let scores = { a: 0, b: 0, c: 0, d: 0 };

  // 설문 답변 점수 계산
  for (let [key, value] of answers.entries()) {
    scores[value]++;
  }

  // 가장 높은 점수의 선택지 확인
  let maxScore = Math.max(...Object.values(scores));
  let personality = Object.keys(scores).find(key => scores[key] === maxScore);

  // 성격 유형 이름과 이미지 경로 설정
  let personalityName = '';
  let imagePath = '';
  switch (personality) {
    case 'a':
      personalityName = '조아핑';
      imagePath = 'static/images/type_a.jpg'; // Type A 이미지
      break;
    case 'b':
      personalityName = '딱풀핑';
      imagePath = 'static/images/type_b.jpg'; // Type B 이미지
      break;
    case 'c':
      personalityName = '믿어핑';
      imagePath = 'static/images/type_c.jpg'; // Type C 이미지
      break;
    case 'd':
      personalityName = '아자핑';
      imagePath = 'static/images/type_d.jpg'; // Type D 이미지
      break;
    default:
      alert("결과를 계산할 수 없습니다.");
      return;
  }

  // 동적으로 팝업 크기 조정 (화면 크기의 80%)
  const width = Math.min(window.innerWidth); // 최대 600px , * 0.8, 600
  const height = Math.min(window.innerHeight); // 최대 400px, * 0.8, 400

  // 팝업 창에서 이미지와 결과 표시
  const popup = window.open('', '_blank', `width=${width},height=${height},scrollbars=no,resizable=no`);
  popup.document.write(`
    <html>
      <head>
        <title>테스트 결과</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
            background-color: #f9f9f9;
          }
          img {
            height: auto;
            border-radius: 20px;
          }
        </style>
      </head>
      <body>
        <h2>✨ 당신은 ${personalityName} 유형인 것 같아요! ✨</h2>
        <img src="${imagePath}" alt="Type ${personalityName}">
        <p>이 결과는 당신의 성격과 잘 맞는 ${personalityName} 유형을 나타냅니다.</p>
      </body>
    </html>
  `);
}
