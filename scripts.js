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

  // 성격 유형 결과 이미지 경로 설정
  let imagePath = '';
  switch (personality) {
    case 'a':
      imagePath = 'static/images/type_a.jpg'; // Type A 이미지
      break;
    case 'b':
      imagePath = 'static/images/type_b.jpg'; // Type B 이미지
      break;
    case 'c':
      imagePath = 'static/images/type_c.jpg'; // Type C 이미지
      break;
    case 'd':
      imagePath = 'static/images/type_d.jpg'; // Type D 이미지
      break;
    default:
      alert("결과를 계산할 수 없습니다.");
      return;
  }

  // 결과 이미지 업데이트 및 모달 표시
  const resultImage = document.getElementById('resultImage');
  resultImage.src = imagePath;
  resultImage.alt = `Type ${personality.toUpperCase()} Result`;

  document.getElementById('resultModal').style.display = "block";
}

// 모달 닫기
function closeModal() {
  document.getElementById('resultModal').style.display = "none";
}
