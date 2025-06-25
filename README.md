# Quiz Factory 
Quiz Factory는 간단한 퀴즈를 생성하고 풀 수 있는 웹 기반 애플리케이션입니다. 

사용자는 프롬프트를 사용하여 AI 기반으로 퀴즈를 생성할 수 있습니다. 

생성된 퀴즈는 서브도메인 url으로 접근하여 참여할 수 있으며, 결과 페이지에서 점수를 확인할 수 있습니다.

##  주요 기능
**- 퀴즈 생성**
  - 제목, 설명 설정
  - 다지선다형(2~4개 설정 가능)퀴즈 지원
  - AI 기반 퀴즈 생성(openAI 라이브러리 사용)

**- 퀴즈 풀기**
  - 랜덤생성된 퀴즈 아이디를 서브도메인으로 퀴즈별 url 생성
  - 진행율 표시
  - 결과 페이지: 점수 표시

## 기술 스택
- **Frontend**: React, TypeScript, Next.js, TailwindCSS
- **AI API**: OpenAI
- **Database**: Supabase
- **Deployment**: Vercel
