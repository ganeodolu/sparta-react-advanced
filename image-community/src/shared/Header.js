import React from 'react';
import { Grid, Button } from '../elements';

const Header = () => {


  // Button onClick 실행함수를 Header에 직접 넣는 방법은??
  return (
		<Grid is_flex padding="8px">
			<Button address="">홈</Button>
			<Button address="login">로그인</Button>
			<Button address="signup">회원가입</Button>
		</Grid>
	);
}

export default Header
