import React, { useState, useEffect } from 'react'
import Card from '../components/Card'
import { Grid } from "../elements";
import { realtime } from "../shared/firebase";
import { useSelector } from "react-redux";

const Notification = (props) => {
	const [noti, setNoti] = useState([]);

	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		if (!user) {
			return;
		}

		const notiDB = realtime.ref(`noti/${user.uid}/list`);
		// firebase realtime database는 내림차순 정렬을 지원하지 않아요!
		// 데이터를 가져온 후 직접 역순으로 내보내야 합니다!
		const _noti = notiDB.orderByChild("insertDt");

		_noti.once("value", (snapshot) => {
			if (snapshot.exists()) {
				let _data = snapshot.val();
				console.log(_data)
				// reserse()는 배열을 역순으로 뒤집어줘요.
				let _notiList = Object.keys(_data)
					.reverse()
					.map((s) => {
						return _data[s];
					});

				setNoti(_notiList);
			}
		});
	}, [user]);

	return (
		<React.Fragment>
			<Grid padding="16px" bg="#EFF6FF">
				{noti.map((n, idx) => {
					return <Card {...n} key={`noti_${idx}`} />;
				})}
			</Grid>
		</React.Fragment>
	);
};

export default Notification;
