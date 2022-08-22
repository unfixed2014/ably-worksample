# 에이블리 사전 과제

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 프로젝트 실행 방법

### 개발 모드로 실행

```
npm start
```

### 테스트 실행

```
npm test
```

### 빌드 실행

```
npm run build
```

## 주 사용 라이브러리와 사용 의도

- prettier, eslint

  - code formatter로써 prettier 및 eslint를 적용했습니다.

- react-router-dom

  - SPA에서 라우팅을 사용하기 위해서 사용하는 라이브러리

- axios
  - AJAX 요청을 위해 사용하는 라이브러리
  - native fetch 보다 익숙하기 때문에 사용하는 라이브러리입니다.

## 프로젝트 폴더 구조와 설계 의도

## 컴포넌트 구조와 설계 의도

## (상태 관리를 사용한 경우) 상태 관리의 구조와 설계 의도

## (테스트를 작성한 경우) 테스트 시나리오 작성 의도와 목적

## 리뷰어에게 강조하고 싶은 부분 또는 그 외 기타 내용

[git commit convention](https://github.com/nhn/toast-ui.vue-editor/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md)을 참고해서 commit 메세지를 참고했습니다.

```
Type
Must be one of the following:

feat: A new feature
fix: A bug fix
docs: Documentation only changes
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
refactor: A code change that neither fixes a bug nor adds a feature
perf: A code change that improves performance
test: Adding missing or correcting existing tests
chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
```

## 🧐 제약사항

- [x] 개발 언어는 TypeScript를 사용해 주시고, 라이브러리는 React로 한정합니다. (Next.js 가능)
- [x] Git을 사용해 주세요. 커밋 메시지를 신경 써 주시면 좋습니다.
- [x] Prettier, ESLint 등 linter 또는 formatter를 사용해 주세요.
- [] 그 외 구현에 필요한 어떤 라이브러리를 사용하셔도 무방합니다.
- [] 채용 과제를 위한 디자인 시안을 따로 제공하지 않습니다. 직접 마크업, 스타일링 하거나 UI/CSS 라이브러리를 사용하셔도 무방합니다.

## 참고사항

- 실행 결과물은 리뷰어에게 제출한다기 보다는 유저의 입장을 고려해서 구현해 주세요.
- 🌎 브라우저 호환성은 특별히 신경쓰지 않으셔도 됩니다. 최신 버전의 브라우저에서 잘 동작하면 됩니다.
- 코드베이스는 CRA 등으로 스캐폴딩 하거나 직접 구성 하셔도 됩니다
- [x] Unit, E2E 등의 테스트 작성이 필수는 아니지만 작성하면 더 좋습니다.
- 화면은 기본적으로 PC 데스크탑에 맞춰 주시되 반응형으로 구현하면 더 좋습니다.
- 🔍 리뷰어는 채용 과제를 다양한 측면으로 관측합니다. 개발 환경 설정(각종 스크립트, 포맷팅 도구 등), 네이밍, 코딩 스타일, 컴포넌트/코드 설계 방식, 상태 관리 스토어의 사용 여부, 라우팅 처리, 특정 정보를 저장하는 방식(로컬 스토리지, 쿠키, ...), 테스트 시나리오 정의, 개발/테스트 환경 구성, HTTP 통신 방법, Context, Hooks, HOC, BEM, 창의성, 꼼꼼함, 센스, 모듈화, DRY 등등등.. 현실적으로 모두 챙길 수는 없겠지만 지원하신 분이 잘 하는 것을 강조 하실 수 있습니다.

## 기능 요구 사항

### 로그인 페이지

- [x] 이메일과 비밀번호를 입력 할 수 있는 Input Form과 로그인 Button을 배치합니다.
- [x] 비밀번호 재설정 Button을 배치합니다.
- [x] 로그인 Button을 클릭하면 이메일과 비밀번호를 검증 & 처리합니다.
- [x] [1. 로그인 API] 를 호출하고 응답 결과에 따라 처리합니다.
- [] 호출에 실패하면 메시지로 알립니다.
- [] 호출이 성공하면 [2. 회원 정보 조회 페이지] 로 이동합니다.
- [] 클릭하면 [3. 비밀번호 재설정 > A. 인증 코드 발급 요청 페이지] 로 이동합니다.

## reference

- 프리티어 및 eslint 사용을 위해서 참고 https://blog.logrocket.com/linting-typescript-using-eslint-and-prettier/

- testing-library
  - react-router 테스트하기 https://testing-library.com/docs/example-react-router/
  - user-event https://testing-library.com/docs/user-event/intro
  - user-event를 fireEvent 대신 사용해야 하는 이유 https://ph-fritsche.github.io/blog/post/why-userevent
