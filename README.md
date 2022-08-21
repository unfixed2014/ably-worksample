# 에이블리 사전 과제

React CRA를 사용해서 프로젝트를 초기 셋팅을 진행했습니다.

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
  - native fetch 보다 익숙하고 다양한 환경에서 공통적으로 사용할 수 있기 때문에 사용합니다.

## 프로젝트 폴더 구조와 설계 의도

- `__test__` 테스트 관련 파일들을 모아놓는 곳입니다
- `pages` 각각의 페이지에 해당되는 부분을 모아놓는 곳입니다
- `_lib` 공용 함수 및 클래스를 모아놓는 곳입니다.

## 컴포넌트 구조와 설계 의도

## (상태 관리를 사용한 경우) 상태 관리의 구조와 설계 의도

## (테스트를 작성한 경우) 테스트 시나리오 작성 의도와 목적

- React Testing Library와 테스트를 최대한 활용해서 피드백을 최대한 빠르게 받으려고 노력했습니다.

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

- React를 최근 5년간 다뤄본적이 없기 때문에 학습과 구현을 병행하려 노력했습니다.
- 3일이라는 짧은 시간이 주어졌기 때문에, 모르는 부분을 모두 학습하기 보다는 구현 및 테스트를 작성하는데 시간을 많이 사용했습니다.

## 🧐 제약사항

- [x] 개발 언어는 TypeScript를 사용해 주시고, 라이브러리는 React로 한정합니다. (Next.js 가능)
- [x] Git을 사용해 주세요. 커밋 메시지를 신경 써 주시면 좋습니다.
- [x] Prettier, ESLint 등 linter 또는 formatter를 사용해 주세요.
- [x] 그 외 구현에 필요한 어떤 라이브러리를 사용하셔도 무방합니다.
- [] 채용 과제를 위한 디자인 시안을 따로 제공하지 않습니다. 직접 마크업, 스타일링 하거나 UI/CSS 라이브러리를 사용하셔도 무방합니다.

## 참고사항

- 실행 결과물은 리뷰어에게 제출한다기 보다는 유저의 입장을 고려해서 구현해 주세요.
- [x] 🌎 브라우저 호환성은 특별히 신경쓰지 않으셔도 됩니다. 최신 버전의 브라우저에서 잘 동작하면 됩니다.
- [x]코드베이스는 CRA 등으로 스캐폴딩 하거나 직접 구성 하셔도 됩니다
- [x] Unit, E2E 등의 테스트 작성이 필수는 아니지만 작성하면 더 좋습니다.
- 화면은 기본적으로 PC 데스크탑에 맞춰 주시되 반응형으로 구현하면 더 좋습니다.
- 🔍 리뷰어는 채용 과제를 다양한 측면으로 관측합니다. 개발 환경 설정(각종 스크립트, 포맷팅 도구 등), 네이밍, 코딩 스타일, 컴포넌트/코드 설계 방식, 상태 관리 스토어의 사용 여부, 라우팅 처리, 특정 정보를 저장하는 방식(로컬 스토리지, 쿠키, ...), 테스트 시나리오 정의, 개발/테스트 환경 구성, HTTP 통신 방법, Context, Hooks, HOC, BEM, 창의성, 꼼꼼함, 센스, 모듈화, DRY 등등등.. 현실적으로 모두 챙길 수는 없겠지만 지원하신 분이 잘 하는 것을 강조 하실 수 있습니다.

## 기능 요구 사항

### 로그인 페이지

- [x] 이메일과 비밀번호를 입력 할 수 있는 Input Form과 로그인 Button을 배치합니다.
- [x] 비밀번호 재설정 Button을 배치합니다.
- [x] 비밀번호 재설정을 클릭하면 [3. 비밀번호 재설정 > A. 인증 코드 발급 요청 페이지] 로 이동합니다.
- [x] 로그인 Button을 클릭하면 이메일과 비밀번호를 검증 & 처리합니다.
- [x] [1. 로그인 API] 를 호출하고 응답이 완료되면 password와 email을 초기화 한다
- [x] 호출이 성공하면 [2. 회원 정보 조회 페이지] 로 이동합니다.
- [x] 호출에 실패하면 메시지로 알립니다.

### 로그인 관련 로직들

- [x] 로그인을 성공하면 header에 token을 추가해야한다
- [x] 로그인 되지 않으면 member-info 페이지는 보여지면 안된다
- [x] 로그아웃 되면 헤더의 토큰을 제거한다

### 회원 정보 조회 페이지

- [x] 회원 정보를 보여줄 수 있는 Card를 배치합니다.
  - [x] 이름, 이메일, 프로필 이미지
- [x] 페이지 진입 시 [3. 회원 정보 조회 API] 를 호출합니다.
- [x] 호출에 실패하면 [1. 로그인 페이지] 로 이동합니다.
- [x] 호출이 성공하면 [3. 회원 정보 조회 API] 의 응답 결과를 화면에 렌더링 합니다.
- [x]로그아웃 Button을 배치합니다.
  - [x] 클릭하면 [2. 로그아웃 API] 를 호출하고 응답 결과에 따라 처리합니다.
  - [x] 호출에 실패하면 메시지로 알립니다.
  - [x] 호출이 성공하면 [1. 로그인 페이지] 로 이동합니다.

### 최종 목표

- [] 스펙을 모두 구현한다
- [] 스펙에 대한 테스트 코드를 모두 구현한다
- [] 페이지들을 쉽게 확인할 수 있도록 배포해둔다
- [] github-action을 사용해서 push 할때마다 test를 실행하도록 변경한다

## reference

- 프리티어 및 eslint 사용을 위해서 참고 https://blog.logrocket.com/linting-typescript-using-eslint-and-prettier/

- testing-library

  - react-router 테스트하기 https://testing-library.com/docs/example-react-router/
  - user-event https://testing-library.com/docs/user-event/intro
  - user-event를 fireEvent 대신 사용해야 하는 이유 https://ph-fritsche.github.io/blog/post/why-userevent
  - act warning이 발생한 원인을 찾는데 참고한 문서 https://dev.to/tipsy_dev/testing-library-writing-better-async-tests-c67
  - findBy, queryBy, getBy의 차이를 알게된 문서 https://dev.to/tipsy_dev/testing-library-writing-better-async-tests-c67

- context API

  - contextAPI를 의존성 관리 도구를 사용하기 위해서 참고한 아티클 https://blog.testdouble.com/posts/2021-03-19-react-context-for-dependency-injection-not-state/

- React Beta docs
  - 리액트에 대한 철학 및 기본적인 정보를 알아보기 위해 참고한 문서 https://beta.reactjs.org/
