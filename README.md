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

## 주 사용 라이브러리와 사용 의도

- prettier, eslint

  - code formatter로써 prettier 및 eslint를 적용했습니다.

- react-router-dom

  - SPA에서 라우팅을 사용하기 위해서 사용하는 라이브러리

- axios

  - AJAX 요청을 위해 사용하는 라이브러리
  - native fetch 보다 익숙하고 다양한 환경에서 공통적으로 사용할 수 있기 때문에 사용합니다.

- tailwindcss
  - 스타일을 빠르게 적용하기 위해서 사용한 CSS 라이브러리 입니다.
  - 시간이 많이 부족해서 사용법을 제대로 파악하진 못했습니다.

## 프로젝트 폴더 구조와 설계 의도

- `__test__` 테스트 관련 파일들을 모아놓는 곳입니다
- `pages` 각각의 페이지에 해당되는 부분을 모아놓는 곳입니다
- `_lib` 공용 함수 및 클래스를 모아놓는 곳입니다.

## (상태 관리를 사용한 경우) 상태 관리의 구조와 설계 의도

- 필요 없다고 판단되어서 상태 관리 도구를 사용하지 않았습니다.

## (테스트를 작성한 경우) 테스트 시나리오 작성 의도와 목적

- React Testing Library와 테스트를 최대한 활용해서 피드백을 최대한 빠르게 받으려고 노력했습니다.
- 제가 익숙한 framework가 아니기 때문에 최대한 테스트와 함께 구현 후 리팩토링을 진행하려 했습니다. 시간이 많이 부족했지만 그래도 테스트가 있으니 확실히 더 적극적으로 코드 리팩토링을 수행할 수 있었습니다.

## 리뷰어에게 강조하고 싶은 부분 또는 그 외 기타 내용

- [git commit convention](https://github.com/nhn/toast-ui.vue-editor/blob/master/docs/COMMIT_MESSAGE_CONVENTION.md)을 참고해서 commit 메세지를 참고했습니다.
- React를 최근 5년간 다뤄본적이 없기 때문에 학습과 구현을 병행하려 노력했습니다.
- 3일이라는 짧은 시간이 주어졌기 때문에, 모르는 부분을 모두 학습하기 보다는 구현 및 테스트를 작성하는데 시간을 많이 사용했습니다.
- 테스트에서 msw의 사용을 최소화 하기 위해서 context를 사용해서 의존성을 관리하려고 했고 그 결과 모킹을 최소화할 수 있었습니다.
- HttpClient를 추상화해서 유연하게 대처할 수 있게 작업했습니다.

### 최종 목표

- [x] 스펙을 모두 구현한다
- [x] 대부분의 스펙에 대한 테스트 코드를 구현한다
- [x] 기본 스타일링
- [] 페이지들을 쉽게 확인할 수 있도록 배포해둔다
- [] github-action을 사용해서 push 할때마다 test를 실행하도록 변경한다
- [] 스타일링 미비된 부분 추가

### 아쉬운 점

- 반복되는 로직을 custom-hook을 사용하려 분리하려 했지만 시간이 부족한 관계로 거의 진행하지 못했습니다.
- 시간 관계상 스타일링 작업을 거의 진행하지 못한 부분이 아쉽습니다.
- 컴포넌트 분리하는 작업을 거의 진행하지 못한 점이 아쉽습니다.
- 테스트 코드에서 반복되는 로직을 분리하는 작업을 진행하지 못한 부분이 아쉽습니다.

### reference

- 프리티어 및 eslint 사용을 위해서 참고한 문서입니다. https://blog.logrocket.com/linting-typescript-using-eslint-and-prettier/

- testing-library

  - react-router 테스트하기 https://testing-library.com/docs/example-react-router/
  - user-event API 참고용 문서 https://testing-library.com/docs/user-event/intro
  - user-event를 fireEvent 대신 사용해야 하는 이유 https://ph-fritsche.github.io/blog/post/why-userevent
  - act warning이 발생한 원인을 찾는데 참고한 문서 https://dev.to/tipsy_dev/testing-library-writing-better-async-tests-c67
  - findBy, queryBy, getBy의 차이를 알게된 문서 https://dev.to/tipsy_dev/testing-library-writing-better-async-tests-c67

- context API

  - contextAPI를 의존성 관리 도구를 사용하기 위해서 참고한 아티클 https://blog.testdouble.com/posts/2021-03-19-react-context-for-dependency-injection-not-state/

- React Beta docs

  - 리액트에 대한 철학 및 기본적인 정보를 알아보기 위해 참고한 문서 https://beta.reactjs.org/
  - setInterval을 사용하기 위해서 참고한 문서 https://overreacted.io/making-setinterval-declarative-with-react-hooks/

- error의 타입을 지정하기 위해 참고한 글
  - https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
