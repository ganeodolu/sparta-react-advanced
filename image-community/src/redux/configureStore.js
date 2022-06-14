import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";

export const history = createBrowserHistory();

// history와 라우터랑 연결되어 스토어에 저장
const rootReducer = combineReducers({
	user: User,
	post: Post,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({history:history})]; // thunk에 액션실행함수 후 리듀서 실행전 history 사용

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
if (env === "development") {
	const { logger } = require("redux-logger");
	middlewares.push(logger);
}

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // 브라우저 환경확인
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
    : compose;
    
// 미들웨어 엮기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
