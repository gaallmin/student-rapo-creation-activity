function calculateResult() {
  const form = document.getElementById('surveyForm');
  const answers = new FormData(form);

  // 모든 질문이 응답되었는지 확인
  const questions = ["q1", "q2", "q3", "q4", "q5"];
  let unanswered = questions.filter(q => !answers.get(q));

  if (unanswered.length > 0) {
    document.getElementById('result').innerText = 
      `모든 질문에 응답해주세요! (${unanswered.join(", ")})`;
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

  // 성격 유형 결과 텍스트
  let resultText = '';
  switch (personality) {
    case 'a':
      resultText = "당신은 A유형🥳\n관련 키워드: 자유, 외향적, 도전적, 창의적, 즉흥적, 활발, 새로운 상황 잘 적응, 감각적, 직관적";
      break;
    case 'b':
      resultText = "당신은 B유형🥳\n관련 키워드: 사교적, 조화로움, 유연함, 다수보다는 소수와의 깊은 유대, 신중한 면(주변 의견 많이 반영)";
      break;
    case 'c':
      resultText = "당신은 C유형🥳\n관련 키워드: 차분, 내성적, 안정감, 신중, 깊이 있는 사고, 논리적 사고, 체계적(인 계획)";
      break;
    case 'd':
      resultText = "당신은 D유형🥳\n관련 키워드: 신중, 계획적, 질서&규율 중시, (감정보다) 논리와 객관성 중시, 완벽함 추구";
      break;
    default:
      resultText = "결과를 계산할 수 없습니다. 모든 문제를 다 풀어주세요!";
  }

  // 결과 표시
  document.getElementById('result').innerText = resultText;
}
