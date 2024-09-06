# Online-Learning-Platform
KWEB 정회원 면제 과제

[로컬 환경 구성 방법 및 실행 방법]

*백엔드 폴더: online_learn
*프론트엔드 폴더: online_learn_page

<의존성 설치 명령어 및 프로젝트 실행 명령어>
- 백엔드 (Nest.js)
cd online_learn
npm install
mongod
npm run start:dev

- 프론트엔드 (React)
cd online_learn_page
npm install
npm start

- 로컬 MongoDB 서버 실행
MongoDBCompass에서 localhost:27017에 connect -> refresh -> online_learn db에 lectures, posts, users에 관한 data들이 있음

<프로젝트 접속 url>
- 백엔드: http://localhost:3000 (Swagger UI URL: http://localhost:3000/api)
- 프론트엔드: http://localhost:3001

<학생/교수 로그인 정보>
- 학생
id: sohee
password: 1121

- 교수
id: riize
password: 0904
